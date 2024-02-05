import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import showToast from '../../Utils/showToast';
import Progressor from '../Auth/Progressor';
import Loader from '../../Utils/Loader';


import { motion } from 'framer-motion';
import Asterik from '../../Utils/Asterik';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import DatePicker from '../../Utils/DatePicker';
import { callOnBoardingProcess, getUserData } from '../../APIs/User_API';
import { decryptFromJson } from '../../Utils/functions';
import { getUserSuccess } from '../../Redux/user/userSlice';

const variants = {
    hidden: { x: -30 },
    visible: { x: 0 }
};

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


    return (
        <>

            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Tell us about yourself
                </h2>
            </div>

            <form>
                <div className='mb-4'>
                    <label htmlFor="bio" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Bio <Asterik />
                    </label>
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="eg. Software Engineer | Ex-PayPal etc."
                        value={userState.bio}
                        required
                        onChange={onChangeHandler}
                    />
                </div>


                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-bold font-inter text-gray-900 dark:text-white">
                        Description <Asterik />
                    </label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        placeholder="eg. Hello, I'm John – a Mechanical Engineer turned Data Analyst on a journey of  .........."
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-inter font-bold"
                        required
                        rows={5}
                        value={userState.description}
                        onChange={onChangeHandler}
                    />

                </div>

            </form>
        </>
    )
}


const Step3 = (props) => {

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


    const handleDateChange = (date) => {
        onChangeHandler({
            target: {
                name: 'startDate',
                value: date,
            },
        });
    };

    return (
        <>

            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Tell us about your current company
                </h2>
            </div>

            <form>
                <div className='mb-4'>
                    <label htmlFor="company" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Company Name <Asterik />
                    </label>
                    <input
                        type="text"
                        name="company"
                        id="company_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="eg. Google/ Microsoft/ Apple etc."
                        value={userState.current_job.company}
                        required
                        onChange={onChangeHandler}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="startDate" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Start Date <Asterik />
                    </label>

                    <DatePicker currDate={userState.current_job.startDate} onDateChange={handleDateChange} />

                </div>

                <div className='mb-4'>
                    <label htmlFor="role" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Role <Asterik />
                    </label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="eg. Software Engineer II"
                        value={userState.current_job.role}
                        required
                        onChange={onChangeHandler}
                    />
                </div>


                <div className='mb-4'>
                    <label htmlFor="description" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Description
                    </label>
                    <textarea
                        type="text"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="Tell us about your role...."
                        value={userState.current_job.description}
                        rows={4}
                        onChange={onChangeHandler}
                    />
                </div>


            </form>
        </>
    )

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

    const handleStartDateChange = (date) => {
        onChangeHandler({
            target: {
                name: 'startDate',
                value: date,
            },
        });
    };

    const handleEndDateChange = (date) => {
        onChangeHandler({
            target: {
                name: 'endDate',
                value: date,
            },
        });
    }

    return (
        <>

            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Tell us about your education
                </h2>
            </div>

            <form>
                <div className='mb-4'>
                    <label htmlFor="instituteName" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Institue Name <Asterik />
                    </label>
                    <input
                        type="text"
                        name="instituteName"
                        id="instituteName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="eg. Indian Institute Of Technology, Delhi."
                        value={userState.current_education.instituteName}
                        required
                        onChange={onChangeHandler}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="degree" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Degree <Asterik />
                    </label>
                    <input
                        type="text"
                        name="degree"
                        id="degree"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="eg. Bachelors Of Technology"
                        value={userState.current_education.degree}
                        required
                        onChange={onChangeHandler}
                    />
                </div>


                <div className='mb-4'>
                    <label htmlFor="branch" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Branch <Asterik />
                    </label>
                    <input
                        type="text"
                        name="branch"
                        id='branch'
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="eg. Computer Science And Engineering"
                        value={userState.current_education.branch}
                        required
                        onChange={onChangeHandler}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="startDate" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Start Date <Asterik />
                    </label>

                    <DatePicker currDate={userState.current_education.startDate} onDateChange={handleStartDateChange} />

                </div>

                <div className='mb-4'>
                    <label htmlFor="startDate" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        End Date <Asterik />
                    </label>

                    <DatePicker currDate={userState.current_education.endDate} onDateChange={handleEndDateChange} />

                </div>

                <div className='mb-4'>
                    <label htmlFor="description" className="block mb-2 text-sm text-gray-900 dark:text-white font-inter font-bold">
                        Description
                    </label>
                    <textarea
                        type="text"
                        name="description"
                        id='description'
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold font-inter"
                        placeholder="Tell us about your experience...."
                        value={userState.current_education.description}
                        onChange={onChangeHandler}
                        rows={3}
                    />
                </div>


            </form>
        </>
    )

}

