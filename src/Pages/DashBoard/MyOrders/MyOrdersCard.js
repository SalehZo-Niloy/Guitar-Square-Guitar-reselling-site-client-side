import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const MyOrdersCard = ({ order }) => {
    const { productId } = order;

    //----------------------------
    // fetching specific product details for each card
    //----------------------------
    const { data: product = {}, isLoading } = useQuery({
        queryKey: ['orderedProducts', productId],
        queryFn: () => fetch(`https://assignment-12-server-two.vercel.app/specificProduct/${productId}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (Object.keys(product).length === 0) {
        return;
    }

    return (
        <div className="card md:card-side bg-neutral shadow-xl">
            <figure className='w-full md:w-1/4'><img src={product?.productPhoto
            } alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product?.productName}</h2>
                <p className='text-white font-bold'>Price: ${product?.resalePrice}</p>
                <div className="card-actions justify-end">
                    {
                        product?.isSold ? <p className='text-end font-semibold text-primary'>Product Sold</p>
                            :
                            <Link to={`/dashboard/payment/${productId}`} className="btn btn-primary px-10">Pay</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyOrdersCard;