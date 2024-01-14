import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";


import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import EducationCard from '../Mock_Interviewer/Education/EducationCard';

import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { scrollToTop } from '../../Utils/functions';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';


const localizer = momentLocalizer(moment);


const Slider = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 text-center"
        >
            {/* Your actual slider component */}
            <div className="h-1 bg-blue-500 mx-auto"></div>
        </motion.div>
    )
}


const Account = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            
            transition={{ duration: 0.5 }}
            className='ml-5 lg:ml-7 mt-5'>

            <EducationCard />

        </motion.div>
    )
}


const Calendar_Part = () => {

    const events = [
        {
            title: 'Mock Interview with User1',
            start: new Date(2024, 0, 14, 10, 0), // Example date and time
            end: new Date(2024, 0, 14, 11, 0), // Example date and time
        },
        // Add more events as needed
    ];

    return (
        
            <div className="w-11/12 md:w-3/4 ml-5 lg:ml-7 mt-5">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: `550px` }}
                    selectable
                />
            </div>
  
    )
}


const User_Profile_Comp = () => {

    const variants = {
        hidden: { x: -100 },
        visible: { x: 0 }
    };

    const navigate = useNavigate();

    const [selectedIcon, setSelectedIcon] = useState("account");

    const handleIconClick = (icon) => {
        // Toggle the state to show/hide underline
        setSelectedIcon(icon);
    };

    useEffect(() => {
        scrollToTop();
    }, []);


    return (
        <>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="mt-8 ml-2 lg:mt-16 lg:ml-48 mb-10">
                    <div className='ml-3'>
                        <img
                            className="h-[170px] w-[170px] rounded-full object-cover object-center"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="nature"
                        />
                    </div>



                    <div className='ml-5 lg:ml-7'>
                        <h1 className="font-roboto text-xl font-thin mt-4">Manish Mishra</h1>
                        <h1 className="font-inter text-sm w-11/12 lg:w-8/12 text-gray-500">Software Engineer | Ex-PayPal | 110K+ LinkedIn Family | NIT Trichy'20</h1>
                    </div>

                    <div className='ml-5 lg:ml-7 description font-inter w-11/12 lg:w-8/12  mt-10 text-sm'>
                        Filler text is text that shares some characteristics of a real written text, but is
                        random or otherwise generated. It may be used to display a sample of fonts,
                        generate text for testing, or to spoof an e-mail spam filter.

                        Filler text is text that shares some characteristics of a real written text, but is
                        random or otherwise generated. It may be used to display a sample of fonts,
                        generate text for testing, or to spoof an e-mail spam filter.
                    </div>

                    <div className="flex space-x-14 md:space-x-20 ml-2 lg:ml-7 description font-inter w-11/12 lg:w-8/12 mt-10 text-sm justify-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleIconClick('account')}
                            className={`cursor-pointer ${selectedIcon === 'account' ? 'text-blue-500 underline' : ''}`}
                        >
                            <AccountBoxOutlinedIcon />
                            {/* Slider */}
                            {selectedIcon === 'account' && (
                                <Slider />
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleIconClick('grid')}
                            className={`cursor-pointer ${selectedIcon === 'grid' ? 'text-blue-500 underline' : ''}`}
                        >
                            <GridOnOutlinedIcon />
                            {/* Slider */}
                            {selectedIcon === 'grid' && (
                                <Slider />
                            )}
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleIconClick('bookmark')}
                            className={`cursor-pointer ${selectedIcon === 'bookmark' ? 'text-blue-500 underline' : ''}`}
                        >
                            <BookmarkBorderOutlinedIcon />
                            {/* Slider */}
                            {selectedIcon === 'bookmark' && (
                                <Slider />
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleIconClick('calendar')}
                            className={`cursor-pointer ${selectedIcon === 'calendar' ? 'text-blue-500 underline' : ''}`}
                        >
                            <CalendarMonthOutlinedIcon />
                            {/* Slider */}
                            {selectedIcon === 'calendar' && (
                                <Slider />
                            )}
                        </motion.div>

                    </div>

                    {selectedIcon === 'account' ? <Account /> : selectedIcon === 'calendar' ? <Calendar_Part /> : <></>}



                    {/* <div className='ml-5 lg:ml-7 mt-10 w-11/12 lg:w-8/12'>
                    <ResponsiveDateTimePickers />
                </div> */}

                </div>

            </motion.div>
        </>
    )
}


export default User_Profile_Comp