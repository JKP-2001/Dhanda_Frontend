import React from 'react'
import Nav from '../Components/Nav'
import New_Feeds_Comp from '../Components/New_Feeds/New_Feeds_Comp'
import SideNav from '../Components/SideNav'

const New_Feeds = () => {
  return (
    <div>
      <SideNav/>
      <Nav />
      <div className='mb-20 lg:ml-60'>
        <New_Feeds_Comp />
      </div>
    </div>
  )
}

export default New_Feeds