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
import UserList_Modal from '../../Utils/UserList_Modal';
import { useSelector } from 'react-redux';
import ExperienceCard from '../Mock_Interviewer/Experience/ExperienceCard';


const localizer = momentLocalizer(moment);



const dummy = [
    {
        name: "Emma Wilson",
        bio: "Product Manager | Innovator | Solving Problems with Technology",
        text: "Passionate about building products that make a difference in people's lives. Let's create something amazing together! 🚀",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 55,
        comments: 15,
        reposts: 28
    },
    {
        name: "James Rodriguez",
        bio: "Data Scientist | Analytics Enthusiast | Coffee Drinker",
        text: "Transforming data into insights. Fuelled by coffee and a curiosity to explore the hidden patterns in the numbers. ☕📊",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 42,
        comments: 20,
        reposts: 22
    },
    {
        name: "Sophia Miller",
        bio: "Travel Blogger | Adventure Seeker | Exploring the World",
        text: "Embarking on new adventures and sharing the beauty of different cultures. Join me on this journey of discovery! 🌍✈️",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 60,
        comments: 18,
        reposts: 30
    },
    {
        name: "Ryan Turner",
        bio: "Fitness Trainer | Health Enthusiast | Inspiring Healthy Lifestyles",
        text: "Dedicated to helping others achieve their fitness goals and lead a healthy, active life. Let's sweat it out together! 💪🏋️‍♂️",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 48,
        comments: 12,
        reposts: 25
    },
    {
        name: "Olivia Clark",
        bio: "Freelance Artist | Creative Mind | Expressing Emotions through Art",
        text: "Brush strokes of emotions on the canvas. Art is not what you see but what you make others see. 🎨✨",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 55,
        comments: 14,
        reposts: 27
    },
    {
        name: "Ethan Walker",
        bio: "Entrepreneur | Startup Enthusiast | Building the Future",
        text: "Turning dreams into reality, one startup at a time. Embracing the challenges and learning from every step of the journey. 💼🚀",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 50,
        comments: 16,
        reposts: 23
    },
    {
        name: "Ava Garcia",
        bio: "Foodie | Culinary Explorer | Tasting the World's Flavors",
        text: "From street food to fine dining, on a mission to explore and savor the diverse and delicious tastes of the world. 🍜🌮",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 58,
        comments: 19,
        reposts: 26
    },
    {
        name: "Logan Hill",
        bio: "Science Enthusiast | Exploring the Wonders of the Universe",
        text: "From microorganisms to galaxies, constantly fascinated by the mysteries of the cosmos. Join me on this cosmic journey! 🔭🌌",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 53,
        comments: 17,
        reposts: 29
    },
    {
        name: "Chloe Baker",
        bio: "Environmental Activist | Nature Lover | Protecting Our Planet",
        text: "On a mission to raise awareness and take action for a greener and more sustainable future. Every small effort counts! 🌿🌎",
        images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

        likes: 47,
        comments: 13,
        reposts: 24
    },
];


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


const Account = (props) => {

    const userRedux = useSelector((state) => state.user);

    if (!userRedux.data) {
        return null;
    }



    return (
        <motion.div

            className='mt-5 ml-3 md:ml-5 space-y-8'
        >

            {userRedux.data && userRedux.data.experience.length>0?<div>
                <ExperienceCard exp={userRedux} />
            </div>:null}
            
            <div>
                <EducationCard edu={userRedux} />
            </div>



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
                className='font-inter font-semibold'
            />
        </div>
    )
}




const Posts = () => {

    const items = dummy;

    return (

        <div >
            {items.map((item, index) => (
                <PostCard type="saved" key={index} name={item.name} bio={item.bio} text={item.text} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} follow={true} />
            ))}
            {/* <PostCard type="feed" follow={true} /> */}
        </div>

    )
}


const BookMarked = () => {
    const items = dummy;

    return (

        <div >
            {items.map((item, index) => (
                <PostCard type="book" key={index} name={item.name} bio={item.bio} text={item.text} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} follow={true} />
            ))}
            {/* <PostCard type="feed" follow={true} /> */}
        </div>

    )
}



