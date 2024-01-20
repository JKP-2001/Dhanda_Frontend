import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";
import EducationCard from './Education/EducationCard';
import ExperienceCard from './Experience/ExperienceCard';
import FeedbackCard from './FeedBacks/FeedbackCard';

import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';

import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PostCard from '../New_Feeds/PostCard';

const Account = (props) => {

    const handleClick = props.handleClick;

    return (
        <>
            <motion.div
                className='ml-3 lg:ml-7 mt-5'>

                <ExperienceCard />

            </motion.div>

            <motion.div initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                className='ml-3 lg:ml-7 mt-5'>

                <EducationCard />

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
    return (

        <div>
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
            <PostCard type="saved" />
        </div>


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





    return (
        <>

            <motion.div className='select-none'
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="select-none mt-3 ml-0 lg:mt-20 lg:ml-48 mb-10">
                    <div className='ml-3 sm:ml-4 flex'>
                        <img
                            className="h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full border-2 border-gray-500 object-cover object-center mt-3"
                            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            alt="nature"
                        />

                        <div className='ml-4 lg:ml-10 mt-10 sm:mt-16 text-center'>
                            <div className="flex space-x-4 sm:space-x-16">
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold">
                                    <div className="number text-center">
                                        0
                                    </div>
                                    <div>
                                        Posts
                                    </div>
                                </div>
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold">
                                    <div className="number text-center">
                                        0
                                    </div>
                                    <div>
                                        Followers
                                    </div>
                                </div>
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold">
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
                        <h1 className="font-roboto text-xl font-thin mt-4">Manish Mishra</h1>
                        <h1 className="font-inter text-sm w-[96%] lg:w-8/12 text-gray-500">Software Engineer | Ex-PayPal | 110K+ LinkedIn Family | NIT Trichy'20</h1>
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

                    <div className="flex space-x-14 md:space-x-20 ml-2 lg:ml-7 description font-inter w-11/12 lg:w-8/12 mt-10 text-sm justify-center">
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

                    {icon === 'account' ? <Account handleClick={handleClick} /> : icon === 'grid' ? <div className='flex justify-center w-[96%] lg:w-8/12'><Posts /></div> : null}

                </div>

            </motion.div>
        </>
    )
}

export default MockInterview;