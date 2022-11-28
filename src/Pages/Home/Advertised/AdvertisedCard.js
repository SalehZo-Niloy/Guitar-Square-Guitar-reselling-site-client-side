import React from 'react';
import { Link } from 'react-router-dom';

const AdvertisedCard = ({ product }) => {
    const { productPhoto, productName, categoryName, categoryId } = product;
    return (
        <div className="card card-compact bg-secondary shadow-xl overflow-hidden">
            <figure><img className='w-full' src={productPhoto} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-black">{productName}
                </h2>
                <div className="card-actions">
                    <Link to={`/category/${categoryId}`} className=" w-full btn btn-neutral hover:bg-black text-xs">See This product in "{categoryName}" category</Link>
                </div>
            </div>
        </div>
    );
};

export default AdvertisedCard;