import React, { useState, useEffect } from 'react'

import { Card, useSelect } from '@material-tailwind/react'

import CompanyCard from './CompanyCard'
import { useSelector } from 'react-redux';

import { FaPlus } from "react-icons/fa6";
import showToast from '../../../Utils/showToast';
import { addUserEducation, addUserExperience } from '../../../APIs/User_API';
import { LuPencil } from 'react-icons/lu';


const CompanyForm = (props) => {

  const { setOpenNew, visibleEducation, setVisibleEducation } = props;

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);


  const handleClose = () => {
    setOpenNew(false);

    setRole('');
    setCompany('');
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
        role,
        company,
        startDate,
        endDate,
        description
      }

      setLoading(true);
      const response = await addUserExperience(data, token);
      setLoading(false);

      console.log({ response })

      if (response.success) {
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

        setOpenNew(false);
        document.body.style.overflow = 'auto';

        setVisibleEducation([...visibleEducation, response.data]);
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
                {`Add New Experience`}
              </div>
              <form className="max-w-md mx-auto font-inter font-semibold" onSubmit={addEducation}>
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



const ExperienceCard = (props) => {

  const [showAll, setShowAll] = useState(false);

  const userRedux = props.exp;

  const [visibleEducation, setVisibleEducation] = useState([]);



  const { isEdit } = props;

  const [openNew, setOpenNew] = useState(false);


  useEffect(() => {
    const educationList = [...userRedux.data.experience];
    educationList.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    if (showAll) {
      setVisibleEducation(educationList);
    } else {
      setVisibleEducation(educationList.slice(0, 2));
    }
  }, [userRedux, showAll, setOpenNew]);

  if (!userRedux || !userRedux.data) {
    return null;
  }

  const handleShowAll = () => {
    setShowAll(!showAll);
  }

  const addNewCompany = () => {
    setOpenNew(!openNew);
    document.body.style.overflow = "hidden";
  }

  return (
    <div>
      <Card className='w-[96%] lg:w-8/12 pb-2 border-2 border-gray-300'>
        <div className="flex justify-between">
          <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Experience</h1>
          {isEdit ?
            <div className="flex">
              <FaPlus size={20} className="mt-4 mr-4 hover:cursor-pointer" onClick={addNewCompany} />
            </div> : null}
        </div>
        <hr className='w-11/12 mx-4 mt-2' />

        {visibleEducation.map((exp, index) => (
          <CompanyCard exp={exp} key={index} isEdit={isEdit} index={index} visibleEducation={visibleEducation} setVisibleEducation={setVisibleEducation}/>
        ))}

        {userRedux.data.experience.length > 2 && (
          <div className="flex justify-center showAll font-roboto hover:cursor-pointer mt-2" onClick={() => setShowAll(!showAll)}>
            {!showAll ? 'Show All' : 'Show Less'}
          </div>
        )}
      </Card>

      {openNew ? <CompanyForm setOpenNew={setOpenNew} setVisibleEducation={setVisibleEducation} visibleEducation={visibleEducation} /> : null}
    </div>
  );
}

export default ExperienceCard