import React, { useState, useEffect } from 'react'

import { FaPlus } from "react-icons/fa6";
import showToast from '../../../Utils/showToast';
import { addUserEducation, deleteUserExperience, editUserExperience, getUserData } from '../../../APIs/User_API';
import { LuPencil } from 'react-icons/lu';
import { AiOutlineDelete } from "react-icons/ai";
import { getLoginUser } from '../../../App';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'

const dateFromISO = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const CompanyForm = (props) => {

    const { setOpenNew, exp, visibleEducation, setVisibleEducation, setEdit, index, dispatch, navigate } = props;



    const [role, setRole] = useState(exp.role ? exp.role : '');
    const [company, setCompany] = useState(exp.company ? exp.company : '');
    const [startDate, setStartDate] = useState(exp.startDate ? dateFromISO(exp.startDate) : '');
    const [endDate, setEndDate] = useState(exp.endDate ? dateFromISO(exp.endDate) : '');
    const [description, setDescription] = useState(exp.description ? exp.description : '');

    const [loading, setLoading] = useState(false);


    const handleClose = () => {
        setEdit(false);
        setRole('');
        setCompany('');
        setStartDate('');
        setEndDate('');
        setDescription('');
        document.body.style.overflow = 'auto';
    }

    const editExperience = async (e) => {
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
                role,
                company,
                startDate,
                endDate,
                description
            }

            setLoading(true);
            const response = await editUserExperience(data, token, exp._id);
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

                setRole('');
                setCompany('');
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
                            <form className="max-w-md mx-auto font-inter font-semibold" onSubmit={editExperience}>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={company} onChange={(e) => setCompany(e.target.value)} />
                                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={role} onChange={(e) => setRole(e.target.value)} />
                                    <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Role</label>
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
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading} onClick={editExperience}>{loading ? "Submitting..." : "Submit"}</button>
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


const DeleteForm = (props) => {


    const { setDeleteCard, visibleEducation, setVisibleEducation, index} = props;

    const handleCancel = () => {
        setDeleteCard(false);
        document.body.style.overflow = 'auto';
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        try {

            const token = localStorage.getItem("token");
            
            if(!token){
                showToast({
                    msg: "Please Login First",
                    type: "error",
                    duration: 3000
                });
                return;
            }

            setLoading(true);

            const response = await deleteUserExperience(token, visibleEducation[index]._id);
            getLoginUser(dispatch, navigate);

            setLoading(false);

            if(response.success){
                const temp = [...visibleEducation];
                temp.splice(index, 1);
                setVisibleEducation([...temp]);

                showToast({
                    msg: response.msg,
                    type: "success",
                    duration: 3000
                });

                handleCancel();
            } else {
                showToast({
                    msg: response.msg,
                    type: "error",
                    duration: 3000
                });
            }
        }catch(err){
            
            showToast({
                msg: err.toString(),
                type: "error",
                duration: 3000
            });
        }
    }
    
    return(
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
                                {`Are you sure?`}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleDelete}>{loading?"Deleting...":"Delete"}</button>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CompanyCard = (props) => {

    const { role, startDate, endDate, description, company } = props.exp;

    const { isEdit, visibleEducation, setVisibleEducation, index} = props;

    const startYear = startDate.slice(0, 4);

    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

    

    const endYear = endDate ? endDate.slice(0, 4) : currentYear;

    const [edit, setEdit] = useState(false);

    const [deleteCard, setDeleteCard] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
        document.body.style.overflow = 'hidden';
    }

    const handleDelete = () => {
        setDeleteCard(true);
        document.body.style.overflow = 'hidden';
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className='transition-height ease-in-out duration-500 overflow-hidden'>
            <div className="flex justify-between">
                <div className='flex'>
                    <div className='logo'>
                        <img src="https://cdn-icons-png.freepik.com/512/895/895360.png?ga=GA1.1.1404805500.1684049480&" alt="logo" className='h-[30px] w-[30px] md:h-[40px] md:w-[40px] mt-5 mx-4' />
                    </div>
                    <div className="info mx-2">
                        <h1 className="font-roboto text-sm md:ext-base font-medium mt-4 mb-1">{role}</h1>
                        <h1 className="font-inter text-xs md:text-sm text-gray-500">{company}  {endDate ? " - Full-time" : ""} </h1>
                        <h1 className="font-inter text-xs md:text-sm text-gray-500">{startYear} - {endDate ? endYear : "Present"} . {currentYear - startYear} years </h1>
                    </div>
                </div>

                <div className="flex space-x-4 mr-4 ">
                {isEdit ? <LuPencil size={20} className="mt-4 hover:cursor-pointer" onClick={handleEdit} /> : null}

                {isEdit ?<AiOutlineDelete size={20} className="mt-4 hover:cursor-pointer" onClick={handleDelete}/> : null}
                </div>
            </div>
            <div className="about">
                <h1 className="font-inter text-xs text-justify md:text-sm text-gray-500 ml-[80px] lg:ml-[80px] mt-2 mx-10 break-words whitespace-pre-wrap">
                    {seeMore?description:description.slice(0, 150)}{(description.length>150 && !seeMore)?"...":" "}
                </h1>
            </div>
            {description.length>150?<div className="about">
                <h1 className="font-inter hover:cursor-pointer text-blue-500 hover:underline text-xs text-justify md:text-sm ml-[80px] lg:ml-[80px] mt-2 mx-10 break-words" onClick={()=>setSeeMore(!seeMore)}>
                    {seeMore?"See Less":"See More"}
                </h1>
            </div>:null}
            <hr className='w-11/12 mx-4 mt-2' />

            {edit ? <CompanyForm setEdit={setEdit} exp={props.exp} visibleEducation={visibleEducation} setVisibleEducation={setVisibleEducation} index={index} /> : null}

            {deleteCard ? <DeleteForm setDeleteCard={setDeleteCard} visibleEducation={visibleEducation} setVisibleEducation={setVisibleEducation} index={index} dispatch={dispatch} navigate={navigate} /> : null}
        </div>
    );
}

export default CompanyCard