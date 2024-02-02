import React from 'react'
import Nav from '../../Components/Nav'
import ForgotPassword_Comp from '../../Components/Auth/ForgotPassword_Comp'

const ForgotPassword = () => {
    return (
        <>
            <Nav />
            <div className='mb-20'>
                <ForgotPassword_Comp />
            </div>
            
        </>
    )
}

export default ForgotPassword