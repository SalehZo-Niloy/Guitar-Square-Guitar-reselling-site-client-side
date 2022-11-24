import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import ProductCategoryCard from './ProductCategoryCard';

const ProductCategories = () => {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios('http://localhost:5000/categories')
            .then(res => {
                console.log(res.data);
                setCategories(res.data);
                setLoading(false);
            })
            .catch(e => {
                toast.error('Failed to load Categories');
                setLoading(false);
                console.error(e);
            })
    }, [])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto my-12'>
            <h1 className='text-2xl font-semibold text-primary text-center'>Guitar Categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6'>
                {
                    categories && categories?.map(category => <ProductCategoryCard
                        key={category?._id}
                        category={category}
                    ></ProductCategoryCard>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;