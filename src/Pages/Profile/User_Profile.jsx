import React from 'react'
import Nav from '../../Components/Nav'
import User_Profile_Comp from '../../Components/Profile/User_Profile_Comp'

const User_Profile = () => {
  return (
    <div>
      <Nav />
      <div className='mb-20'>
        <User_Profile_Comp />
      </div>
    </div>
  )
}

export default User_Profile