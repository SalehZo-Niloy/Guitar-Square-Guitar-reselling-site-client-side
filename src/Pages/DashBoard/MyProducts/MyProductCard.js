import React from 'react';

const MyProductCard = ({ product, handleDelete }) => {
    const { _id, productName, isSold, isAdvertised, resalePrice } = product;
    return (
        <div className="card w-full bg-neutral text-primary-content">
            <div className="card-body">
                <h2 className="card-title text-secondary">{productName}</h2>
                <p className='text-white font-bold'>Price: ${resalePrice}</p>
                <p className='text-white text-sm'>Product {isSold ? 'Sold' : 'Availble'}</p>
                <div className="card-actions justify-end">
                    {
                        !isSold && !isAdvertised &&
                        <button className="btn btn-sm btn-accent">Advertise</button>
                    }
                    <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-secondary">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyProductCard;