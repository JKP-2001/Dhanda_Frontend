import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import Asterik from '../../Utils/Asterik';
import { isValidEmail } from '../../Utils/functions';
import showToast from '../../Utils/showToast';
import { changePasswordRequest } from '../../APIs/Auth_API';
import Loader from '../../Utils/Loader';

const ForgotPassword_Comp = () => {

    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const naviagte = useNavigate();

    const onChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const variants = {
        hidden: { x: -30 },
        visible: { x: 0 }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (email.length > 0 && !isValidEmail(email)) {


            showToast({
                msg: "Invalid Email.",
                type: "success",
                duration: 3000
            });

            return;
        }

        else {

            setLoading(true);

            const response = await changePasswordRequest({email});

            setLoading(false);

            if (response.success) {
                showToast({
                    msg: "Password reset link sent successfully.",
                    type: "success",
                    duration: 3000
                })
            }
            else{
                showToast({
                    msg: response.msg,
                    type: "error",
                    duration: 3000
                })
            }
        }

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
                                We Need To Verify You
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitHandler}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm  text-gray-900 dark:text-white font-inter font-bold">Email <Asterik />
                                    </label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter" placeholder="name@company.com" required="" onChange={onChangeHandler} value={email} />

                                    {email.length > 0 && !isValidEmail(email) ? <div className="error text-xs text-red-600 mt-1">
                                        Please enter a valid email address.
                                    </div> : null}
                                </div>



                                {!loading ? <button type="submit" className="w-full text-white bg-[#db2777] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold">Submit</button> :

                                    <button type="submit" className="w-full text-white bg-[#db2777] hover:bg-primary-700   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold flex justify-center" disabled>
                                        <Loader />
                                        <div>
                                            Processing....
                                        </div>
                                    </button>
                                }

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-inter">
                                    Back to sign in page? <Link to="/signin" className=" text-light-blue-900 font-bold hover:underline dark:text-primary-500">Sign in</Link>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default ForgotPassword_Comp