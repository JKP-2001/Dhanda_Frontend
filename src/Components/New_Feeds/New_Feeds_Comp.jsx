import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useNavigate } from 'react-router-dom';
import Post_Modal from './Post_Modal';
import showToast from '../../Utils/showToast';
import { createPost, getAllPost } from '../../APIs/Post_API';
import { useDispatch, useSelector } from 'react-redux';
import { getPostRequest, getPostSuccess } from '../../Redux/post/postSlice';
import Edit_Modal from './Edit_Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@material-tailwind/react';

import userimg from "../../Utils/Images/user2.jpg"
import toast from 'react-hot-toast';

const New_Feeds_Comp = () => {


  const navigate = useNavigate();

  const itemRedux = useSelector((state) => state.post);

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);

  

  const [items, setItems] = useState([]);

  const [text, setText] = useState(null);

  const [images, setImages] = useState([]);


  const dispatch = useDispatch();

  const getAllPostAPI = async () => {

    dispatch(getPostRequest());

    if(page === 1) dispatch(getPostSuccess([]));
    console.log({data:itemRedux.data})

    const result = await getAllPost(page, limit);
    if (result.success) {
      dispatch(getPostSuccess([...itemRedux.data, ...result.data.result]));
      setTotalPosts(result.data.totalResults)
      setPage(page + 1);
    }
    else {
      showToast({
        msg: "Something went wrong",
        type: "error",
        duration: 3000
      })
    }

  }


  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPostRequest());
      setPage(1); // Reset page to 1 when component mounts
      try {
        const result = await getAllPost(page, limit);
        if (result.success) {
          dispatch(getPostSuccess(result.data.result));
          setTotalPosts(result.data.totalResults);
          setPage(page + 1);
        } else {
          showToast({
            msg: "Something went wrong",
            type: "error",
            duration: 3000
          });
        }
      } catch (error) {
        showToast({
          msg: "Something went wrong",
          type: "error",
          duration: 3000
        });
      }
    };
  
    fetchData();
  
    return () => {
      
      dispatch(getPostSuccess([]));
    };
  }, []);
  

  const userRedux = useSelector((state) => state.user);


  const handlePost = async (imageFiles) => {

    

    const token = localStorage.getItem("token");

    if (!token) {

      showToast({
        msg: "Login Required",
        type: "error",
        duration: 3000
      })
      navigate("/login");
    }

    //create loader from hot toast

    const loader = toast.loading("Posting...");

    const createThePost = await createPost(text, imageFiles, token);

    toast.dismiss(loader);

    if (createThePost.success) {
      const id = createThePost.id;

      const data = {
        author: {
          firstName: userRedux.data ? userRedux.data.firstName : "",
          lastName: userRedux.data ? userRedux.data.lastName : "",
          bio: userRedux.data ? userRedux.data.bio : "",
          _id: userRedux.data ? userRedux.data._id : "",
        },
        content: text,
        images: images,
        likes: [],
        comments: [],
        reposts: [],
        bookmarks: [],
        createdAt: Date.now(),
        _id: id
      }
  
  
  
      const newData = [{ ...data }, ...itemRedux.data]
  
      dispatch(getPostSuccess(newData));

      showToast({
        msg: "Post Created Successfully",
        type: "success",
        duration: 3000
      })

      // await getAllPostAPI();

      setOpen(false);

      setText("");

      setImages([]);

      document.body.style.overflow = 'auto';
    }
    else {
      showToast({
        msg: "Something went wrong",
        type: "error",
        duration: 3000
      })
    }

  }

  return (
    itemRedux.data && <div>

      <div className="flex justify-center">
        <div className={`mx-2 mt-5 w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow  p-2`}>
          <div className="flex  mx-5 space-x-4">
            <img
              className="hover:underline hover:cursor-pointer mt-2 sm:mt-0 w-[40px] sm:h-[40px]  border-2 border-gray-500 rounded-full object-cover object-center"
              src={userimg}
              alt="nature"
              onClick={() => navigate("/user/profile/:user")}
            />


            {!open ? <input

              placeholder="Start A Post"
              className="w-full  max-w-3xl font-inter text-sm outline-none"
              onClick={() => { setOpen(true); document.body.style.overflow = 'hidden'; }}
            /> :
              <Post_Modal open={open} setOpen={setOpen} text={text} setText={setText} images={images} setImages={setImages} handlePost={handlePost} />}

          </div>
        </div>

      </div>

      

      {<InfiniteScroll 
        dataLength={itemRedux.data.length}
        next={getAllPostAPI}
        hasMore={itemRedux.data.length !== totalPosts}
      >
        {itemRedux.data.map((item, index) => (

          <PostCard isUpdated={item.isUpdated} type="feed" key={item.updatedAt?item.updatedAt:item.createdAt} postId={item._id} index={index} name={item.author.firstName + " " + item.author.lastName} bio={item.author.bio} text={item.content ? item.content : null} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} bookMarks={item.bookmarks} follow={true} createdAt={item.createdAt} updatedAt={item.updatedAt} role={item.author.role} authorId={item.author._id} />
        ))}
        {/* <PostCard type="feed" follow={true} /> */}
      </InfiniteScroll>}

      {itemRedux.loading?<div className='flex justify-center pt-10 font-inter text-base md:text-2xl'>
        <Spinner color='blue' size='large'/>
        <div className='font-handwritten2 text-base md:text-xl ml-2 mt-[1px] md:-mt-1'>Loading Posts.....</div>
      </div>:null}

    </div>
  )
}

export default New_Feeds_Comp