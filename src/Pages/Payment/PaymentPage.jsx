import React from 'react'
import SideNav from '../../Components/SideNav'
import PaymentComponent from '../../Components/Payment/PaymentComponent'
import Nav from '../../Components/Nav'

const PaymentPage = () => {
  return (
    <>
        <Nav />

        <div className='md:hidden lg:block'>
        <SideNav />
        </div>

        <div className='mb-20 md:mb-0 lg:ml-60'>
            <PaymentComponent />
        </div>
    </>
  )
}

export default PaymentPage