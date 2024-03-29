import React from 'react'
import SideNav from '../../Components/SideNav'
import PaymentComponent from '../../Components/Payment/PaymentComponent'
import Nav from '../../Components/Nav'
import SideBarProfile from '../../Components/Profile/SideBarProfile'

const PaymentPage = () => {
  return (
    <>
        <Nav />

        <div className='md:hidden lg:block'>
        <SideBarProfile />
        </div>

        <div className='mb-20 md:mb-20 lg:mb-10 lg:ml-60'>
            <PaymentComponent />
        </div>
    </>
  )
}

export default PaymentPage