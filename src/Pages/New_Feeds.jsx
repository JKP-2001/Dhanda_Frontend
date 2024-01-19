import React from 'react'
import Nav from '../Components/Nav'
import New_Feeds_Comp from '../Components/New_Feeds/New_Feeds_Comp'

const New_Feeds = () => {
  return (
    <div>
      <Nav />
      <div className='mb-20'>
        <New_Feeds_Comp />
      </div>
    </div>
  )
}

export default New_Feeds