import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hooks/useTitle';
import { jwtToken } from '../../utilities/jwtToken';

const Register = () => {
    const { signup, profileUpdater } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    useTitle('Register');

    const from = location?.state?.from?.pathname || '/'

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
    const handleRegister = (data, e) => {
        // console.log(data);
        const { name, email, password, role } = data;

        //----------------------------
        // signing up new user
        //----------------------------
        signup(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                const userInfo = {
                    displayName: name
                }

                //----------------------------
                // adding displayName only
                //----------------------------
                profileUpdater(userInfo)
                    .then(() => {
                        setRegisterError('');
                        e.target.reset();
                        toast.success('Registration Successful')
                        const userInfo = {
                            name,
                            email: email.toLowerCase(),
                            role,
                            isVerified: false
                        }
                        addUser(userInfo);
                        jwtToken(user, navigate, from);
                    })
                    .catch(e => {
                        console.error(e);
                        setRegisterError(e.message);
                    })

            })
            .catch(e => {
                console.error(e);
                setRegisterError(e.message);
            })
    };

    //----------------------------
    // react hook form reset
    //----------------------------
    useEffect(() => {
        reset({
            name: '',
            email: '',
            password: ''
        })
    }, [isSubmitSuccessful, reset])

    //----------------------------
    // inserting user info to database
    //----------------------------
    const addUser = (userInfo) => {
        fetch('https://assignment-12-server-two.vercel.app/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
            })
            .catch(e => {
                console.error(e);
            })
    };

    return (
        <div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
            <div className='w-10/12 md:w-2/3 lg:w-1/3 my-8'>
                <h1 className='text-3xl font-bold text-primary text-center'>Register</h1>
                <form onSubmit={handleSubmit(handleRegister)} className='my-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="your name" className="input input-bordered w-full" />
                    </div>
                    {errors.name && errors.name.type === "required" && <p className='mt-2 text-error'>⚠ Name is required</p>}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" placeholder="your email" className="input input-bordered w-full" />
                    </div>
                    {errors.email && errors.email.type === "required" && <p className='mt-2 text-error'>⚠ Email is required</p>}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: true })} type="password" placeholder="your password" className="input input-bordered w-full" />
                    </div>
                    {errors.password && errors.password.type === "required" && <p className='mt-2 text-error'>⚠ Password is required</p>}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Select your role</span>
                        </label>
                        <select {...register("role", { required: true })} className="select select-bordered">
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    {errors.role && errors.role.type === "required" && <p className='mt-2 text-error'>⚠ User Role is required</p>}
                    {registerError && <p className='mt-3 text-error'>{registerError}</p>}
                    <input className='btn btn-primary mt-4 w-full' type="submit" value={'Register'} />
                </form>
                <p className='text-sm text-center'>Already have an account? <Link to='/login' className='text-primary hover:underline hover:text-secondary'>Then Login</Link></p>
            </div>
        </div>
    );
};

export default Register;