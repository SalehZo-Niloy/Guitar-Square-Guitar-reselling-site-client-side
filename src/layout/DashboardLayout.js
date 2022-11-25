import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useRole from '../hooks/useRole';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';
import Loading from '../Pages/Shared/Loading/Loading';

const DashboardLayout = () => {
    const { setDashboard, user } = useContext(AuthContext);
    const [role, roleLoading] = useRole(user?.email);

    useEffect(() => {
        setDashboard(true);
    }, [])

    if (roleLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile drawer-end">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-300 text-base-content">
                        {
                            role === 'seller' && <>   <li><Link to='/dashboard/addProduct' className='text-secondary font-semibold'>Add Product</Link></li>
                                <li><a>Sidebar Item 2</a></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;