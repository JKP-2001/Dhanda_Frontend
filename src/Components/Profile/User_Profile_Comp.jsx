import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";


import { motion } from "framer-motion"
import { useNavigate, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import ExperienceCard from '../Mock_Interviewer/Experience/ExperienceCard';
import { getAllPostOfUser, getBookmarkedPostUser } from '../../APIs/Post_API';
import showToast from '../../Utils/showToast';
import { setUserBookMarkedPosts, setUserPosts } from '../../Redux/user/userSlice';
import NothingFoundCard from '../../Utils/NothingFoundCard';


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
                className='font-inter font-semibold bg-white'
            />
        </div>
    )
}




const Posts = () => {

    const [items, setItems] = useState([]);
    
    const params = useParams();

    const userRedux = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getItemsOfUser = async () => {
        const token = localStorage.getItem("token");

        if(!token){
            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000
            })
            return;
        }

        

        const id = params.id;
        const role = params.role;

        const response = await getAllPostOfUser(1, 10, token, id, role);

        if(response.success){
            dispatch(setUserPosts(response.data.result));
            setItems(response.data.result);
        }

        else{
            showToast({
                msg: 'Something went wrong',
                type: 'error',
                duration: 3000
            })
        }
    }

    useEffect(() => {
        getItemsOfUser();
        setItems(userRedux.posts?userRedux.posts:[]);
    },[userRedux.data]);



    return (

        userRedux.posts && 
        userRedux.posts.length > 0 ? <div >
            {items.map((item, index) => (
                <PostCard isUpdated={item.isUpdated} type="feed" key={item.updatedAt?item.updatedAt:item.createdAt} postId={item._id} index={index} name={item.author.firstName + " " + item.author.lastName} bio={item.author.bio} text={item.content ? item.content : null} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} bookMarks={item.bookmarks} follow={true} createdAt={item.createdAt} updatedAt={item.updatedAt} />
            ))}
            {/* <PostCard type="feed" follow={true} /> */}
        </div>:
        <NothingFoundCard heading={"No Posts Found"} description={"Some new posts will be added and that will appear here 😁"}/>
            

    )
}


const BookMarked = () => {
    const [items, setItems] = useState([]);

    const userRedux = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const params = useParams();

    const getItemsOfUser = async () => {
        const token = localStorage.getItem("token");

        if(!token){
            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000
            })
            return;
        }

        const user_id = params.id;
        const role = params.role;

        const response = await getBookmarkedPostUser(1, 10, token, user_id, role);

        if(response.success){
            dispatch(setUserBookMarkedPosts(response.data.result));
            setItems(response.data.result);
        }

        else{
            showToast({
                msg: 'Something went wrong',
                type: 'error',
                duration: 3000
            })
        }
    }

    useEffect(() => {
        getItemsOfUser();
        setItems(userRedux.bookMarkedPosts?userRedux.bookMarkedPosts:[]);
    },[userRedux.data]);



    return (

        userRedux.bookMarkedPosts && 
        userRedux.bookMarkedPosts.length > 0 ? <div >
            {items.map((item, index) => (
                <PostCard isUpdated={item.isUpdated} type="feed" key={item.updatedAt?item.updatedAt:item.createdAt} postId={item._id} index={index} name={item.author.firstName + " " + item.author.lastName} bio={item.author.bio} text={item.content ? item.content : null} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} bookMarks={item.bookmarks} follow={true} createdAt={item.createdAt} updatedAt={item.updatedAt} />
            ))}
            {/* <PostCard type="feed" follow={true} /> */}
        </div>:
        <NothingFoundCard heading={"No Bookmarked Posts Found"} description={"Posts that will be bookmarked, will appear here 😁"}/>

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
                <div className='mx-3 sm:mx-4 flex'>
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

                {selectedIcon === 'account' ? <Account /> : selectedIcon === 'calendar' ? <Calendar_Part events={events} handleEventClick={handleEventClick} /> : selectedIcon === 'grid' ? <div className="flex justify-center w-[100%] lg:w-9/12"><Posts /></div> : selectedIcon === 'bookmark' ? <div className="flex justify-center w-[100%] lg:w-9/12"><BookMarked /></div> : <></>}



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