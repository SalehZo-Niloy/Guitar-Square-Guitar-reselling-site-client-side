import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const ProductBookingModal = ({ productModal, setProductModal }) => {
    const { user } = useContext(AuthContext);
    const { _id, productName, resalePrice } = productModal;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const buyerPhone = form.buyerPhone.value;
        const meetingLocation = form.meetingLocation.value;
        const booking = {
            productId: _id,
            email: user?.email,
            buyerPhone,
            meetingLocation
        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Product Booked Successfully');
                }
                else {
                    toast.error('You have already booked the product');
                }
                setProductModal(null);
            })
            .catch(e => {
                console.error(e);
            })
        // console.log(booking);
    }

    // console.log(user);

    return (
        <div>
            <input type="checkbox" id="product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="product-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input type="text" value={user?.displayName} className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">User Email</span>
                            </label>
                            <input type="text" value={user?.email} className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Item Name</span>
                            </label>
                            <input type="text" value={productName} className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Item Price</span>
                            </label>
                            <input type="text" value={resalePrice} className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Enter Your Phone Number</span>
                            </label>
                            <input type="text" name='buyerPhone' className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Enter Meeting Location</span>
                            </label>
                            <input type="text" name='meetingLocation' className="input input-bordered w-full" required />
                        </div>
                        <button type="submit" className='btn btn-primary mt-4 w-full'>Book The Item Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductBookingModal;