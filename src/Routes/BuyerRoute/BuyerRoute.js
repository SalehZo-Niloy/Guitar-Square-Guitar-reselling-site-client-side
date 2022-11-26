import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useRole from '../../hooks/useRole';
import Loading from '../../Pages/Shared/Loading/Loading';

const BuyerRoute = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const [role, roleLoading] = useRole(user?.email);
    const location = useLocation();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if (user && role === 'buyer') {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default BuyerRoute;