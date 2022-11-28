import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const ReportedProductsCard = ({ product, refetch }) => {
    const { _id, productId, reporterEmail } = product;

    //----------------------------
    // fetching product details for each specific reported products by id
    //----------------------------
    const { data: fetchedProduct = [], isLoading } = useQuery({
        queryKey: ['fetchedProducts', productId, reporterEmail, _id],
        queryFn: () => fetch(`https://assignment-12-server-two.vercel.app/product/${productId}`)
            .then(res => res.json())
    })

    //----------------------------
    // deleting a reported product
    //----------------------------
    const handleDelete = () => {
        // console.log(productId);
        fetch(`https://assignment-12-server-two.vercel.app/report/${productId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Reported product deleted successfully');
                    refetch();
                }
            })
            .catch(e => {
                console.error(e)
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (fetchedProduct.message === 'Product Sold') {
        return;
    }

    // console.log(fetchedProduct);

    return (
        <div className="card md:card-side bg-neutral shadow-xl">
            <figure className='w-full md:w-1/4'><img src={fetchedProduct?.productPhoto
            } alt="" className='w-full h-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">Product Name: <strong>{fetchedProduct?.productName}</strong></h2>
                <p className='text-white '>Price: <strong>${fetchedProduct?.resalePrice}</strong></p>
                <p className='text-sm'>Sold By: <strong>{fetchedProduct?.sellerEmail}</strong></p>
                <p className='mb-2'>Reported By: <strong>{reporterEmail}</strong></p>
                <div className="card-actions justify-end">
                    <button onClick={handleDelete} className='btn btn-error btn-sm'>Delete Product</button>
                </div>
            </div>
        </div>
    );
};

export default ReportedProductsCard;