import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import BuyersCard from './BuyersCard';

const Buyers = () => {
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch(`http://localhost:5000/buyers`)
            .then(res => res.json())
    })

    // console.log(buyers);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-primary text-center'>All Buyers</h1>
            <div className='flex flex-col gap-4 my-8'>
                {
                    buyers?.length ? buyers?.map(buyer => <BuyersCard
                        key={buyer?._id}
                        refetch={refetch}
                        buyer={buyer}
                    ></BuyersCard>)
                        : undefined
                }
            </div>
        </div >
    );
};

export default Buyers;