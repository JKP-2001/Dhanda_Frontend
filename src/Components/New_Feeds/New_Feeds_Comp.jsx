import React, { useState } from 'react'
import PostCard from './PostCard'
import { useNavigate } from 'react-router-dom';
import Post_Modal from './Post_Modal';
import showToast from '../../Utils/showToast';


const dummy = [
  {
    name: "Emma Wilson",
    bio: "Product Manager | Innovator | Solving Problems with Technology",
    text: "Passionate about building products that make a difference in people's lives. Let's create something amazing together! 🚀",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 55,
    comments: 15,
    reposts: 28
  },
  {
    name: "James Rodriguez",
    bio: "Data Scientist | Analytics Enthusiast | Coffee Drinker",
    text: "Transforming data into insights. Fuelled by coffee and a curiosity to explore the hidden patterns in the numbers. ☕📊",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 42,
    comments: 20,
    reposts: 22
  },
  {
    name: "Sophia Miller",
    bio: "Travel Blogger | Adventure Seeker | Exploring the World",
    text: "Embarking on new adventures and sharing the beauty of different cultures. Join me on this journey of discovery! 🌍✈️",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 60,
    comments: 18,
    reposts: 30
  },
  {
    name: "Ryan Turner",
    bio: "Fitness Trainer | Health Enthusiast | Inspiring Healthy Lifestyles",
    text: "Dedicated to helping others achieve their fitness goals and lead a healthy, active life. Let's sweat it out together! 💪🏋️‍♂️",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 48,
    comments: 12,
    reposts: 25
  },
  {
    name: "Olivia Clark",
    bio: "Freelance Artist | Creative Mind | Expressing Emotions through Art",
    text: "Brush strokes of emotions on the canvas. Art is not what you see but what you make others see. 🎨✨",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 55,
    comments: 14,
    reposts: 27
  },
  {
    name: "Ethan Walker",
    bio: "Entrepreneur | Startup Enthusiast | Building the Future",
    text: "Turning dreams into reality, one startup at a time. Embracing the challenges and learning from every step of the journey. 💼🚀",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 50,
    comments: 16,
    reposts: 23
  },
  {
    name: "Ava Garcia",
    bio: "Foodie | Culinary Explorer | Tasting the World's Flavors",
    text: "From street food to fine dining, on a mission to explore and savor the diverse and delicious tastes of the world. 🍜🌮",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 58,
    comments: 19,
    reposts: 26
  },
  {
    name: "Logan Hill",
    bio: "Science Enthusiast | Exploring the Wonders of the Universe",
    text: "From microorganisms to galaxies, constantly fascinated by the mysteries of the cosmos. Join me on this cosmic journey! 🔭🌌",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 53,
    comments: 17,
    reposts: 29
  },
  {
    name: "Chloe Baker",
    bio: "Environmental Activist | Nature Lover | Protecting Our Planet",
    text: "On a mission to raise awareness and take action for a greener and more sustainable future. Every small effort counts! 🌿🌎",
    images: ['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600'],

    likes: 47,
    comments: 13,
    reposts: 24
  },
];

const New_Feeds_Comp = () => {

  
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  
  const [items, setItems] = useState(dummy);
  
  const [text, setText] = useState(null);
  
  const [images, setImages] = useState([]);
  
 

  


  const handlePost = () => {

    const data = {
      name: "Emma Wilson",
      bio: "Product Manager | Innovator | Solving Problems with Technology",
      text: text,
      images: images,
  
      likes: 55,
      comments: 15,
      reposts: 28
    };



    
    setItems([...items, data]);

    setOpen(false);

    setText("");

    setImages([]);

    document.body.style.overflow = 'auto';

    showToast({
      msg:"Post Created Successfully",
      type:"success",
      duration:3000
    })
  }

  return (
    <div>

      <div className="flex justify-center">
        <div className={`mx-2 mt-5 w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow  p-2`}>
          <div className="flex mx-5 space-x-4">
            <img
              className="hover:underline hover:cursor-pointer mt-2 sm:mt-0 w-[40px] sm:h-[40px]  border-2 border-gray-500 rounded-full object-cover object-center"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="nature"
              onClick={() => navigate("/user/profile/:user")}
            />

            {!open ? <input
              
              placeholder="Start A Post"
              className="w-full  font-inter text-sm"
              onClick={() => { setOpen(true); document.body.style.overflow = 'hidden'; }}
            /> : <Post_Modal open={open} setOpen={setOpen} text={text} setText={setText} images={images} setImages={setImages} handlePost={handlePost}/>}

          </div>
        </div>

      </div>

      <div >
        {items.map((item, index) => (
          <PostCard type="feed" key={index} name={item.name} bio={item.bio} text={item.text} images={item.images} likes={item.likes} comments={item.comments} reposts={item.reposts} follow={true} />
        ))}
        {/* <PostCard type="feed" follow={true} /> */}
      </div>
    </div>
  )
}

export default New_Feeds_Comp