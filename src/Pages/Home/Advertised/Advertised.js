import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['advertisedProducts'],
        queryFn: () => fetch(`http://localhost:5000/advertise`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (products?.length === 0) {
        return;
    }

    // console.log(products);

    return (
        <div className='w-11/12 mx-auto my-12 bg-neutral px-10 py-6 rounded-xl'>
            <h1 className='text-2xl font-semibold text-primary text-center'>Advertised Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-6'>
                {
                    products?.length && products?.map(product => <AdvertisedCard
                        key={product?._id}
                        product={product}
                    ></AdvertisedCard>)
                }
            </div>

        </div>
    );
};

export default Advertised;