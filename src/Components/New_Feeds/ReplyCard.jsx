import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTimeDifference } from '../../Utils/functions';

import parse from 'html-react-parser';

const ReplyCard = (props) => {

    const { commentId, id, content, author, createdAt } = props;

    const text = props.content ? parse(props.content) : "";

    function extractPlainText(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const rawText = extractPlainText(props.content);

    const [seeMore, seeMoreClicked] = useState(false);

    const navigate = useNavigate();

    const postTime = getTimeDifference(createdAt);

    return (
        <div className='flex justify-end my-1'> {/* Updated class here */}
            <div className=' '>
                <div className='flex  mx-2 space-x-1 justify-end'>
                    <div className='mt-2'>
                        <img
                            className="hover:underline hover:cursor-pointer mt-2 sm:mt-0 h-[25px] w-[27px] border-2 border-gray-500 rounded-full object-cover object-center"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="nature"
                            onClick={() => navigate(`/user/profile/${author.role}/${author._id}`)}
                        />
                    </div>
                    <div className='p-3 bg-[#f0f2f5] w-full rounded-3xl'>
                        <p className="text-sm font-bold font-inter mb-1">{author.firstName + " " + author.lastName}</p>
                        {!seeMore ? (rawText.length > 200 ? rawText.substring(0, 200) + "......." : text) : text}
                        <p
                            className="text-blue-600 mt-3 hover:underline hover:cursor-pointer transition-opacity duration-300 ease-in-out"
                            onClick={() => seeMoreClicked(!seeMore)}
                        >
                            {rawText.length > 200 ? seeMore ? "See Less" : "See More" : ""}
                        </p>
                    </div>
                </div>
                <div className='flex justify-end mx-6 mb-2 space-x-4'>
                    <div className='text-xs font-bold hover:cursor-pointer font-inter mt-1'>Reply</div>
                    <div className='text-xs text-gray-500 font-bold font-inter mt-1'>{postTime}</div>
                </div>


            </div>
        </div>
    );
};

export default ReplyCard;
