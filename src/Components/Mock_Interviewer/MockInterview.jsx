import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import EducationCard from './Education/EducationCard';
import ExperienceCard from './Experience/ExperienceCard';
import FeedbackCard from './FeedBacks/FeedbackCard';

import { motion } from "framer-motion"
import { useNavigate, useParams } from 'react-router-dom';

import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PostCard from '../New_Feeds/PostCard';
import UserList_Modal from '../../Utils/UserList_Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostOfUser } from '../../APIs/Post_API';
import { setUserPosts } from '../../Redux/user/userSlice';
import NothingFoundCard from '../../Utils/NothingFoundCard';
import showToast from '../../Utils/showToast';
import { getUserDataById } from '../../APIs/User_API';
import { getSearchUserSuccess } from '../../Redux/searchUser/searchUser';

import userimg from "../../Utils/Images/user2.jpg"  




const Account = (props) => {

    const handleClick = props.handleClick;

    const searchUserRedux = useSelector((state) => state.searchUser);

  

    return (
        searchUserRedux.data && <>
            <motion.div
                className='ml-3 lg:ml-7 mt-5'>

                <ExperienceCard exp={searchUserRedux}/>

            </motion.div>

            <motion.div initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                className='ml-3 lg:ml-7 mt-5'>

                <EducationCard edu={searchUserRedux}/>

            </motion.div>

            <div className='ml-3 lg:ml-7 mt-10'>
                <Button
                    color="black"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={handleClick}
                    className="w-40 h-10 font-inter"
                >
                    Book a Session
                </Button>
            </div>

            <motion.div initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                className='ml-3 lg:ml-7 mt-10'>
                <FeedbackCard />
            </motion.div>
        </>
    )
}

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


const Posts = () => {

    const [items, setItems] = useState([]);

    const params = useParams();

    const userRedux = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getItemsOfUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000
            })
            return;
        }



        const id = params.user_id;
        const role = params.role;

        const response = await getAllPostOfUser(1, 10, token, id, role);

        if (response.success) {
            dispatch(setUserPosts(response.data.result));
            setItems(response.data.result);
        }

        else {
            showToast({
                msg: 'Something went wrong',
                type: 'error',
                duration: 3000
            })
        }
    }

    useEffect(() => {
        getItemsOfUser();
        setItems(userRedux.posts ? userRedux.posts : []);
    }, [userRedux.data]);



    return (

        userRedux.posts &&
            userRedux.posts.length > 0 ? <div >
            {items.map((item, index) => (
                <PostCard isUpdated={item.isUpdated} type="feed" key={item.updatedAt ? item.updatedAt : item.createdAt} postId={item._id} index={index} name={item.author.firstName + " " + item.author.lastName} bio={item.author.bio} text={item.content ? item.content : null} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} bookMarks={item.bookmarks} follow={true} createdAt={item.createdAt} updatedAt={item.updatedAt} />
            ))}
            {/* <PostCard type="feed" follow={true} /> */}
        </div> :
            <NothingFoundCard heading={"No Posts Found"} description={"Some new posts will be added and that will appear here 😁"} />


    )
}


