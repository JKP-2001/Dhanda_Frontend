import { Card } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <section class=" dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mt-16 mx-auto md:mt-14 lg:py-0 ">

                <div class="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm  text-gray-900 dark:text-white font-inter font-bold">Email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" />
                            </div>
                            <div class="flex items-center justify-between">
                            <div class="flex items-start">
                            
                                    
                                </div>
                                <a href="#" class="text-sm text-primary-600 font-inter font-bold hover:underline dark:text-primary-500 hover:text-light-blue-900">Forgot password?</a>
                            </div>
                            <button type="submit" class="w-full text-white bg-[#db2777] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold">Sign in</button>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 font-inter">
                                Don’t have an account yet? <Link to="/signup" class=" text-light-blue-900 font-bold hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login