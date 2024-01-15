import React from 'react'
import Nav from '../../Components/Nav'
import NewPassword_Comp from '../../Components/Auth/NewPassword_Comp'

const NewPassword = () => {
  return (
    <>
      <Nav />
      <div className='mb-20'>
        <NewPassword_Comp />
      </div>
    </>
  )
}

export default NewPassword