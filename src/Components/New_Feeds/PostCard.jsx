import React from 'react'
import { useNavigate } from 'react-router-dom'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { AiOutlineLike } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";

import { IoBookmarkOutline } from "react-icons/io5";
import { IoRepeat } from "react-icons/io5";

import Carousel_Comp from './Carousle_Comp';

const PostCard = (props) => {
    const navigate = useNavigate();

    const type = props.type;

    const bio = "Software Engineer | Ex-PayPal | 110K+ LinkedIn Family | NIT Trichy'20";

    const newBio = bio.length > 50 ? bio.substring(0, 50) + "..." : bio;

    return (
        <div className={`my-5 select-none ${type==="feed"?"items-center flex justify-center":""}`}>


            <div class="mx-2 w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className='flex my-2'>
                    <div className='ml-3'>
                        <img
                            className="hover:underline hover:cursor-pointer  h-[40px] w-[40px] border-2 border-gray-500 rounded-full object-cover object-center"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="nature"
                            onClick={() => navigate("/user/profile/:user")}
                        />
                    </div>
                    <div className='ml-3 mt-1 -space-y-1 hover:cursor-pointer hover:underline' onClick={() => navigate("/user/profile/:user")}>
                        <h1 className='font-inter font-semibold'>Abhishek</h1>
                        <h1 className='font-inter text-xs text-gray-500'>{newBio}</h1>
                    </div>
                </div>
                
                <Carousel_Comp />

                

                <div className="flex mx-2 sm:mx-4 justify-between mt-2">

                    <div className="likes flex space-x-1">
                        <AiOutlineLike fontSize={15} className=" text-gray-600 hover:cursor-pointer" />
                        <p className="hover:cursor-pointer hover:underline hover:text-blue-500 text-xs text-gray-600 font-inter font-semibold select-none">1.5K Likes</p>
                    </div>

                    <div className="flex space-x-1">
                        <div className="flex space-x-1">
                            <IoChatbubbleOutline fontSize={15} className="hidden sm:block text-gray-600 hover:cursor-pointer" />
                            <p className="text-xs text-gray-600 font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-500 select-none">9 Comments</p>
                        </div>
                        <p className='-mt-[5px]'>•</p>
                        <div className="flex">
                            <IoRepeat fontSize={15} className="hidden sm:block text-gray-600 hover:cursor-pointer" />
                            <p className="hover:cursor-pointer hover:underline hover:text-blue-500 text-xs text-gray-600 font-inter font-semibold select-none">29 Reposts</p>
                        </div>
                    </div>
                </div>
                <hr className='border-[1px] border-gray-200 mt-1' />
                <div class="p-4">

                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <AiOutlineLike fontSize={25} className="text-gray-600 hover:cursor-pointer hover:text-blue-500" />
                            <IoChatbubbleOutline fontSize={25} className="text-gray-600 hover:cursor-pointer hover:text-blue-500" />
                            <BsSend fontSize={24} className="text-gray-600 mt-[2px] hover:cursor-pointer hover:text-blue-500" />
                            <IoRepeat fontSize={29} className="text-gray-600 hover:cursor-pointer hover:text-blue-500" />
                        </div>
                        <div>
                            <IoBookmarkOutline fontSize={25} className="text-gray-600 hover:cursor-pointer hover:text-blue-500" />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PostCard