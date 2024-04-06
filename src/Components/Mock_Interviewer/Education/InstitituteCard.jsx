import React, { useState, useEffect } from 'react'
import { LuPencil } from "react-icons/lu";

import { FaPlus } from "react-icons/fa6";
import showToast from '../../../Utils/showToast';
import { addUserEducation, editUserEducation } from '../../../APIs/User_API';
import { getDateDiffrence } from '../../../Utils/functions';



const dateFromISO = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const EducationForm = (props) => {

    const { setOpenNew, education, visibleEducation, setVisibleEducation, setEdit, index } = props;

    const [instituteName, setInstitituteName] = useState(education.instituteName || '');
    const [degree, setDegree] = useState(education.degree || '');
    const [branch, setBranch] = useState(education.branch || '');
    const [startDate, setStartDate] = useState(dateFromISO(education.startDate) || '');
    const [endDate, setEndDate] = useState(dateFromISO(education.endDate) || '');
    const [description, setDescription] = useState(education.description || '');

    const [loading, setLoading] = useState(false);


    const handleClose = () => {
        setEdit(false);
        setInstitituteName('');
        setDegree('');
        setBranch('');
        setStartDate('');
        setEndDate('');
        setDescription('');
        document.body.style.overflow = 'auto';
    }

    const addEducation = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                showToast({
                    msg: "Please Login First",
                    type: "error",
                    duration: 3000,
                })
                return;
            }

            const data = {
                instituteName,
                degree,
                branch,
                startDate,
                endDate,
                description
            }

            setLoading(true);
            const response = await editUserEducation(data, token, education._id);
            setLoading(false);

            console.log({ response })

            if (response.success) {

                // add response.data to visibleEducation[index]

                visibleEducation[index] = response.data;

                setVisibleEducation([...visibleEducation]);

                showToast({
                    msg: response.msg,
                    type: "success",
                    duration: 4000,
                })

                setInstitituteName('');
                setDegree('');
                setBranch('');
                setStartDate('');
                setEndDate('');
                setDescription('');

                setEdit(false);
                document.body.style.overflow = 'auto';

                //   setVisibleEducation([...visibleEducation, response.data]);
            }

            else {
                showToast({
                    msg: response.msg,
                    type: "error",
                    duration: 3000,
                })
            }

        } catch (err) {
            showToast({
                msg: err.toString(),
                type: "error",
                duration: 3000,
            })
        }
    }


    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center mt-8 md:mt-0 md:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full sm:max-w-lg"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 mx-2 sm:mx-0   sm:text-left">
                            <div
                                className="text-lg font-semibold text-gray-900 font-inter mb-7"
                                id="modal-headline"
                            >
                                {`Edit Education`}
                            </div>
                            <form className="max-w-md mx-auto font-inter font-semibold" onSubmit={addEducation}>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={instituteName} onChange={(e) => setInstitituteName(e.target.value)} />
                                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Institute Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={degree} onChange={(e) => setDegree(e.target.value)} />
                                    <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Degree</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={branch} onChange={(e) => setBranch(e.target.value)} />
                                    <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Branch</label>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6 my-3 mt-8">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="date" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="date" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <textarea type="text" name="repeat_password" cols={3} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                                </div>
                                <div className="flex space-x-4">
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading} onClick={addEducation}>{loading ? "Submitting..." : "Submit"}</button>
                                    <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleClose}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const InstitituteCard = (props) => {

    const { instituteName, degree, startDate, endDate, description, branch  } = props.education;
    const {index, visibleEducation, setVisibleEducation, isEdit} = props;

    const startYear = startDate.slice(0, 4);
    const endYear = endDate.slice(0, 4);

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
        document.body.style.overflow = 'hidden';
    }

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='logo'>
                        <img src="https://cdn.icon-icons.com/icons2/38/PNG/512/university_4593.png" alt="logo" className='h-[40px] w-[40px] mt-5 mx-4' />
                    </div>
                    <div className="info ml-2 mr-2 md:mx-2">
                        <h1 className="font-roboto text-sm md:text-base font-medium mt-4 mb-1">{instituteName}</h1>
                        <h1 className="font-inter text-xs md:text-sm  text-gray-500">{degree} - {branch} </h1>
                        <h1 className="font-inter text-xs md:text-sm text-gray-500">{startYear} - {endYear} . {getDateDiffrence(startDate, endDate)} years</h1>
                    </div>
                </div>
                {isEdit?<LuPencil size={20} className="mt-4 mr-4 hover:cursor-pointer" onClick={handleEdit} />:null}

            </div>
            {description !== "" && <div className="about">
                <h1 className="font-inter text-xs md:text-sm text-gray-500 ml-[70px] md:ml-[80px] mt-2 mx-10 ">
                    {/* Filler text is text that shares some characteristics of a real written text, but is
                    random or otherwise generated. It may be used to display a sample of fonts, 
                    generate text for testing, or to spoof an e-mail spam filter. */}

                    {description}

                </h1>
            </div>}
            <hr className='w-11/12 mx-4 mt-2' />

            {edit ? <EducationForm setEdit={setEdit} education={props.education} visibleEducation={visibleEducation} setVisibleEducation={setVisibleEducation} index={index} /> : null}
        </>
    )
}

export default InstitituteCard