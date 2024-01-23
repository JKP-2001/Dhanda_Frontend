import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Asterik from '../../Utils/Asterik';
import { decryptFromJson, isStrongPassword } from '../../Utils/functions';
import showToast from '../../Utils/showToast';
import { changePassword } from '../../APIs/Auth_API';
import Loader from '../../Utils/Loader';

const NewPassword_Comp = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const key = searchParams.get("key");




    useEffect(() => {
        if (!key) {
            showToast({
                msg: "Key not found.",
                type: "error",
                duration: 3000
            })
        }
    }, [key]);

    const [loading, setLoading] = useState(false);


    const variants = {
        hidden: { x: -30 },
        visible: { x: 0 }
    };

    const navigate = useNavigate();


    const [userState, setUserState] = useState({
        password: '',
        cpassword: ''
    });

    const onChangeHandler = async (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        });
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!isStrongPassword(userState.cpassword)) {
            showToast({
                msg: "Password not strong enough.",
                type: "error",
                duration: 3000
            })
            return;
        }

        if (userState.password !== userState.cpassword) {
            showToast({
                msg: "Passwords do not match",
                type: "error",
                duration: 3000
            })
            return;
        }


        const decryptedData = decryptFromJson(key);

        console.log({decryptedData})


        const newData = {
            email:decryptedData.email,
            password:userState.password,
            createdAt:decryptedData.createdAt
        }


        setLoading(true);

        const response = await changePassword(newData);

        setLoading(false);


        if (response.success) {
            showToast({
                msg: "Password changed successfully",
                type: "success",
                duration: 3000
            })

            navigate('/signin');

            return;
        }

        else {
            showToast({
                msg: response.msg,
                type: "error",
                duration: 3000
            })

            return;
        }
    }


    return (
        <motion.div >
            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mt-16 mx-auto md:mt-14 lg:py-0 ">

                    <div className="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter">
                                Reset Your Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitHandler}>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">New Password <Asterik /> </label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" autoComplete='on' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.password} onChange={onChangeHandler} />
                                </div>

                                <div>
                                    <label for="cpassword" className="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">Confirm New Password <Asterik /></label>
                                    <input type="password" name="cpassword" id="password2" placeholder="••••••••" autoComplete='on' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.cpassword} onChange={onChangeHandler} />
                                    {userState.password.length > 0 && (userState.password.length < 8 || userState.password.length > 20) ? <div className="error text-xs text-red-600 mt-1">
                                        Password must be between 8 and 20 characters
                                    </div> : (userState.password.length > 0 && !isStrongPassword(userState.password) ? <div className="error text-xs text-red-600 mt-1">
                                        Please choose a stronger password. Try a mix of letters, numbers and symbols.
                                    </div> : (userState.password !== userState.cpassword && userState.cpassword.length > 0) ?
                                        <div className="error text-xs text-red-600 mt-1">
                                            Passwords do not match
                                        </div> : null)}
                                </div>



                                {!loading ? <button type="submit" className="w-full text-white bg-[#db2777] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold">Submit</button> :

                                    <button type="submit" className="w-full text-white bg-[#db2777] hover:bg-primary-700   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold flex justify-center" disabled>
                                        <Loader />
                                        <div>
                                            Processing....
                                        </div>
                                    </button>}


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

export default NewPassword_Comp