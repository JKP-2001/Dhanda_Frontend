import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import SideNav from '../../Components/SideNav'
import SideBarProfile from '../../Components/Profile/SideBarProfile'
import BookingComponent from '../../Components/Booking/BookingComponent'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginUser } from '../../App'
import { scrollToTop } from '../../Utils/functions'

const BookingPage = () => {

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
        <BookingComponent />
    </div>
    </>
  )
}

export default BookingPage