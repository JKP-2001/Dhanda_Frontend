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

    const [loading, setLoading] = useState(false);

    const [showMore, setShowMore] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    

    

    const [seeMore, seeMoreClicked] = useState(false);

    const text = props.content?parse(props.content):"";

    const {setText, setOpenComment, setOpenCommentBox } = props;

    const [replies, setReplies] = useState([]);

    const [openShow, setOpenShow] = useState(false);

    const [totalComments, setTotalComments] = useState(0);

    function extractPlainText(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const rawText = extractPlainText(props.content);

    const handleClickOnViewReply = async () => {

        

        
        if(replies.length>0){
            setOpenShow(true);
        }

        if(totalComments!=0 && totalComments === replies.length) {
            setOpenShow(!openShow);
            return;
        }
        
        setShowMore(true);

        setLoading(true);


        const Replies = await getRepliesOfAPost(props.index, page, limit);


        if(Replies.success) {
            setReplies([...replies,...Replies.data.result]);
            setTotalComments(Replies.data.totalResults);
            if(Replies.data.totalResults === replies.length+Replies.data.result.length) {
                setShowMore(false);
                setLoading(false);
                setOpenShow(true);
                return;
            }
            setOpenShow(true);
            setPage(page+1);
        }
        else{
            showToast({
                msg: Replies.msg,
                type: "error",
                duration: 3000
            });
        }
        setLoading(false);
    }

    


    return (
        <div className='my-3'>
            <div className='flex  mx-2 space-x-2'>
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
                <div className='pl-2 pt-2 pb-1 bg-[#f0f2f5] w-full rounded-3xl'>
                    <p className="pl-1 text-xs md:text-sm font-bold font-inter mb-1">{author.firstName +" "+ author.lastName}</p>
                    <p className='font-inter text-xs md:text-sm  pl-1 break-words'>{!seeMore ? (rawText.length > 200 ? rawText.substring(0, 200) + "......." : text) : text}</p>
                    <p
                            className="text-blue-600 mt-3 hover:underline hover:cursor-pointer transition-opacity duration-300 ease-in-out"
                            onClick={() => seeMoreClicked(!seeMore)}
                        >
                            <div className='font-inter pl-2 mb-1 text-xs md:text-sm'>{rawText.length > 200 ? seeMore ? "See Less" : "See More" : ""}</div>
                        </p>
                </div>
            </div>
            <div className='flex justify-end mx-6 mb-2 space-x-4'>
                <div className='text-xs font-bold hover:cursor-pointer font-inter mt-1' onClick={()=>{handleComment(props.index)
                    setReplyName(author.firstName+" "+author.lastName)
                }}>Reply</div>
                {repliesLength>0?<div className='text-xs font-bold hover:cursor-pointer font-inter mt-1' onClick={handleClickOnViewReply}>{loading?"Loading...":!openShow?"View Replies":"Hide Replies"}</div>:null}
                <div className='text-xs text-gray-500 font-bold font-inter mt-1'>{timeOfComment}</div>
            </div>

            {openShow &&<div className='flex justify-end'>
                <div className='space-y-2'>
                    {replies.map((reply)=>{
                        return(<ReplyCard key={reply._id} id={reply._id} content={reply.content} commentId={reply.comment_id} author={reply.author_id} createdAt={reply.creationDateAndTime} handleComment={handleComment} index={props.index} setReplyName={setReplyName}/>)
                    })}
                </div>
            </div>}

            {showMore?<div className='flex justify-end my-2'>
                <div className='text-xs text-gray-800 font-bold font-inter mx-3 cursor-pointer hover:underline' onClick={handleClickOnViewReply}>
                    {loading?"Loading...":"View More"}
                </div>
            </div>:null}

            <hr className='border-[1px] border-gray-300' />
        </div>
    )
}

export default CommentCard