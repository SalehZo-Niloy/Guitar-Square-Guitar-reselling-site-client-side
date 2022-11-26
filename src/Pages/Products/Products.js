import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useRole from '../../hooks/useRole';
import Loading from '../Shared/Loading/Loading';
import ProductBookingModal from './ProductBookingModal';
import ProductCard from './ProductCard';

const Products = () => {
    const { user } = useContext(AuthContext);
    const [role, roleLoading] = useRole(user?.email);
    const location = useLocation();
    const [productModal, setProductModal] = useState(null);
    const categoryId = location?.pathname?.split('/').at(-1);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => fetch(`http://localhost:5000/products/${categoryId}`)
            .then(res => res.json())
    })

    if (isLoading || roleLoading) {
        return <Loading></Loading>
    }

    // console.log(products);

    return (
        <div>
            <h1 className='text-2xl font-semibold text-primary text-center mt-12'>Second Hand {products[0]?.categoryName}</h1>
            <div className='w-11/12 mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    products?.length && products?.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setProductModal={setProductModal}
                        role={role}
                    ></ProductCard>)
                }
            </div>
            {
                productModal && role === 'buyer' && <ProductBookingModal
                    productModal={productModal}
                    setProductModal={setProductModal}
                ></ProductBookingModal>
            }
        </div>
    );
};

export default Products;