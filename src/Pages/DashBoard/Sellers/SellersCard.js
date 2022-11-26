import React from 'react';
import toast from 'react-hot-toast';

const SellersCard = ({ seller, refetch }) => {
    const { name, email, isVerified } = seller;

    const handleVerify = () => {
        console.log(email);
        fetch(`http://localhost:5000/user?email=${email}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Seller Verified');
                    refetch();
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    const handleDelete = () => {
        console.log(email);
        fetch(`http://localhost:5000/user?email=${email}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Seller Deleted');
                    refetch();
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="card w-full bg-neutral text-primary-content">
            <div className="card-body">
                <h2 className="card-title text-secondary">{name}</h2>
                <p className='text-white mb-2'>Email: <strong>{email}</strong></p>

                <div className="card-actions items-center justify-end">
                    {
                        isVerified ? <span className='text-accent mr-2'>Verified</span>
                            :
                            <button onClick={handleVerify} className="btn btn-sm btn-secondary">Verify</button>
                    }
                    <button onClick={handleDelete} className="btn btn-sm btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default SellersCard;