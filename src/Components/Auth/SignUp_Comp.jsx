import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Progressor from './Progressor'
import { motion } from "framer-motion"
import { isStrongPassword, isValidEmail } from '../../Utils/functions'
import { Button } from '@mui/material'


const Step1 = (props) => {

    const { userState, onChangeHandler } = props;

    return (<>
        <div>
            <label for="email" class="block mb-2 text-sm  text-gray-900 dark:text-white font-inter font-bold">Email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter" placeholder="name@company.com" value={userState.email} required="" onChange={onChangeHandler} />
            {userState.email.length>0 && !isValidEmail(userState.email)?<div className="error text-xs text-red-600 mt-1">
                    Please enter a valid email address.
            </div>:null}
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.password} onChange={onChangeHandler} />
        </div>
        <div>
            <label for="cpassword" class="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">Confirm Password</label>
            <input type="password" name="confirmPassword" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.confirmPassword} onChange={onChangeHandler} />

            {userState.password.length>0 && !isStrongPassword(userState.password)?<div className="error text-xs text-red-600 mt-1">
                    Please choose a stronger password. Try a mix of letters, numbers and symbols.
            </div>:(userState.password!==userState.confirmPassword && userState.confirmPassword.length>0)?
            <div className="error text-xs text-red-600 mt-1">
                    Passwords do not match
            </div>:null}
        </div>
    </>)

}

const SignUp_Comp = () => {

    const [userState, setUserState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
        firstName: "",
        lastName: "",
    });

    const onChangeHandler = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        });
    }


    const [step, setStep] = useState(1);

    const variants = {
        hidden: { x: -30 },
        visible: { x: 0 }
    };

    return (



        <section class=" dark:bg-gray-900 mb-5 z-10 overflow-hidden">

            <div class="flex flex-col items-center justify-center px-6  mt-7 mx-auto md:mt-7 lg:py-0 ">

                <div class="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter text-center">
                            Sign up for an account
                        </h1>

                        <Progressor />

                        <motion.div key={step} // Add key prop here
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ type: "spring", stiffness: 100 }} class="space-y-4 md:space-y-6">

                            {step === 1 ? <Step1 userState={userState} onChangeHandler={onChangeHandler} /> : <></>}

                        </motion.div>
                        <div className="flex justify-between">
                            <Button variant="outlined" class={`w-auto text-white ${step===1?"bg-gray-600":"bg-[#db2777]"} hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold`}>Prev</Button>

                            <Button variant='contained' class="w-auto text-white bg-[#db2777] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold">Next</Button>
                        </div>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 font-inter">
                                Already have an account? <Link to="/login" class=" text-light-blue-900 font-bold hover:underline dark:text-primary-500">Sign in</Link>
                            </p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SignUp_Comp