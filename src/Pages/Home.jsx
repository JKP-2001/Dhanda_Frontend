import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import { scrollToTop } from '../Utils/functions'

const Home = () => {

  useEffect(()=>{
    scrollToTop();
  },[])

  return (
      <div>
        <Nav />
      </div>
  )
}

export default Home