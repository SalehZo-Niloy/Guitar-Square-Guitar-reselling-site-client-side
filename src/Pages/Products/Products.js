import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import ProductCard from './ProductCard';

const Products = () => {
    const location = useLocation();
    const categoryId = location?.pathname?.split('/').at(-1);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/products/${categoryId}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    // console.log(products);

    return (
        <div>
            <h1 className='text-2xl font-semibold text-primary text-center mt-12'>Second Hand {products[0]?.categoryName}</h1>
            <div className='w-11/12 mx-auto my-8 grid grid-cols-3'>
                {
                    products?.length && products?.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;