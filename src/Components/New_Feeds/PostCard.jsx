import React, { useEffect, useState } from 'react'
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
import Small_Profile_Card from './Small_Profile_Card';

import { IoMdClose } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiUserFollowFill } from "react-icons/ri";
import UserList_Modal from '../../Utils/UserList_Modal';


import { RiImageAddLine } from 'react-icons/ri';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

import { IoSettingsOutline } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";

import { IoBookmark } from "react-icons/io5";



import parse from 'html-react-parser';

const PostCard = (props) => {
    const navigate = useNavigate();

    const [follow, setFollow] = useState(props.follow);

    const images = props.images;

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const goToPreviousImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const [isLike, setIsLike] = useState(false);
    const [isRepost, setIsRepost] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);

    const [shareOpen, setShareOpen] = useState(false);


    const [numLikes, setNumLikes] = useState(props.likes);

    const [numComments, setNumComments] = useState(props.comments);

    const [numReposts, setNumReposts] = useState(props.reposts);

    const handleLike = () => {
        if(isLike){
            setNumLikes(numLikes - 1);
            setIsLike(false);
        }
        else{

            setNumLikes(numLikes + 1);
            setIsLike(true);
        }
    };

    const handleRepost = () => {
        if(isRepost){
            setNumReposts(numReposts - 1);
            setIsRepost(false);
        }
        else{
            setNumReposts(numReposts + 1);
            setIsRepost(true);
        }
    };

    const handleBookmark = () => {
        if(isBookmark){
            setIsBookmark(false);
        }
        else{
            setIsBookmark(true);
        }
    };

    const openShare = () => {
        setShareOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeShare = () => {
        setShareOpen(false);
        document.body.style.overflow = 'auto';
    };




    const [like, setLike] = useState(false);

    const [repost, setRepost] = useState(false);

    const [text, setText] = useState(props.text?parse(props.text):null);



    const [seeMore, seeMoreClicked] = useState(false);

    const [openSettings, setOpenSettings] = useState(false);

    const handleLikeClick = (event) => {
        setLike(true)
        document.body.style.overflow = 'hidden';
    };

    const handleCloseLike = () => {
        setLike(false);

        document.body.style.overflow = 'auto';
    };

    const handleClickRepost = () => {
        setRepost(true)
        document.body.style.overflow = 'hidden';
    };

    const handleCloseRepost = () => {
        setRepost(false);

        document.body.style.overflow = 'auto';
    };

    const openImageModal = (index) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const handleOpenSettings = () => {
        setOpenSettings(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
        document.body.style.overflow = 'auto';
    };

   



    const type = props.type;

    const bio = props.bio;


    function extractPlainText(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }


    const newBio = bio.length > 50 ? bio.substring(0, 50) + "..." : bio;

    const rawText = extractPlainText(props.text)

    return (
        <div className={`my-5 select-none ${type === "feed" ? "items-center flex justify-center" : ""}`}>


            <div className={`mx-2 w-full ${type === "feed" ? "max-w-xl" : "max-w-3xl"} bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
                <div className='flex my-2 justify-between'>
                    <div className="flex">
                        <div className='ml-3'>
                            <img
                                className="hover:underline hover:cursor-pointer mt-2 sm:mt-0 w-[60px] sm:h-[40px] sm:w-[40px] border-2 border-gray-500 rounded-full object-cover object-center"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="nature"
                                onClick={() => navigate("/user/profile/:user")}
                            />
                        </div>
                        <div className='ml-3 mt-1 space-y-0.1 hover:cursor-pointer hover:text-blue-800 hover:underline' onClick={() => navigate("/user/profile/:user")}>
                            <h1 className='font-inter font-semibold'>{props.name}</h1>
                            <h1 className='font-inter text-xs hover:text-light-blue-800 text-gray-500 w-3/4 md:w-full'>{newBio}</h1>
                        </div>
                    </div>
                    <div className=' mr-3 mt-4 sm:mt-3 space-x-4 '>

                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 justify-center rounded-xl font-inter text-xs " onClick={() => setFollow(!follow)}>
                            {!follow ? <IoPersonAddSharp fontSize={17} className="font-bold text-white hover:cursor-pointer block  sm:mr-1" /> : <RiUserFollowFill fontSize={17} className="text-white hover:cursor-pointer block  sm:mr-1" />}
                        </button> */}

                        <IoSettingsOutline onClick={handleOpenSettings} fontSize={20} className='hover:cursor-pointer hover:text-blue-600'/>
                    </div>
                </div>

                <hr className='border-[0.5px] border-gray-200' />

                {text?<div className="text mx-2 text-left break-words my-3 text-sm font-inter transition-height duration-300 ease-in-out overflow-hidden">
                    <div className="1">
                        {!seeMore ? (rawText.length > 200 ? rawText.substring(0, 200) + "......." : text) : text}
                        <p
                            className="text-blue-600 hover:underline hover:cursor-pointer transition-opacity duration-300 ease-in-out"
                            onClick={() => seeMoreClicked(!seeMore)}
                        >
                            {rawText.length > 200 ? seeMore ? "See Less" : "See More" : ""}
                        </p>
                    </div>
                    <div className="2"></div>
                </div>:null}

                {images.length > 0 ? <Carousel_Comp images={props.images} openImageModal={openImageModal} /> : null}

                <hr className='border-[0.5px] border-gray-200' />


                <div className="flex mx-2 sm:mx-4 justify-between mt-2">

                    <div className="likes flex space-x-1">
                        <AiOutlineLike fontSize={15} className=" text-gray-600 hover:cursor-pointer" />
                        <p className="hover:cursor-pointer hover:underline hover:text-blue-500 text-xs text-gray-600 font-inter font-semibold select-none" onClick={handleLikeClick}>{numLikes} Likes</p>
                    </div>

                    <div className="flex space-x-1">
                        <div className="flex space-x-1">
                            <IoChatbubbleOutline fontSize={15} className="hidden sm:block text-gray-600 hover:cursor-pointer" />
                            <p className="text-xs text-gray-600 font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-500 select-none">{numComments} Comments</p>
                        </div>
                        <p className='-mt-[5px]'>•</p>
                        <div className="flex">
                            <IoRepeat fontSize={15} className="hidden sm:block text-gray-600 hover:cursor-pointer" />
                            <p className="hover:cursor-pointer hover:underline hover:text-blue-500 text-xs text-gray-600 font-inter font-semibold select-none" onClick={handleClickRepost}>{numReposts} Reposts</p>
                        </div>
                    </div>
                </div>
                <hr className='border-[1px] border-gray-200 mt-1' />
                <div class="pl-4 pr-4 pt-4 pb-2">

                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            {!isLike?<AiOutlineLike fontSize={25} className="text-gray-600 hover:cursor-pointer hover:text-blue-500" onClick={handleLike}/>:<AiFillLike fontSize={25} className="text-blue-500 hover:cursor-pointer hover:text-blue-500" onClick={handleLike} />}
                            <IoChatbubbleOutline fontSize={25} className="text-gray-600 hover:cursor-pointer hover:text-blue-500" />
                            <BsSend fontSize={24} className="text-gray-600 mt-[2px] hover:cursor-pointer hover:text-blue-500" onClick={openShare}/>
                            {/* <IoRepeat fontSize={29} className={`${!isRepost?"text-gray-600":"text-blue-600"} hover:cursor-pointer`} onClick={handleRepost}/> */}
                        </div>
                        <div>
                            {!isBookmark?<IoBookmarkOutline fontSize={25} className={`text-gray-600 hover:cursor-pointer hover:text-blue-500`} onClick={handleBookmark}/>:<IoBookmark fontSize={25} className={`text-blue-500 hover:cursor-pointer hover:text-blue-500`} onClick={handleBookmark}/>}
                        </div>
                    </div>



                </div>
                <div className='text-xs ml-4 mb-2 font-inter font-semibold text-gray-500'>
                    4 Hours Ago
                </div>
            </div>

            {selectedImageIndex !== null && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 flex justify-center items-center'>
                    <div className='mx-2 max-w-[650px] max-h-[650px] bg-white border border-gray-200 rounded-lg shadow overflow-hidden relative'>
                        <img
                            src={images[selectedImageIndex]}
                            alt={`Image ${selectedImageIndex + 1}`}
                            className='max-w-full max-h-full object-cover '
                        />
                        <GrFormPrevious
                            fontSize={30}
                            className='absolute top-1/2 left-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                            onClick={goToPreviousImage}
                        />
                        <MdNavigateNext
                            fontSize={30}
                            className='absolute top-1/2 right-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                            onClick={goToNextImage}
                        />
                        <IoMdClose
                            fontSize={30}
                            className='absolute top-2 right-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer hover:text-red-500'
                            onClick={closeImageModal}
                        />
                    </div>
                </div>
            )}

            {like ? <UserList_Modal handleClose={handleCloseLike} heading={"Liked By"} /> : repost ? <UserList_Modal handleClose={handleCloseRepost} heading={"Shared By"} /> : null}

            {openSettings?
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 flex justify-center items-center'>
                <div className='mx-2 w-3/4 sm:w-1/4  bg-white border border-gray-200 rounded-lg shadow overflow-hidden relative'>
                    <div className='flex justify-between p-2'>
                        <h1 className='font-inter font-semibold text-lg'>Settings</h1>
                        <IoMdClose
                            fontSize={20}
                            className='hover:cursor-pointer hover:text-red-500'
                            onClick={handleCloseSettings}
                        />
                    </div>
                    <hr className='border-[1px] border-gray-200' />
                    <div className='flex flex-col py-2'>
                        <div className="report my-1 hover:cursor-pointer">
                            <h1 className='font-inter font-semibold text-sm text-center text-red-500'>Report</h1>
                            <hr className='border-[1px] border-gray-200 mt-2' />
                        </div>
                        <div className="unfollow my-1 hover:cursor-pointer">
                            <h1 className='font-inter font-semibold text-sm text-center text-red-500'>Unfollow</h1>
                            <hr className='border-[1px] border-gray-200 mt-2' />
                        </div>
                        <div className="shareTo my-1 hover:cursor-pointer">
                            <h1 className='font-inter font-semibold text-sm text-center'>Share To....</h1>
                            <hr className='border-[1px] border-gray-200 mt-2' />
                        </div>
                        <div className="bookmark my-1 hover:cursor-pointer">
                            <h1 className='font-inter font-semibold text-sm text-center'>Bookmark</h1>
                            <hr className='border-[1px] border-gray-200 mt-2' />
                        </div>
                        <div className="gototpost my-1 hover:cursor-pointer">
                            <h1 className='font-inter font-semibold text-sm text-center'>Go To Post</h1>
                            <hr className='border-[1px] border-gray-200 mt-2' />
                        </div>
                        <div className="copylink my-1 hover:cursor-pointer">
                            <h1 className='font-inter font-semibold text-sm text-center'>Copy Link</h1>

                        </div>
                    </div>
                </div>
            </div>
            :shareOpen?<UserList_Modal handleClose={closeShare} heading={"Share To"} />:null}

        </div>
    )
}

export default PostCard