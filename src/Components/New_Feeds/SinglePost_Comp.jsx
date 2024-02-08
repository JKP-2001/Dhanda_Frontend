import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostCard from './PostCard';
import showToast from '../../Utils/showToast';
import { getAPost } from '../../APIs/Post_API';

const SinglePost_Comp = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const params = useParams();

  const getAllPostAPI = async () => {
    const id = params.id;
    const result = await getAPost(id);
    if (result.success) {
      setItems([result.data]);
    } else {
      showToast({
        msg: "Something went wrong",
        type: "error",
        duration: 3000
      });
    }
  };

  console.log({ items });

  useEffect(() => {
    const callGetPost = async () => {
      await getAllPostAPI();
    };

    callGetPost();
  }, [params.id]);

  return (
    <div >
      <div>
        {items.map((item, index) => (
          <PostCard
            isUpdated={item.isUpdated}
            type="ind"
            key={item.updatedAt ? item.updatedAt : item.createdAt}
            postId={item._id}
            index={index}
            name={item.author.firstName + " " + item.author.lastName}
            bio={item.author.bio}
            text={item.content ? item.content : null}
            images={item.images}
            likes={item.likes}
            comments={item.comments}
            reposts={item.reposts}
            bookMarks={item.bookmarks}
            follow={true}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default SinglePost_Comp;
