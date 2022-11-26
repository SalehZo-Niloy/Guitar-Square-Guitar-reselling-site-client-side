import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);


const Payment = () => {
    const product = useLoaderData();
    // console.log(product);
    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-secondary text-center'>Pay for {product?.productName}</h1>
            <h1 className='text-lg font-bold text-white text-center mt-2'>Price ${product?.resalePrice}</h1>
            <div className='min-h-[90vh] flex justify-center items-center'>
                <div className='bg-secondary p-10 w-1/2 rounded-xl'>
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            product={product}
                        ></PaymentForm>
                    </Elements>

                </div>
            </div>
        </div>
    );
};

export default Payment;