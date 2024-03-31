import React from 'react'
import Nav from '../../Components/Nav'
import SideBarProfile from '../../Components/Profile/SideBarProfile'
import PriorityDM from '../../Components/Profile/PriorityDM'

const DM = () => {
  return (
    <>
        <Nav />
        <div className='md:hidden lg:block'>
            <SideBarProfile />
        </div>
        

        <div className='mb-20 md:mb-20 lg:mb-10 lg:ml-60'>
            <PriorityDM />
        </div>
    </>
  )
}

export default DM