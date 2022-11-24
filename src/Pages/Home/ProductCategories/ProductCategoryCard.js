import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategoryCard = ({ category }) => {
    const { _id, categoryName, categoryPhoto } = category;
    return (
        <div className="card bg-neutral shadow-xl">
            <figure className="px-10 pt-10">
                <img src={categoryPhoto} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body px-10 pt-4 pb-6">
                <h2 className="card-title">{categoryName}</h2>
                <div className="card-actions justify-end">
                    <Link to={`/category/${_id}`} className="btn btn-secondary">View Products</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCategoryCard;