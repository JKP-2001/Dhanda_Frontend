import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReplyCard from './ReplyCard';
import { getTimeDifference } from '../../Utils/functions';
import { getRepliesOfAPost, postAReply } from '../../APIs/Post_API';
import showToast from '../../Utils/showToast';

import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const CommentCard = (props) => {

    const navigate = useNavigate();
    const {handleComment, setReplyName} = props;

    const {author, createdAt} = props;

    const repliesLength = props.repliesLength;

    const timeOfComment = getTimeDifference(createdAt);

    

    

    const [seeMore, seeMoreClicked] = useState(false);

    const text = props.content?parse(props.content):"";

    const {setText, setOpenComment, setOpenCommentBox, replies, setReplies, } = props;

    const [openShow, setOpenShow] = useState(false);

    function extractPlainText(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const rawText = extractPlainText(props.content);

    const handleClickOnViewReply = async () => {

        if(openShow) {
            setOpenShow(false);
            return;
        }

        
        if(replies.length>0){
            setOpenShow(true);
            return;
        }


        const Replies = await getRepliesOfAPost(props.index, 1, 10);
        if(Replies.success) {
            setReplies(Replies.data.result);
            setOpenShow(true);
        }
        else{
            showToast({
                msg: Replies.msg,
                type: "error",
                duration: 3000
            });
        }
    }

    


    return (
        <div className='my-3'>
            <div className='flex  mx-2 space-x-1'>
                <div className='mt-2'>
                    <img
                        className="hover:underline hover:cursor-pointer mt-2 sm:mt-0 h-[25px] w-[27px] border-2 border-gray-500 rounded-full object-cover object-center"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="nature"
                        onClick={() => {navigate(`/user/profile/${author.role}/${author._id}`);
                        document.body.style.overflow = 'auto';
                    }}
                    />
                </div>
                <div className='p-3 bg-[#f0f2f5] w-full rounded-3xl'>
                    <p className="text-sm font-bold font-inter mb-1">{author.firstName +" "+ author.lastName}</p>
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
                <div className='text-xs font-bold hover:cursor-pointer font-inter mt-1' onClick={()=>{handleComment(props.index)
                    setReplyName(author.firstName+" "+author.lastName)
                }}>Reply</div>
                {repliesLength>0?<div className='text-xs font-bold hover:cursor-pointer font-inter mt-1' onClick={handleClickOnViewReply}>{!openShow?"View Replies":"Hide Replies"}</div>:null}
                <div className='text-xs text-gray-500 font-bold font-inter mt-1'>{timeOfComment}</div>
            </div>

            {openShow &&<div className='flex justify-end'>
                <div className='space-y-2'>
                    {replies.map((reply)=>{
                        return(<ReplyCard key={reply._id} id={reply._id} content={reply.content} commentId={reply.comment_id} author={reply.author_id} createdAt={reply.creationDateAndTime}/>)
                    })}
                </div>
            </div>}

            <hr className='border-[1px] border-gray-300' />
        </div>
    )
}

export default CommentCard