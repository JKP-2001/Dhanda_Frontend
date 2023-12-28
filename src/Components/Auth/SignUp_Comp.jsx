import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Progressor from './Progressor'
import { motion } from "framer-motion"
import { isStrongPassword, isValidEmail, isValidName } from '../../Utils/functions'
import { Button } from '@mui/material'


const Asterik = () => {
    return (<span className="text-red-500 ml-1">*</span>)

}


const Step1 = (props) => {

    const { userState, onChangeHandler } = props;

    return (<>
        <div>
            <label for="email" class="block mb-2 text-sm  text-gray-900 dark:text-white font-inter font-bold">
                Email<Asterik />
            </label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter" placeholder="name@company.com" value={userState.email} required="" onChange={onChangeHandler} />
            {userState.email.length > 0 && !isValidEmail(userState.email) ? <div className="error text-xs text-red-600 mt-1">
                Please enter a valid email address.
            </div> : null}
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">
                Password<Asterik />
            </label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.password} onChange={onChangeHandler} />
        </div>
        <div>
            <label for="cpassword" class="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">
                Confirm Password <Asterik />
            </label>
            <input type="password" name="confirmPassword" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold" required="" value={userState.confirmPassword} onChange={onChangeHandler} />

            {userState.password.length > 0 && !isStrongPassword(userState.password) ? <div className="error text-xs text-red-600 mt-1">
                Please choose a stronger password. Try a mix of letters, numbers and symbols.
            </div> : (userState.password !== userState.confirmPassword && userState.confirmPassword.length > 0) ?
                <div className="error text-xs text-red-600 mt-1">
                    Passwords do not match
                </div> : null}
        </div>
    </>)

}


const Step2 = (props) => {
    const { userState, onChangeHandler } = props;

    return (
        <>
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
        </>
    );
};




const Step3 = (props) => {
    const { userState, setStep } = props;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                    <div className="data mt-2 mx-2">
                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                Email :
                            </div>
                            <div className="emaildata text-sm font-inter">
                                {userState.email}
                            </div>
                        </div>
                        <div className="flex space-x-2 my-1 justify-between">
                            <div className="flex space-x-2">
                                <div className="password text-sm font-inter font-bold">
                                    Password :
                                </div>

                                <div className="emaildata text-sm font-inter">
                                    {showPassword ? userState.password : "••••••••"}
                                </div>
                            </div>
                            <div className="show text-sm font-inter font-bold text-blue-800 hover:cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword?"hide":"show"}
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
                    <div className="data mt-2 mx-2">
                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                First Name :
                            </div>
                            <div className="emaildata text-sm font-inter">
                                {userState.firstName}
                            </div>
                        </div>
                        {userState.middleName.length > 0 ?
                            <div className="flex space-x-2 my-1">
                                <div className="email text-sm font-inter font-bold">
                                    Middle Name :
                                </div>
                                <div className="emaildata text-sm font-inter">
                                    {userState.middleName}
                                </div>
                            </div>
                            : null}
                        <div className="flex space-x-2 my-1">
                            <div className="password text-sm font-inter font-bold">
                                Last Name :
                            </div>
                            <div className="emaildata text-sm font-inter">
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
    const { userState, onChangeHandler } = props;

    return (
        <>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Verify Yourself
                </h2>
            </div>

            <div>
                <label for="password" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                    OTP <Asterik />
                </label>
                <input
                    type="password"
                    name="otp"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"

                    value={userState.otp}
                    required
                    onChange={onChangeHandler}
                />
            </div>
        </>
    )

}





const SignUp_Comp = () => {




    const [userState, setUserState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
        firstName: "",
        middleName: "",
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

    const handlePrev = () => {
        if (step == 1) {
            return;
        }
        setStep(step - 1);
    }

    const handleNext = () => {
        if (step == 4) {
            return;
        }
        setStep(step + 1);
    }


    return (



        <section class=" dark:bg-gray-900 mb-5 z-10 overflow-hidden">

            <div class="flex flex-col items-center justify-center px-6  mt-7 mx-auto md:mt-7 lg:py-0 ">

                <div class="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter text-center">
                            Sign up for an account
                        </h1>

                        <Progressor step={step - 1} setStep={setStep} handleNext={handleNext} handlePrev={handlePrev} />

                        <motion.div key={step} // Add key prop here
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ type: "spring", stiffness: 100 }} class="space-y-4 md:space-y-6">

                            {step === 1 ? <Step1 userState={userState} onChangeHandler={onChangeHandler} /> : step === 2 ? <Step2 userState={userState} onChangeHandler={onChangeHandler} /> : step == 3 ? <Step3 userState={userState} setStep={setStep} /> : step == 4 ? <Step4 userState={userState} onChangeHandler={onChangeHandler} /> : <></>}

                        </motion.div>
                        <div className="flex justify-between">
                            <div></div>
                            <div className="flex required space-x-1">
                                <span className="text-red-500">*</span>
                                <div className="text-black font-inter font-medium text-sm">Required</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            {step == 1 ? null : <Button variant="outlined" onClick={handlePrev} class={`w-auto text-black  bg-gray-400 hover:bg-primary-700  rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold`}>Prev</Button>}

                            <Button variant='contained' class="w-auto text-white bg-[#db2777] hover:bg-primary-700   rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold" onClick={handleNext}>{step === 2 ? "Preview" : step === 3 ? "Submit" : "Next"}</Button>
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