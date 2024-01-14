import { Card } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import showToast from '../../Utils/showToast'
import Asterik from '../../Utils/Asterik'

const Login = () => {

    const variants = {
        hidden: { x: -30 },
        visible: { x: 0 }
    };

    const navigate = useNavigate();

    
    
    const [userState, setUserState] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        });
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        showToast({
            msg: "Logged In Successfully",
            type: "success",
            duration:2000
        })

        navigate('/mock-interview');
    }
    

    return (
        <motion.div  // Add key prop here
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ type: "spring", stiffness: 100 }}>
            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mt-16 mx-auto md:mt-14 lg:py-0 ">

                    <div className="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4" action="#" onSubmit={onSubmitHandler}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm  text-gray-900 dark:text-white font-inter font-bold">Email <Asterik /></label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter" placeholder="name@company.com" required="" value={userState.email} onChange={onChangeHandler}/>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">Password <Asterik /></label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" autoComplete='on' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.password} onChange={onChangeHandler}/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">


                                    </div>
                                    <Link to="/forgot-password" className="text-sm text-primary-600 font-inter font-bold hover:underline dark:text-primary-500 text-light-blue-900">Forgot password?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-btn-col hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold">Sign in</button>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-inter">
                                    Don’t have an account yet? <Link to="/signup" className=" text-light-blue-900 font-bold hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Login