import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import SellersCard from './SellersCard';

const Sellers = () => {
    useTitle('Sellers');
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetch(`https://assignment-12-server-two.vercel.app/sellers`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
    })

    // console.log(sellers);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-primary text-center'>All Sellers</h1>
            <div className='flex flex-col gap-4 my-8'>
                {
                    sellers?.length ? sellers?.map(seller => <SellersCard
                        key={seller?._id}
                        refetch={refetch}
                        seller={seller}
                    ></SellersCard>)
                        : <p className='text-center col-span-3'>No Sellers to Load</p>
                }
            </div>
        </div >
    );
};

export default Sellers;