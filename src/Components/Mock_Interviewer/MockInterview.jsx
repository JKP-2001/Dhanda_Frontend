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
import UserList_Modal from '../../Utils/UserList_Modal';


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

    const items = dummy;

    return (
        <div>
            {items.map((item, index) => (
                <PostCard type="saved" key={index} name={item.name} bio={item.bio} text={item.text} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} follow={true} />
            ))}
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

    





    return (
        <>

            <motion.div className='select-none'
                
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

                    {followers?<UserList_Modal handleClose={closeFollowers} heading={"Followers"} />:following?<UserList_Modal handleClose={closeFollowing} heading={"Following"} />:null}

                </div>

            </motion.div>
        </>
    )
}

export default MockInterview;