const Step4 = (props) => {

    const { userState, onChangeHandler, handleNext, setStep } = props;



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
        <div className='z-0'>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white font-inter  text-center">
                    Review Your Information
                </h2>
            </div>
            <div className="bg-gray-100 dark:bg-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl">
                <div className="heading1">
                    <div className="login flex justify-between">
                        <div className="text-sm font-inter font-bold">
                            Personal Information
                        </div>
                        <div className="edit font-inter text-blue-800 text-sm hover:cursor-pointer" onClick={() => setStep(1)}>
                            edit
                        </div>
                    </div>
                    <hr className=' border-gray-500' />
                    <div className="data mt-2 mx-1">
                        <div className=" my-1">
                            <div className="email text-sm font-inter font-bold">
                                Bio:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.bio}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="email text-sm font-inter font-bold">
                                Description:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.description}
                            </div>
                        </div>
                    </div>
                </div>

                {userState.role!=="student"  && <div className="heading2 mt-4">
                    <div className="personal-info flex justify-between">
                        <div className="text-sm font-inter font-bold">
                            Job Information
                        </div>
                        <div className="edit font-inter text-blue-800 text-sm hover:cursor-pointer" onClick={() => setStep(2)}>
                            edit
                        </div>
                    </div>
                    <hr className=' border-gray-500' />
                    <div className="data mt-2 mx-1">
                        <div className="my-1">
                            <div className="email text-sm font-inter font-bold">
                                Company:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_job.company}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="email text-sm font-inter font-bold">
                                Role:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_job.role}
                            </div>
                        </div>

                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                Start Date:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_job.startDate}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="password text-sm font-inter font-bold">
                                Description:
                            </div>
                            <div className="text-sm font-inter font-normal">
                                {userState.current_job.description}
                            </div>
                        </div>
                    </div>
                </div>}

                <div className="heading2 mt-4">
                    <div className="personal-info flex justify-between">
                        <div className="text-sm font-inter font-bold">
                            Education Information
                        </div>
                        <div className="edit font-inter text-blue-800 text-sm hover:cursor-pointer" onClick={() => userState.role==="student"?setStep(2):setStep(3)}>
                            edit
                        </div>
                    </div>
                    <hr className=' border-gray-500' />
                    <div className="data mt-2 mx-1">
                        <div className="my-1">
                            <div className="email text-sm font-inter font-bold">
                                Institute:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_education.instituteName}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="email text-sm font-inter font-bold">
                                Degree:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_education.degree}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="password text-sm font-inter font-bold">
                                Branch:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_education.branch}
                            </div>
                        </div>

                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                Start Date:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_education.startDate}
                            </div>
                        </div>

                        <div className="flex space-x-2 my-1">
                            <div className="email text-sm font-inter font-bold">
                                End Date:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_education.endDate}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="password text-sm font-inter font-bold">
                                Description:
                            </div>
                            <div className="text-sm font-inter">
                                {userState.current_education.description}
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );

}

