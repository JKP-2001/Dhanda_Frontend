import React, { useState } from 'react';
import Small_Profile_Card from '../Components/New_Feeds/Small_Profile_Card';
import { IoMdClose } from 'react-icons/io';

const PostCommentsCard = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleClose = props.handleClose;
    const heading = props.heading;

    const comments = [];

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 px-2">

            <div className="block w-[96%] lg:w-[40%] max-w-xl pb-2 pt-0 z-20 bg-white border border-gray-200 rounded-lg shadow h-[550px] ">

                <div className='sticky top-0 bg-white z-10'>
                    <div className='flex justify-between'>
                        <h5 className="mb-2 text-2xl font-inter font-semibold tracking-tight text-gray-900 dark:text-white ml-2 pt-2">{heading}</h5>
                        <IoMdClose fontSize={25} className='mt-3 mr-2 hover:cursor-pointer' onClick={handleClose} />
                    </div>
                    <hr className='border-[1px] border-gray-400' />
                </div>

                {comments.length > 0 ? <div></div> : 
                <div className='relative'>
                    <div className='w-full text-center font-custom text-xl  md:text-3xl absolute mt-56'>
                        No Comments Yet 😟
                    </div>
                </div>}

            </div>

        </div>
    );
};



export default PostCommentsCard