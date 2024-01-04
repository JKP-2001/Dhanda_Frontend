import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Progressor from './Progressor'
import { motion } from "framer-motion"
import { isStrongPassword, isValidEmail, isValidName } from '../../Utils/functions'
import { Button } from '@mui/material'
import showToast from '../../Utils/showToast'


const Asterik = () => {
    return (<span className="text-red-500 ml-[0.1px]">*</span>)

}


const Step1 = (props) => {

    const { userState, onChangeHandler, handleNext } = props;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

    }, [props]);

    return (<>
        <form className='space-y-3'>
            <div>
                <label htmlFor="email" className="block mt-2 text-sm  text-gray-900 dark:text-white mb-1 font-inter font-bold">
                    Email<Asterik />
                </label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter" placeholder="name@company.com" value={userState.email} required="" onChange={onChangeHandler} />
                {userState.email.length > 0 && !isValidEmail(userState.email) ? <div className="error text-xs text-red-600 mt-1">
                    Please enter a valid email address.
                </div> : null}
            </div>
            <div>
                <label htmlFor="password" className="block mb-1 text-sm font-bold font-inter text-gray-900 dark:text-white mt-2">
                    Password<Asterik />
                </label>
                <input type="password" autoComplete='on' name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.password} onChange={onChangeHandler} />
            </div>
            <div>
                <label htmlFor="cpassword" className="block mb-1 text-sm font-bold font-inter text-gray-900 dark:text-white mt-2">
                    Confirm Password <Asterik />
                </label>
                <input type="password" autoComplete='on' name="confirmPassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.confirmPassword} onChange={onChangeHandler} />

                {userState.password.length > 0 && !isStrongPassword(userState.password) ? <div className="error text-xs text-red-600 mt-1">
                    Please choose a stronger password. Try a mix of letters, numbers and symbols.
                </div> : (userState.password !== userState.confirmPassword && userState.confirmPassword.length > 0) ?
                    <div className="error text-xs text-red-600 mt-1">
                        Passwords do not match
                    </div> : null}
            </div>
        </form>
    </>)

}


const Step2 = (props) => {
    const { userState, onChangeHandler, handleNext } = props;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [props]);

    return (
        <>
            <form>
                <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        First Name <Asterik />
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="John"
                        value={userState.firstName}
                        required
                        onChange={onChangeHandler}
                    />

                    {userState.firstName.length > 0 && !isValidName(userState.firstName) ? (
                        <div className="error text-xs text-red-600 mt-1">
                            Please enter a valid first name.
                        </div>
                    ) : null}
                </div>


                <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="lastName"
                        placeholder="Doe"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold"
                        required
                        value={userState.middleName}
                        onChange={onChangeHandler}
                    />
                    {userState.middleName.length > 0 && !isValidName(userState.middleName) ? (
                        <div className="error text-xs text-red-600 mt-1">
                            Please enter a valid last name.
                        </div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">
                        Last Name<Asterik />
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Doe"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold"
                        required
                        value={userState.lastName}
                        onChange={onChangeHandler}
                    />
                    {userState.lastName.length > 0 && !isValidName(userState.lastName) ? (
                        <div className="error text-xs text-red-600 mt-1">
                            Please enter a valid last name.
                        </div>
                    ) : null}
                </div>
            </form>
        </>
    );
};




const Step3 = (props) => {
    const { userState, setStep, handleNext } = props;
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [props]);


    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Review Your Information
                </h2>
            </div>
            <div className="bg-gray-100 dark:bg-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl">
                <div className="heading1">
                    <div className="login flex justify-between">
                        <div className="text-sm font-inter font-bold">
                            Login Credentials
                        </div>
                        <div className="edit font-inter text-blue-800 text-sm hover:cursor-pointer" onClick={() => setStep(1)}>
                            edit
                        </div>
                    </div>
                    <hr className=' border-gray-500' />
                    <div className="data mt-2 mx-1">
                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                Email:
                            </div>
                            <div className="emaildata text-sm font-handwritten2">
                                {userState.email}
                            </div>
                        </div>
                        <div className="flex flex-wrap space-x-2 my-1 justify-between">
                            <div className="flex space-x-2">
                                <div className="password text-sm font-inter font-bold">
                                    Password:
                                </div>

                                <div className="emaildata text-sm font-handwritten2">
                                    {showPassword ? userState.password : userState.password.length > 0 ? "••••••••" : ""}
                                </div>
                            </div>
                            <div className="show text-sm font-inter font-bold text-blue-800 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "hide" : "show"}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="heading2 mt-4">
                    <div className="personal-info flex justify-between">
                        <div className="text-sm font-inter font-bold">
                            Peronal Information
                        </div>
                        <div className="edit font-inter text-blue-800 text-sm hover:cursor-pointer" onClick={() => setStep(2)}>
                            edit
                        </div>
                    </div>
                    <hr className=' border-gray-500' />
                    <div className="data mt-2 mx-1">
                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                First Name:
                            </div>
                            <div className="emaildata text-sm font-handwritten2">
                                {userState.firstName}
                            </div>
                        </div>
                        {userState.middleName.length > 0 ?
                            <div className="flex space-x-2 my-1">
                                <div className="email text-sm font-inter font-bold">
                                    Middle Name:
                                </div>
                                <div className="emaildata text-sm font-handwritten2">
                                    {userState.middleName}
                                </div>
                            </div>
                            : null}
                        <div className="flex space-x-2 my-1">
                            <div className="password text-sm font-inter font-bold">
                                Last Name:
                            </div>
                            <div className="emaildata text-sm font-handwritten2">
                                {userState.lastName}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};


