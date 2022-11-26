import React from 'react';

const MyProductCard = ({ product, handleDelete, handleAdvertise }) => {
    const { _id, productName, isSold, isAdvertised, resalePrice } = product;
    return (
        <div className="card w-full bg-neutral text-primary-content">
            <div className="card-body">
                <h2 className="card-title text-secondary">{productName}</h2>
                <p className='text-white font-bold'>Price: ${resalePrice}</p>
                <p className='text-white text-sm mb-2'>Product <strong className='text-primary'>{isSold ? 'Sold' : 'Availble'}</strong></p>
                <div className="card-actions justify-end">
                    {
                        !isSold && !isAdvertised &&
                        <button onClick={() => handleAdvertise(_id, true)} className="btn btn-sm btn-accent">Advertise</button>
                    }
                    {
                        !isSold && isAdvertised &&
                        <button onClick={() => handleAdvertise(_id, false)} className="btn btn-sm btn-accent">Remove Advertise</button>
                    }
                    <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-secondary">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyProductCard;