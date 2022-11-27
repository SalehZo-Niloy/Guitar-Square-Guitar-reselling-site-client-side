import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import ReportedProductsCard from './ReportedProductsCard';

const ReportedProducts = () => {
    const { data: reportedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: () => fetch(`http://localhost:5000/report`)
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
                        : undefined
                }
            </div>
        </div>
    );
};

export default ReportedProducts;