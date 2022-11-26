import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useRole from '../../hooks/useRole';
import Loading from '../Shared/Loading/Loading';

const ProductCard = ({ product, setProductModal, role }) => {
    const { _id, productName, productPhoto, location, resalePrice, originalPrice, purchaseYear, postedAt, sellerEmail } = product;

    const { data: seller = {}, isLoading } = useQuery({
        queryKey: ['user', sellerEmail],
        queryFn: () => fetch(`http://localhost:5000/user?email=${sellerEmail}`)
            .then(res => res.json())
    })

    const handleModalLoad = () => {
        if (role !== 'buyer') {
            return toast.error("You can't book the product as you are not a 'BUYER'!!");
        }
        setProductModal({ _id, productName, resalePrice })
    }

    const date = purchaseYear.split('-')[2];
    const month = purchaseYear.split('-')[1];
    const year = purchaseYear.split('-')[0];
    const postDate = new Date(postedAt);
    const formattedDate = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`;


    if (isLoading) {
        return <Loading></Loading>
    }

    // console.log(product);

    return (
        <div className="card bg-neutral shadow-xl">
            <figure className="px-10 pt-10">
                <img src={productPhoto} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-primary text-2xl font-bold">{productName}</h2>
                <p className='text-sm'><strong>Location:</strong> {location}</p>
                <p className='font-bold'>Resale Price: ${resalePrice}</p>
                <p className='text-sm'><strong>Original Price:</strong> ${originalPrice}</p>
                <p className='text-sm'><strong>Year of use:</strong> Using since {`${date},${month},${year}`}</p>
                <p><strong>Product posted at:</strong> {formattedDate}</p>
                <p><strong>Seller: </strong> {seller?.name} {seller?.isVerified && <span className="badge badge-accent badge-outline px-1">✔</span>}</p>
                <div className="card-actions justify-end">
                    <label onClick={handleModalLoad} htmlFor="product-modal" className="btn btn-primary">Book Now</label>
                </div>
            </div>
        </div >
    );
};

export default ProductCard;