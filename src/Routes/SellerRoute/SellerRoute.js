import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useRole from '../../hooks/useRole';
import Loading from '../../Pages/Shared/Loading/Loading';

const SellerRoute = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const [role, roleLoading] = useRole(user?.email);
    const location = useLocation();

    //----------------------------
    // only accessed by seller, or user wil be redirected to login page
    //----------------------------
    if (roleLoading) {
        return <Loading></Loading>
    }

    if (user && role === 'seller') {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;