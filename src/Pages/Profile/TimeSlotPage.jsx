import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import SideBarProfile from '../../Components/Profile/SideBarProfile'
import PriorityDM from '../../Components/Profile/PriorityDM'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginUser } from '../../App'
import { scrollToTop } from '../../Utils/functions'
import TimeSlots from '../../Components/Profile/TimeSlots'

const TimeSlotPage = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser(dispatch, navigate);
  },[])

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <>
        <Nav />
        <div className='md:hidden lg:block'>
            <SideBarProfile />
        </div>
        

        <div className='mb-20 md:mb-20 lg:mb-10 lg:ml-60'>
            <TimeSlots />
        </div>
    </>
  )
}

export default TimeSlotPage