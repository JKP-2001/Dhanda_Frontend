import React, { useEffect, useState } from 'react';
import Small_Profile_Card from '../Components/New_Feeds/Small_Profile_Card';
import { IoMdClose } from 'react-icons/io';
import CommentCard from '../Components/New_Feeds/CommentCard';
import Editor_Utils from './Editor_Utils';
import Editor from './Editor';
import { getCommentsOfAPost, postAComment, postAReply } from '../APIs/Post_API';
import { useDispatch, useSelector } from 'react-redux';
import { getPostRequest, getPostSuccess, setComments } from '../Redux/post/postSlice';
import showToast from './showToast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@material-tailwind/react';



const PostCommentsCard = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleClose = props.handleClose;
    const heading = props.heading;

    const { postComment, authorName } = props;

    const comments = [];
    const [replies, setReplies] = useState([]);

    const [page, setPage] = useState(2);
    const [limit, setLimit] = useState(10);

    const [text, setText] = useState('');
    const [openComment, setOpenComment] = useState(false);
    const [openCommentBox, setOpenCommentBox] = useState(true);

    const [comment_id, setComment_id] = useState('');
    const [replyName, setReplyName] = useState('');

    const [totalComments, setTotalComments] = useState(0);



    const handleComment = (comment_id) => {

        setOpenComment(true);
        setOpenCommentBox(false);

        if (comment_id) {
            setComment_id(comment_id);
        }

    }

    const postRedux = useSelector((state) => state.post);

    const fetchMoreComments = async () => {

        dispatch(getPostRequest());

        const comments = await getCommentsOfAPost(props.postId, page, limit);
        if (comments.success) {
            dispatch(setComments([...postRedux.currOpenPostComments, ...comments.data.result]));

            // setReplies([...comments.data.result, ...replies]);
            setPage(page + 1);
        }
        else {
            showToast({
                msg: comments.msg,
                type: "error",
                duration: 3000
            });
        }
    }

    const handlePostReply = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                msg: "Login Required",
                type: "error",
                duration: 3000
            });
            return;
        }

        else {
            const postReply = await postAReply(comment_id, text, token);

            if (postReply.success) {
                // const randomNumber = Math.floor(Math.random() * 1000000) + 1;



                // const temp = {
                //     _id: randomNumber.toString(),
                //     creationDateAndTime: Date.now(),
                //     author_id: {
                //         firstName: userRedux.data ? userRedux.data.firstName : "",
                //         lastName: userRedux.data ? userRedux.data.lastName : "",
                //         role: userRedux.data ? userRedux.data.role : "",
                //         _id: userRedux.data ? userRedux.data._id : "",
                //     },
                //     content: text,
                //     replies: [],
                // }

                // setReplies([temp, ...replies]);

                setText('');
                setOpenCommentBox(true);
                setOpenComment(false);

                showToast({
                    msg: postReply.msg,
                    type: "success",
                    duration: 3000
                })

                return;


            }
            else {
                showToast({
                    msg: postReply.msg,
                    type: "error",
                    duration: 3000
                });

                return;
            }
        }
    }




    const dispatch = useDispatch();


    const fetchAllComments = async () => {
        dispatch(getPostRequest());

        const allComments = await getCommentsOfAPost(props.postId, 1, 10);


        if (allComments.success) {
            dispatch(setComments(allComments.data.result));
            setTotalComments(allComments.data.totalResults);
        }
    }


    const userRedux = useSelector((state) => state.user);




    const handlePostComment = async () => {
        const token = localStorage.getItem("token");

        if (!token) {

            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000,
            });

            return;
        }

        else {

            const response = await postAComment(props.postId, text, token);

            if (response.success) {



                const randomNumber = Math.floor(Math.random() * 1000000) + 1;


                const temp = {
                    _id: randomNumber.toString(),
                    creationDateAndTime: Date.now(),
                    author_id: {
                        firstName: userRedux.data ? userRedux.data.firstName : "",
                        lastName: userRedux.data ? userRedux.data.lastName : "",
                        role: userRedux.data ? userRedux.data.role : "",
                        _id: userRedux.data ? userRedux.data._id : "",
                    },
                    content: text,
                    replies: [],
                }

                dispatch(setComments([temp, ...postRedux.currOpenPostComments]));
                props.setNumComments(props.numComments + 1);
                setText('');
                setOpenCommentBox(true);
                setOpenComment(false);

                showToast({
                    msg: 'Comment Added successfully',
                    type: 'success',
                    duration: 3000,
                });
            } else {

                showToast({
                    msg: response.msg,
                    type: 'error',
                    duration: 3000,
                });
            }
        }


    }


    useEffect(() => {
        dispatch(getPostRequest());
        fetchAllComments();
    }, []);


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">

            <div className="block w-[96%] lg:w-[40%] max-w-xl pb-2 pt-0 z-20 bg-white border border-gray-200 rounded-t-lg shadow h-[550px] 
            ">

                <div className='sticky top-0 bg-white z-10 rounded-lg'>
                    <div className='flex justify-between'>
                        <h5 className="mb-2 text-2xl font-inter font-semibold tracking-tight text-gray-900 dark:text-white ml-2 pt-2">{heading}</h5>
                        <IoMdClose fontSize={25} className='mt-3 mr-2 hover:cursor-pointer hover:text-red-600' onClick={handleClose} />
                    </div>
                    <hr className='border-[1px] border-gray-400' />
                </div>






                {postRedux.currOpenPostComments.length > 0 ? <div className=''>
                    <InfiniteScroll
                        dataLength={postRedux.currOpenPostComments.length} //This is important field to render the next data
                        next={fetchMoreComments}
                        hasMore={totalComments !== postRedux.currOpenPostComments.length}
                        height={props.loading ? 10 : 340}
                        className="pr-0 overflow-y-auto"
                    >

                        {postRedux.currOpenPostComments.map((comment, i) => {

                            return (
                                <CommentCard last={i === postRedux.currOpenPostComments.length - 1} key={comment._id} index={comment._id} createdAt={comment.creationDateAndTime} author={comment.author_id} content={comment.content} handleComment={handleComment} repliesLength={comment.replies.length} setReplyName={setReplyName} text={text} setText={setText} setOpenComment={setOpenComment} setOpenCommentBox={setOpenCommentBox} />
                            )
                        })}
                    </InfiniteScroll>
                </div>:null}
                {postRedux.loading ?
                    postRedux.currOpenPostComments.length === 0 ?
                    <div className='flex justify-center my-8'><div className='flex justify-center space-x-2'><Spinner /><div className='font-handwritten2 text-sm mt-1'>Loading Comments...</div></div></div> : 
                    <div className='flex justify-center space-x-2 -mt-4'>
                        <Spinner />
                        <div className='font-handwritten2 text-sm'>Loading More Comments...</div>
                    </div>  : null
                }
                {(postRedux.currOpenPostComments.length === 0 && !postRedux.loading) ? <div className='relative'>
                    <div className='w-full text-center font-custom text-xl  md:text-3xl absolute mt-56'>
                        No Comments Yet 😟
                    </div>
                </div> : null}



                {(openComment && !props.loading) ?
                    <div className='sticky  bg-white z-10 h-[110px] -px-[2px]'>
                        <hr className='border-[1.5px] border-gray-300' />
                        <div className=''>
                            {/* <Editor_Utils placeholder={"Write something here..."} /> */}
                            <Editor length={0} text={text} setText={setText} comment={true} placeholder={`Replying to ${replyName}'s Comment...`} />
                        </div>

                    </div> : null}

                {openCommentBox?

                    !props.loading?<div className='sticky  bg-white z-10 h-[110px] -px-[2px]'>
                        <hr className='border-[1.5px] border-gray-300' />
                        <div className=''>
                            {/* <Editor_Utils placeholder={"Write something here..."} /> */}
                            <Editor length={0} text={text} setText={setText} comment={true} placeholder={`Comment on ${authorName}'s Post...`} />
                        </div>

                    </div> : null : null}


                {(openCommentBox && !props.loading) ? <div className='flex justify-end pt-5 md:py-2 mr-2'>
                    <button className='bg-blue-500 text-white  font-bold font-inter px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-blue-600 text-xs' onClick={handlePostComment}>Comment</button>
                </div> : null}

                {(openComment && !props.loading) ? <div className='flex justify-end pt-5 md:py-2 mr-2'>
                    <button className='bg-blue-500 text-white  font-bold font-inter px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-blue-600 text-xs' onClick={handlePostReply}>Post Reply</button>
                </div> : null}

            </div>

        </div>
    );
};



export default PostCommentsCard