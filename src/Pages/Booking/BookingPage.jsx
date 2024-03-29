import React from 'react'
import Nav from '../../Components/Nav'
import SideNav from '../../Components/SideNav'
import SideBarProfile from '../../Components/Profile/SideBarProfile'
import BookingComponent from '../../Components/Booking/BookingComponent'

const BookingPage = () => {
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