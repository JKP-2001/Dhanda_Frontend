import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import New_Feeds_Comp from '../Components/New_Feeds/New_Feeds_Comp'
import SideNav from '../Components/SideNav'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginUser } from '../App'

const New_Feeds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser(dispatch, navigate);
  }, [])

  return (
    <div>
      <Nav />
      <div className='md:hidden lg:block'>
        <SideNav />
      </div>
      <div className='mb-20 lg:ml-60'>
        <New_Feeds_Comp />
      </div>
    </div>
  )
}

export default New_Feeds