const Step4 = (props) => {
    const { userState, onChangeHandler, handleNext } = props;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [props]);

    return (
        <>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Verify Yourself
                </h2>
            </div>

            <form>

                <div>
                    <label htmlFor="password" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        OTP <Asterik />
                    </label>
                    <input
                        type="password"
                        autoComplete='off'
                        name="otp"
                        id="otp"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder='Enter OTP sent to your email'
                        value={userState.otp}
                        required
                        onChange={onChangeHandler}
                    />
                </div>
            </form>
        </>
    )

}





const SignUp_Comp = () => {

    
    const navigate = useNavigate();

    const [userState, setUserState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
        firstName: "",
        middleName: "",
        lastName: "",
    });

    const [step, setStep] = useState(1);

    const onChangeHandler = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        });
    }



    
    const handlePrev = () => {
        if (step === 1) {
            return;
        }
        setStep(step - 1);
    }
    
    const handleNext = () => {

        if (step === 4) {
            showToast({
                msg: "Signed Up Successfully",
                type: "success",
                duration: 3000,
            });

            navigate("/signin");
            
            return;
        }
        
        if (step === 3) {
            showToast({
                msg: "Information Submitted Successfully, Please check your email for OTP",
                type: "success",
                duration: 2000,
            });
        }
        setStep(step + 1);
    }
    
    
    
    
    const variants = {
        hidden: { x: -30 },
        visible: { x: 0 }
    };


    return (


        <motion.div key={step} // Add key prop here
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ type: "spring", stiffness: 100 }} >
            <section className=" dark:bg-gray-900 mb-5 z-10 overflow-hidden">

                <div className="flex flex-col items-center justify-center px-6  mt-7 mx-auto md:mt-7 lg:py-0 ">

                    <div className="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter text-center">
                                Sign up for an account
                            </h1>

                            <Progressor step={step - 1} setStep={setStep} handleNext={handleNext} handlePrev={handlePrev} />

                            <motion.div key={step} // Add key prop here
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                                transition={{ type: "spring", stiffness: 100 }} className="space-y-4 md:space-y-6">

                                {step === 1 ? <Step1 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext}/> : step === 2 ? <Step2 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext}/> : step === 3 ? <Step3 userState={userState} setStep={setStep} handleNext={handleNext}/> : step === 4 ? <Step4 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext}/> : <></>}

                            </motion.div>
                            <div className="flex justify-between">
                                <div></div>
                                <div className="flex required space-x-1">
                                    <span className="text-red-500">*</span>
                                    <div className="text-black font-inter font-medium text-sm">Required</div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                {step === 1 ? null : <button type="submit" className="w-auto text-black border-[1px] border-blue-500  hover:bg-primary-700  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold" onClick={handlePrev}>Prev</button>}

                                <button type="submit" className="w-auto text-white bg-[#db2777] hover:bg-primary-700   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold" onClick={handleNext} >{step === 2 ? "Preview" : (step === 3 || step=== 4)? "Submit" : "Next"}</button>
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-inter">
                                Already have an account? <Link to="/signin" className=" text-light-blue-900 font-bold hover:underline dark:text-primary-500">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>

    )
}

export default SignUp_Comp