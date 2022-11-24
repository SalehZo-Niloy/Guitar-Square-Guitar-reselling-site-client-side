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
                        <input {...register("name")} type="email" placeholder="your email" className="input input-bordered w-full" />
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
                    {/* <select {...register("gender")}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select> */}
                    <input className='btn btn-primary mt-4 w-full' type="submit" value={'Login'} />
                </form>
                <p className='text-sm text-center'>New to Guitar Square? <Link to='/register' className='text-primary hover:underline hover:text-secondary'>Create new Account</Link></p>
                <div className="divider">OR</div>
                <button className="btn btn-outline btn-success w-full">Continue With Google</button>
            </div>
        </div>
    );
};

export default Register;