import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const PaymentForm = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ price: product?.resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
            .catch(e => console.error(e))
    }, [product]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error(error.message);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: paymentConfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );

        if (paymentConfirmError) {
            setCardError(paymentConfirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {

            const payment = {
                price: product?.resalePrice,
                transactionId: paymentIntent.id,
                email: user?.email,
                productId: product?._id,
                productName: product?.productName
            }
            fetch('http://localhost:5000/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congratulations! your payment done');
                        toast.success('Congratulations! your payment done');
                        setTransactionId(paymentIntent.id);
                    }
                })
                .catch(e => {
                    console.error(e);
                })
        }

        setProcessing(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className='px-5 py-3 mb-5 rounded-lg bg-neutral'
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                backgroundColor: '#1c1917',

                                color: '#ffffff',
                                '::placeholder': {
                                    color: '#c5a8e1',
                                },
                            },
                            invalid: {
                                color: '#ff737a',
                            },
                        },
                    }}
                />
                <div className='flex justify-end'>
                    <button className='btn btn-sm btn-neutral hover:bg-black px-10' type="submit" disabled={!stripe || !clientSecret || processing || transactionId} >
                        Pay
                    </button>
                </div>
            </form>
            <p className='mt-4 text-neutral font-bold'>{cardError ? cardError : undefined}</p>
            {
                success && <div>
                    <p className='text-black text-xl font-bold'>Your Transaction Id: {transactionId}</p>
                </div>
            }
        </div>
    );
};

export default PaymentForm;