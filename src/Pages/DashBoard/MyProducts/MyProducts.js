import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import MyProductCard from './MyProductCard';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    useTitle('My Products');
    const { data: myProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['myProducts', user],
        queryFn: () => fetch(`https://assignment-12-server-two.vercel.app/products?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
    })

    //----------------------------
    // deleting a product
    //----------------------------
    const handleDelete = (id) => {
        fetch(`https://assignment-12-server-two.vercel.app/products/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Product Deleted Successfully');
                    refetch();
                }
            })
            .catch(e => {
                console.error(e);
            })
    }

    //----------------------------
    // advertising a product
    //----------------------------
    const handleAdvertise = (id, state) => {
        fetch(`https://assignment-12-server-two.vercel.app/advertise/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ state })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    if (state) {
                        toast.success('Product Advertised');
                    }
                    else {
                        toast.error('Removed from Advertised');
                    }
                    refetch();
                }
            })
            .catch(e => {
                console.error(e);
            })
    }


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-primary text-center'>My Products</h1>
            <div className='flex flex-col gap-4 my-8'>
                {
                    myProducts?.length ? myProducts?.map(product => <MyProductCard
                        key={product?._id}
                        product={product}
                        handleDelete={handleDelete}
                        handleAdvertise={handleAdvertise}
                    // handleRemoveAdvertise={handleRemoveAdvertise}
                    ></MyProductCard>)
                        : <p className='text-center col-span-3'>No Products to Load</p>
                }
            </div>
        </div>
    );
};

export default MyProducts;