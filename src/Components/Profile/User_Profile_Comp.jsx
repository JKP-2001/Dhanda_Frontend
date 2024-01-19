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
import PostCard from '../New_Feeds/PostCard';


const localizer = momentLocalizer(moment);


const variants = {
    hidden: { x: -100 },
    visible: { x: 0 }
};


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
        <motion.div

            className='mt-3 ml-3 md:ml-5'
        >

            <EducationCard />

        </motion.div>
    )
}


const Calendar_Part = (props) => {



    const events = props.events;
    const handleEventClick = props.handleEventClick;

    return (



        <div className="w-[96%] lg:w-8/12 ml-2 lg:ml-7 mt-10">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: `550px` }}
                onSelectEvent={handleEventClick}
                selectable
            />
        </div>
    )
}




const Posts = () => {
    return (

        <div >

            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
        </div>

    )
}


const BookMarked = () => {
    return (
        <div >

            <PostCard type="book" />
            <PostCard type="book" />
           

        </div>
    )
}



const User_Profile_Comp = () => {


    const navigate = useNavigate();

    const events = [
        {
            title: 'Mock Interview with User1',
            start: new Date(2024, 0, 14, 10, 0), // Example date and time
            end: new Date(2024, 0, 14, 11, 0), // Example date and time
        },
        // Add more events as needed
    ];

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        document.body.style.overflow = 'hidden';
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);

        document.body.style.overflow = 'auto';
    };



    const [selectedIcon, setSelectedIcon] = useState(localStorage.getItem("user-profile") ? localStorage.getItem("user-profile") : "account");

    const handleIconClick = (icon) => {
        // Toggle the state to show/hide underline
        setSelectedIcon(icon);
        localStorage.setItem("user-profile", icon)
    };

    useEffect(() => {
        scrollToTop();
    }, []);


    return (
        <>


            <div className="mt-8 ml-0 lg:mt-16 lg:ml-48 mb-10">
                <div className='ml-3'>
                    <img
                        className="h-[170px] w-[170px] border-2 border-gray-500 rounded-full object-cover object-center"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="nature"
                    />
                </div>



                <div className='ml-5 lg:ml-7'>
                    <h1 className="font-roboto text-xl font-thin mt-4">Manish Mishra</h1>
                    <h1 className="font-inter text-sm w-11/12 lg:w-8/12 text-gray-500">Software Engineer | Ex-PayPal | 110K+ LinkedIn Family | NIT Trichy'20</h1>
                </div>

                <div className='ml-5 lg:ml-7 description font-inter w-11/12 lg:w-8/12  mt-10 text-sm break-words'>
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
                
                    {selectedIcon === 'account' ? <Account /> : selectedIcon === 'calendar' ? <Calendar_Part events={events} handleEventClick={handleEventClick} /> : selectedIcon === 'grid' ? <div className="flex justify-center w-11/12 lg:w-9/12"><Posts /></div> : selectedIcon === 'bookmark' ? <div className="flex justify-center w-11/12 lg:w-9/12"><BookMarked /></div> : <></>}
               


            </div>

            {selectedEvent && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-4 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full">
                        <h2 className="text-lg font-roboto mb-4">Interview Details</h2>
                        <p className='font-roboto'>Title: {selectedEvent.title}</p>
                        <p className='font-roboto'>Start Time: {moment(selectedEvent.start).format('DD-MM-YYYY HH:mm')}</p>
                        <p className='font-roboto'>End Time: {moment(selectedEvent.end).format('DD-MM-YYYY HH:mm')}</p>

                        <p className='font-roboto'>Interview Link: <a className='underline underline-offset-1 text-blue-800' href={"www.google.com"} target="_blank" rel="noopener noreferrer">Meet Link</a></p>

                        <button onClick={handleClosePopup} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out">
                            Close
                        </button>
                    </div>
                </div>
            )}


        </>
    )
}


export default User_Profile_Comp