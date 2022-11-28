import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const Page404 = () => {
    useTitle('404');
    return (
        <div className="hero min-h-screen w-full" style={{
            backgroundImage: `url("https://i.ibb.co/QnvyJHW/pngwing-com.png")`,
            backgroundSize: 'contain',
        }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-accent">The requested page is not available</h1>
                    <p className='text-2xl font-medium'>Visit <Link to='/' className='link link-primary'> GUITAR SQUARE HOME</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Page404;