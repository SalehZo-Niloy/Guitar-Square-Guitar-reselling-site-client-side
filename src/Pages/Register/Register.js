import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const handleRegister = (data) => {
        console.log(data);
    }
    return (
        <div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
            <div className='w-10/12 md:w-2/3 lg:w-1/3 my-8'>
                <h1 className='text-3xl font-bold text-primary text-center'>Register</h1>
                <form onSubmit={handleSubmit(handleRegister)} className='my-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name")} type="text" placeholder="your name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email")} type="email" placeholder="your email" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password")} type="password" placeholder="your password" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Select your role</span>
                        </label>
                        <select {...register("role")} className="select select-bordered">
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <input className='btn btn-primary mt-4 w-full' type="submit" value={'Register'} />
                </form>
                <p className='text-sm text-center'>Already have an account? <Link to='/login' className='text-primary hover:underline hover:text-secondary'>Then Login</Link></p>
            </div>
        </div>
    );
};

export default Register;