const MockInterview = () => {

    const variants = {
        hidden: { x: -100 },
        visible: { x: 0 }
    };


    const [icon, setIcon] = useState('account');

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/mock-interview/schedule/Manish');
    }

    const [followers, setFollowers] = useState(false);
    const [following, setFollowing] = useState(false);


    const clickFollowers = () => {
        setFollowers(true);
        document.body.style.overflow = 'hidden';
    }

    const clickFollowing = () => {
        setFollowing(true);
        document.body.style.overflow = 'hidden';
    }

    const closeFollowers = () => {
        setFollowers(false);
        document.body.style.overflow = 'auto';
    }

    const closeFollowing = () => {
        setFollowing(false);
        document.body.style.overflow = 'auto';
    }

    const params = useParams();
    const dispatch = useDispatch();

    const searchUserRedux = useSelector((state) => state.searchUser);

    const getTheUserData = async () => {

        const token = localStorage.getItem("token");

        const role = params.role;
        const id = params.user_id;

        const userData = await getUserDataById(role, id);

        if (userData.success === false) {

            showToast({
                msg: userData.msg,
                type: 'error',
                duration: 3000,
            });

        } else {
            dispatch(getSearchUserSuccess(userData.data));
        }
    }

    // fetch user data on loading page

    useEffect(() => {
        getTheUserData();
    }, []);








    return (
        searchUserRedux.data && <>

            <motion.div className='select-none'

            >
                <div className="select-none mt-3 ml-0 lg:mt-20 lg:ml-48 mb-10">
                    <div className='ml-3 sm:ml-4 flex'>
                        <img
                            className="h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full border-2 border-gray-500 object-cover object-center mt-3"
                            src={userimg}
                            alt="nature"
                        />

                        <div className='ml-4 lg:ml-10 mt-10 sm:mt-16 text-center'>
                            <div className="flex space-x-4 sm:space-x-16">
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={() => {
                                    setIcon("grid");
                                    window.scrollTo({ top: 600, behavior: "smooth" })
                                }}>
                                    <div className="number text-center">
                                        100
                                    </div>
                                    <div>
                                        Posts
                                    </div>
                                </div>
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={clickFollowers}>
                                    <div className="number text-center">
                                        1.5M
                                    </div>
                                    <div>
                                        Followers
                                    </div>
                                </div>
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={clickFollowing}>
                                    <div className="number text-center">
                                        200
                                    </div>
                                    <div>
                                        Following
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className='ml-5 lg:ml-7'>
                        <h1 className="font-roboto text-xl font-thin mt-4">{
                            searchUserRedux.data.firstName + (" ") + searchUserRedux.data.lastName
                        }</h1>
                        <h1 className="font-inter text-sm w-[96%] lg:w-8/12 text-gray-500">
                            {/* Software Engineer | Ex-PayPal | 110K+ LinkedIn Family | NIT Trichy'20 */}
                            {searchUserRedux.data.bio}
                        </h1>
                    </div>

                    <div className='ml-5 lg:ml-7 description font-inter w-11/12 lg:w-7/12  mt-10 text-sm'>
                        Filler text is text that shares some characteristics of a real written text, but is
                        random or otherwise generated. It may be used to display a sample of fonts,
                        generate text for testing, or to spoof an e-mail spam filter.

                        Filler text is text that shares some characteristics of a real written text, but is
                        random or otherwise generated. It may be used to display a sample of fonts,
                        generate text for testing, or to spoof an e-mail spam filter.
                    </div>

                    <div className='ml-3 lg:ml-7 mt-10'>
                        <Button
                            color="black"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            className="w-40 h-10 font-inter"
                            onClick={handleClick}
                        >
                            Book a Session
                        </Button>
                    </div>

                    <div className="flex space-x-14 md:space-x-20 ml-2 lg:ml-7 description font-inter w-[100%] lg:w-8/12 mt-10 text-sm justify-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIcon('account')}
                            className={`cursor-pointer ${icon === 'account' ? 'text-blue-500 underline' : ''}`}
                        >
                            <AccountBoxOutlinedIcon />
                            {/* Slider */}
                            {icon === 'account' && (
                                <Slider />
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIcon('grid')}
                            className={`cursor-pointer ${icon === 'grid' ? 'text-blue-500 underline' : ''}`}
                        >
                            <GridOnOutlinedIcon />
                            {/* Slider */}
                            {icon === 'grid' && (
                                <Slider />
                            )}
                        </motion.div>


                    </div>

                    {icon === 'account' ? <Account handleClick={handleClick} /> : icon === 'grid' ? <div className='flex justify-center w-[100%] lg:w-8/12'><Posts /></div> : null}

                    {followers ? <UserList_Modal handleClose={closeFollowers} heading={"Followers"} /> : following ? <UserList_Modal handleClose={closeFollowing} heading={"Following"} /> : null}

                </div>

            </motion.div>
        </>
    )
}

export default MockInterview;