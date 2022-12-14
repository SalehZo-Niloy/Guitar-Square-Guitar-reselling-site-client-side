import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import MyOrdersCard from './MyOrdersCard';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    useTitle('My Orders');
    const { data: myOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['myOrders', user],
        queryFn: () => fetch(`https://assignment-12-server-two.vercel.app/bookings?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
    })

    // console.log(myOrders);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-primary text-center'>My Orders</h1>
            <div className='flex flex-col gap-6 my-8'>
                {
                    myOrders?.length ? myOrders?.map(order => <MyOrdersCard
                        key={order?._id}
                        order={order}
                    ></MyOrdersCard>)
                        : <p className='text-center col-span-3'>No Products to Load</p>
                }
            </div>
        </div>
    );
};

export default MyOrders;