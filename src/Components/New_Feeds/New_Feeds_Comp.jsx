import React, { useState } from 'react'
import PostCard from './PostCard'
import { useNavigate } from 'react-router-dom';
import Post_Modal from './Post_Modal';
import showToast from '../../Utils/showToast';
import { createPost, getAllPost } from '../../APIs/Post_API';
import { useDispatch, useSelector } from 'react-redux';
import { getPostSuccess } from '../../Redux/post/postSlice';
import Edit_Modal from './Edit_Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@material-tailwind/react';



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


  useState(() => {
    const callGetPost = async () => {
      await getAllPostAPI();
    };

    callGetPost();
  }, [itemRedux.data.length])

  const userRedux = useSelector((state) => state.user);


  const handlePost = async (imageFiles) => {

    const data = {
      author: {
        firstName: userRedux.data ? userRedux.data.firstName : "",
        lastName: userRedux.data ? userRedux.data.lastName : "",
        bio: userRedux.data ? userRedux.data.bio : ""
      },
      content: text,
      images: images,
      likes: [],
      comments: [],
      reposts: [],
      bookmarks: [],
      createdAt: Date.now()
    }



    const newData = [{ ...data }, ...itemRedux.data]

    dispatch(getPostSuccess(newData));

    const token = localStorage.getItem("token");

    const createThePost = await createPost(text, imageFiles, token);

    if (createThePost.success) {
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
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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

      <InfiniteScroll 
        dataLength={itemRedux.data.length}
        next={getAllPostAPI}
        hasMore={itemRedux.data.length !== totalPosts}
        loader={<div className='flex justify-center pt-10 font-inter text-2xl'>
          <div>Loading More Posts.....</div>
        </div>}
      >
        {itemRedux.data.map((item, index) => (

          <PostCard isUpdated={item.isUpdated} type="feed" key={item.updatedAt?item.updatedAt:item.createdAt} postId={item._id} index={index} name={item.author.firstName + " " + item.author.lastName} bio={item.author.bio} text={item.content ? item.content : null} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} bookMarks={item.bookmarks} follow={true} createdAt={item.createdAt} updatedAt={item.updatedAt} role={item.author.role} authorId={item.author._id} />
        ))}
        {/* <PostCard type="feed" follow={true} /> */}
      </InfiniteScroll>
    </div>
  )
}

export default New_Feeds_Comp