const User_Profile_Comp = () => {


    const navigate = useNavigate();

    const [checkFollowers, setCheckFollowers] = useState(false);
    const [checkFollowing, setCheckFollowing] = useState(false);


    const openCheckFollowers = () => {
        setCheckFollowers(true);
        document.body.style.overflow = 'hidden';
    }

    const closeCheckFollowers = () => {
        setCheckFollowers(false);
        document.body.style.overflow = 'auto';
    }

    const openCheckFollowings = () => {
        setCheckFollowing(true);
        document.body.style.overflow = 'hidden';
    }

    const closeCheckFollowings = () => {
        setCheckFollowing(false);
        document.body.style.overflow = 'auto';
    }


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

    const userRedux = useSelector((state) => state.user);



    return (
        userRedux.data ? <>


            <div className="mt-2 ml-0 lg:mt-12 lg:ml-48 mb-10">
                <div className='ml-3 sm:ml-4 flex'>
                    <img
                        className="h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full border-2 border-gray-500 object-cover object-center mt-3"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="nature"
                    />

                    <div className='ml-4 lg:ml-10 mt-10 sm:mt-16 text-center'>
                        <div className="flex space-x-4 sm:space-x-16">
                            <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={() => {
                                setSelectedIcon("grid");
                                window.scrollTo({ top: 600, behavior: "smooth" })
                            }}>
                                <div className="number text-center">
                                    0
                                </div>
                                <div>
                                    Posts
                                </div>
                            </div>
                            <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={openCheckFollowers}>
                                <div className="number text-center">
                                    0
                                </div>
                                <div>
                                    Followers
                                </div>
                            </div>
                            <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={openCheckFollowings}>
                                <div className="number text-center">
                                    0
                                </div>
                                <div>
                                    Following
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



                <div className='ml-5 lg:ml-7'>
                    <h1 className="font-roboto text-xl font-thin mt-4">{userRedux.data.firstName + " " + userRedux.data.lastName + " ( @" + userRedux.data.username + " )"}</h1>
                    <h1 className="font-inter text-sm w-11/12 lg:w-8/12 text-gray-500">{userRedux.data.bio}</h1>
                </div>

                <div className='ml-5 lg:ml-7 description font-inter w-11/12 lg:w-8/12  mt-10 text-sm break-words'>
                    {userRedux.data.decription}
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

                {selectedIcon === 'account' ? <Account /> : selectedIcon === 'calendar' ? <Calendar_Part events={events} handleEventClick={handleEventClick} /> : selectedIcon === 'grid' ? <div className="flex justify-center w-[96%] lg:w-9/12"><Posts /></div> : selectedIcon === 'bookmark' ? <div className="flex justify-center w-[96%] lg:w-9/12"><BookMarked /></div> : <></>}



            </div>

            {checkFollowers ? <UserList_Modal handleClose={closeCheckFollowers} heading={"Followers"} /> : checkFollowing ? <UserList_Modal handleClose={closeCheckFollowings} heading={"Following"} /> : null}

            {selectedEvent && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">
                        <h2 className="text-2xl font-inter font-bold mb-4">Interview Details</h2>

                        <p className='font-inter font-semibold text-gray-700'>Title: {selectedEvent.title}</p>
                        <p className='font-inter font-semibold text-gray-700'>Starts At: {moment(selectedEvent.start).format('DD-MM-YYYY HH:mm')}</p>
                        <p className='font-inter font-semibold text-gray-700'>Ends At: {moment(selectedEvent.end).format('DD-MM-YYYY HH:mm')}</p>

                        <p className='font-inter mb-4 font-semibold text-gray-700'>Interview Link: <a className='underline underline-offset-1 text-blue-800' href={"www.google.com"} target="_blank" rel="noopener noreferrer">Meet Link</a></p>

                        <div className="flex justify-end">
                            <button onClick={handleClosePopup} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out font-inter font-semibold">
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}


        </> : null
    )
}


export default User_Profile_Comp