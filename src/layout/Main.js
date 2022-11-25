import React, { useContext, useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';

const Main = () => {
    const { setDashboard } = useContext(AuthContext);

    useEffect(() => {
        setDashboard(false);
    }, [])
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Main;