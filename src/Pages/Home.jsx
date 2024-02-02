import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { scrollToTop } from '../Utils/functions'
import Editor from '../Utils/Editor'
import Post_Modal from '../Components/New_Feeds/Post_Modal'

const Home = () => {

  useEffect(()=>{
    scrollToTop();
  },[])

  const [open, setOpen] = useState(false);

  return (
      <div>
        <Nav />
        <Post_Modal open={open} setOpen={setOpen}/>
      </div>
  )
}

export default Home