import React, { useState } from 'react'
import Nav from '../../Components/Nav'
import Login_Comp from '../../Components/Auth/Login_Comp'
import AuthSelection from '../../Components/Auth/AuthSelection';
import SideNav from '../../Components/SideNav';

const SignIn = () => {

    const [user, setUser] = useState("");

    return (
        <>
            <Nav />
            <SideNav />
            <div className='  '>
                {user === "" ? <AuthSelection user={user} setUser={setUser} type={"sign in"} /> : <Login_Comp user={user}/>}

            </div>

        </>
    )
}


export default SignIn