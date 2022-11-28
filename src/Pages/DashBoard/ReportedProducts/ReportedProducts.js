import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import ReportedProductsCard from './ReportedProductsCard';

const ReportedProducts = () => {
    useTitle('Reported Products');
    const { data: reportedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: () => fetch(`https://assignment-12-server-two.vercel.app/report`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
    })

    // console.log(reportedProducts);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-secondary text-center'>Reported Products</h1>
            <div className='flex flex-col gap-6 my-8'>
                {
                    reportedProducts?.length ? reportedProducts?.map(product => <ReportedProductsCard
                        key={product?._id}
                        product={product}
                        refetch={refetch}
                    ></ReportedProductsCard>)
                        : <p className='text-center col-span-3'>No Products to Load</p>
                }
            </div>
        </div>
    );
};

export default ReportedProducts;