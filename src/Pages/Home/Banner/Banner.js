import React from 'react';

const Banner = () => {
    return (
        <div className='w-11/12 mx-auto my-12'>
            <div className="hero rounded-lg overflow-hidden h-56 md:h-64 lg:h-96" style={{ backgroundImage: `url("https://i.ibb.co/zRZT6w5/classic-shape-wooden-electric-guitar-with-rosewood-neck-151013-40769.jpg")` }}>
                <div className="hero-overlay bg-opacity-80 w-full"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-semibold md:font-bold text-primary">Welcome <br /> to <br /> Guitar Square</h1>
                        <p className="mb-5 text-sm md:text-base lg:text-lg font-semibold text-white">As one of the largest site for guitar reselling we ensure a safe and quality maintained process of Guitar buying and selling.</p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;