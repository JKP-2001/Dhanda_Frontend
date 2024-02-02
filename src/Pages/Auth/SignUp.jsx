import React, { useState } from 'react'
import Nav from '../../Components/Nav'
import SignUp_Comp from '../../Components/Auth/SignUp_Comp'
import AuthSelection from '../../Components/Auth/AuthSelection';

const SignUp = () => {

  const [user, setUser] = useState("");

  return (
    <>
      <Nav />
      <div className='mb-20'>
        {user === "" ? <AuthSelection user={user} setUser={setUser} type={"sign up"} /> : <SignUp_Comp user={user}/>}
      </div>
    </>
  )
}

export default SignUp