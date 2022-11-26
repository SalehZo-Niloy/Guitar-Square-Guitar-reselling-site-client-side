import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useRole from '../../../hooks/useRole';
import Loading from '../../Shared/Loading/Loading';

const DashBoard = () => {
    const { user } = useContext(AuthContext);
    const [role, roleLoading] = useRole(user?.email);
    // console.log(role, user.email);
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'seller') {
        return <Navigate to='/dashboard/addProduct'></Navigate>
    }
    if (role === 'buyer') {
        return <Navigate to='/dashboard/myOrders'></Navigate>
    }
    return (
        <div>
            this is dashboard
        </div>
    );
};

export default DashBoard;