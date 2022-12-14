import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hooks/useTitle';
import { jwtToken } from '../../utilities/jwtToken';

const Login = () => {
    const { login, googleLogin, logout } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    useTitle('Login');

    const from = location?.state?.from?.pathname || '/';
    const previousLocation = location?.state?.from;

    const handleLogin = (data, e) => {
        // console.log(data);
        const { email, password } = data;

        //----------------------------
        // checking if user is deleted by admin
        //----------------------------
        fetch(`https://assignment-12-server-two.vercel.app/user?email=${email.toLowerCase()}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (!data.isDeleted) {
                    //----------------------------
                    // logging in the user if he isn't deleted
                    //----------------------------
                    login(email, password)
                        .then(result => {
                            const user = result.user;
                            // console.log(user);
                            setLoginError('');
                            e.target.reset();
                            toast.success('Login Successful');
                            jwtToken(user, navigate, from);
                        })
                        .catch(e => {
                            console.error(e);
                            setLoginError(e.message);
                        })
                }
                else {
                    toast.error('Your account has been deleted');
                }
            })
            .catch(e => {
                console.error(e);
                setLoginError('user does not exist');
            })
    };

    //----------------------------
    // react hook form reset
    //----------------------------
    useEffect(() => {
        reset({
            email: '',
            password: ''
        })
    }, [isSubmitSuccessful, reset])

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                // console.log(user);

                //----------------------------
                // if the user logged in by google is deleted by admin, logging him out immediately by else statement
                //----------------------------
                fetch(`https://assignment-12-server-two.vercel.app/user?email=${user?.email}`)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (!data.isDeleted) {
                            setLoginError('')
                            toast.success('Login By Google Successful');
                            const userInfo = {
                                name: user?.displayName,
                                email: user?.email,
                                role: 'buyer',
                                isVerified: false
                            }
                            addUser(userInfo);
                            jwtToken(user, navigate, from);
                        }
                        else {
                            logout();
                            toast.error('Your account has been deleted');
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    })
            })
            .catch(e => {
                console.error(e);
                setLoginError(e.message);

            })
    }

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
                <h1 className='text-3xl font-bold text-primary text-center'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} className='my-4'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" placeholder="your email" className="input input-bordered w-full" />
                    </div>
                    {errors.email && errors.email.type === "required" && <p className='mt-2 text-error'>??? Email is required</p>}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: true })} type="password" placeholder="your password" className="input input-bordered w-full" />
                    </div>
                    {errors.password && errors.password.type === "required" && <p className='mt-2 text-error'>??? Password is required</p>}
                    {/* <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select> */}
                    {loginError && <p className='mt-3 text-error'>{loginError}</p>}
                    <input className='btn btn-primary mt-4 w-full' type="submit" value={'Login'} />
                </form>
                <p className='text-sm text-center'>New to Guitar Square? <Link to='/register' state={{ from: previousLocation }} replace className='text-primary hover:underline hover:text-secondary'>Create new Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className="btn btn-outline btn-success w-full">Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;