const OnBoarding = () => {

    const navigate = useNavigate();

    const [key, setKey] = useState(null);

    const [loading, setLoading] = useState(false);

    const userRedux = useSelector((state) => state.user);

    const user_name = userRedux.data ? userRedux.data.firstName : "";

    const dispatch = useDispatch();

    const [userState, setUserState] = useState({
        bio: "",
        decription: "",
        current_education: {
            instituteName: "",
            startDate: null,
            endDate: null,
            description: "",
            degree: "",
            branch: "",
            onGoing: false
        },
        current_job: {
            role: "",
            startDate: null,
            description: "",
            company: "",
            onGoing: false
        },
        role: userRedux.data ? userRedux.data.role : ""
    });

    

    const [step, setStep] = useState(1);

    const onChangeHandler = (e) => {
        if (step === 1) {
            setUserState({
                ...userState,
                [e.target.name]: e.target.value,
            });
        } else if (step === 3) {
            setUserState({
                ...userState,
                current_job: {
                    ...userState.current_job,
                    [e.target.name]: e.target.value,
                },
            });
        }
        else if (step === 2) {
            setUserState({
                ...userState,
                current_education: {
                    ...userState.current_education,
                    [e.target.name]: e.target.value,
                },
            });
        }
    }




    const handlePrev = () => {
        if (step === 1) {
            return;
        }
        setStep(step - 1);
    }

    const handleNext = async (e) => {

        if (loading) {
            return;
        }

        if(userState.role==="student"){

            const key = localStorage.getItem("unique");

            if(!key){
                showToast({
                    msg: "Invalid Key, please try again to login.",
                    type: "error",
                    duration: 3000,
                });
                return;
            }

            if(step===3){
                setLoading(true);

                const response = await callOnBoardingProcess(userState, key);

                if(response.success){
                    const userDataResponse = await getUserData(key);

                    setLoading(false);

                    if(userDataResponse.success!==true){
                        showToast({
                            msg: "Something went wrong, please try again.",
                            type: "error",
                            duration: 3000,
                        });
                        return;
                    }

                    const decryptedData = decryptFromJson(userDataResponse.data);

                    dispatch(getUserSuccess(decryptedData));

                    showToast({
                        msg: "Onboarding completed successfully.",
                        type: "success",
                        duration: 4000,
                    });

                    return;
                }

                else{
                    showToast({
                        msg: "Something went wrong, please try again.",
                        type: "error",
                        duration: 3000,
                    });
                    setLoading(false);
                    return;
                }
            }
        }

        else{

            const key = localStorage.getItem("unique");

            if(!key){
                showToast({
                    msg: "Invalid Key, please try again to login.",
                    type: "error",
                    duration: 3000,
                });
                return;
            }

            if(step===4){
                setLoading(true);

                const response = await callOnBoardingProcess(userState, key);

                if(response.success){
                    const userDataResponse = await getUserData(key);

                    setLoading(false);

                    if(userDataResponse.success!==true){
                        showToast({
                            msg: "Something went wrong, please try again.",
                            type: "error",
                            duration: 3000,
                        });
                        return;
                    }

                    const decryptedData = decryptFromJson(userDataResponse.data);

                    dispatch(getUserSuccess(decryptedData));

                    showToast({
                        msg: "Onboarding completed successfully.",
                        type: "success",
                        duration: 4000,
                    });

                    return;
                }

                else{
                    showToast({
                        msg: "Something went wrong, please try again.",
                        type: "error",
                        duration: 3000,
                    });
                    setLoading(false);
                    return;
                }
            }
        }

        setStep(step + 1);
    }


    useEffect(() => {
        showToast({
            msg: "Please fill the following details.",
            type: "success",
            duration: 4000,
        })
    },[]);



    return (
        !userRedux.data ? null :

            <div>
                <div  >
                    <section className=" dark:bg-gray-900 mb-5 z-0 overflow-hidden">

                        <div className="flex flex-col items-center justify-center px-6  mt-7 mx-auto md:mt-7 lg:py-0 ">

                            <div className="w-full bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 z-0">
                                    <h1 className=" ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter text-center">
                                        {`Welcome, ${user_name} 👋`}
                                    </h1>

                                    <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-base dark:text-white font-inter text-center">
                                        {`Please fill the following details`}
                                    </h1>

                                    <Progressor totalSteps={userState.role === "student" ? 3 : 4} step={step - 1} setStep={setStep} handleNext={handleNext} handlePrev={handlePrev} />

                                    <motion.div key={step} // Add key prop here
                                        initial="hidden"
                                        animate="visible"
                                        variants={variants}
                                        transition={{ type: "spring", stiffness: 100 }} className="space-y-4 md:space-y-6">

                                        {userState.role !== "student" ?

                                            step === 1 ? <Step1 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} /> : step === 2 ? <Step2 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} /> : step === 3 ? <Step3 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} /> : step == 4 ? <Step4 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} setStep={setStep} /> : <></>

                                            :

                                            step === 1 ? <Step1 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} /> : step === 2 ? <Step2 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} /> : step === 3 ? <Step4 userState={userState} onChangeHandler={onChangeHandler} handleNext={handleNext} setStep={setStep}/>  : <></>



                                        }



                                    </motion.div>
                                    <div className="flex justify-between">
                                        <div></div>
                                        <div className="flex required space-x-1">
                                            <Asterik />
                                            <div className="text-black font-inter font-medium text-sm">Required</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        {step === 1 ? null : <button type="submit" className="w-auto text-black border-[1px] border-blue-500  hover:bg-primary-700  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold" onClick={handlePrev}>Prev</button>}

                                        {!loading ? <button type="submit" className="w-auto text-white bg-[#db2777] hover:bg-primary-700   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold" onClick={handleNext} >{step === 3 ? "Preview" : (step === 4) ? "Submit" : step == 1 ? "Next" : step === 2 ? userState.role === "student" ? "Preview" : "Next" : ""}</button> :

                                            <button type="submit" className="w-auto text-white bg-[#db2777] hover:bg-primary-700   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold flex justify-center" disabled>
                                                <Loader />
                                                <div>
                                                    Processing....
                                                </div>
                                            </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
    )
}

export default OnBoarding