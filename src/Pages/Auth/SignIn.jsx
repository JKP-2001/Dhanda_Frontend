import React, { useState } from 'react'
import Nav from '../../Components/Nav'
import Login_Comp from '../../Components/Auth/Login_Comp'
import AuthSelection from '../../Components/Auth/AuthSelection';

const SignIn = () => {

    const [user, setUser] = useState("");

    return (
        <>
            <Nav />
            <div className='mb-20'>
                {user === "" ? <AuthSelection user={user} setUser={setUser} type={"sign in"} /> : <Login_Comp />}

            </div>

        </>
    )
}


export default SignIn