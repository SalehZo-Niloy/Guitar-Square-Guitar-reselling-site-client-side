import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Header = () => {
    const { user, logout, dashboard } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Log Out Successful");
            })
            .catch(e => {
                console.error(e);
            })
    }

    const menu = <>
        <li className='text-secondary'><Link to='/home' className='text-lg font-semibold'>Home</Link></li>
        <li className='text-secondary'><Link to='/blogs' className='text-lg font-semibold'>Blogs</Link></li>
        {
            user?.email && <li className='text-secondary'><Link to='/dashboard' className='text-lg font-semibold'>Dashboard</Link></li>
        }
        {
            user?.uid ? <li onClick={handleLogout} className='text-secondary'><p className='text-lg font-semibold'>Log out</p></li>
                :
                <li className='text-secondary'><Link to='/login' className='text-lg font-semibold'>Login</Link></li>
        }
        {
            user?.email && <li className='text-secondary'><span className='text-base cursor-not-allowed'>{user?.email}</span></li>

        }
    </>

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start w-1/2">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to='/' className="uppercase text-base md:text-xl lg:text-2xl text-primary font-bold w-full">Guitar Square</Link>
            </div>
            <div className="navbar-center hidden lg:flex justify-end w-1/2">
                <ul className="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
            {
                user?.email && dashboard && <div className='flex justify-end items-center w-1/2 lg:hidden'>
                    <label htmlFor="dashboard-drawer" className="text-secondary font-semibold ">Dashboard Menu</label>
                </div>
            }
        </div>
    );
};

export default Header;