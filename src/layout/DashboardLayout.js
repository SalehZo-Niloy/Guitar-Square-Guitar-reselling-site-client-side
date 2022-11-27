import React, { useContext, useEffect } from 'react';
import { Link, Outlet, } from 'react-router-dom';
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
                    <ul className="menu p-4 w-80 bg-base-300 text-base-content gap-2">
                        {
                            role === 'seller' && <>   <li><Link to='/dashboard/addProduct' className='text-secondary font-semibold'>Add Product</Link></li>
                                <li><Link to='/dashboard/myProducts' className='text-secondary font-semibold'>My Products</Link></li>
                            </>
                        }
                        {
                            role === 'buyer' && <>   <li><Link to='/dashboard/myOrders' className='text-secondary font-semibold'>My Orders</Link></li>
                            </>
                        }
                        {
                            role === 'admin' && <>   <li><Link to='/dashboard/sellers' className='text-secondary font-semibold'>Sellers</Link></li>
                                <li><Link to='/dashboard/buyers' className='text-secondary font-semibold'>Buyers</Link></li>
                                <li><Link to='/dashboard/report' className='text-secondary font-semibold'>Reported Products</Link></li>
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