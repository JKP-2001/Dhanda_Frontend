import React from 'react'
import SinglePost_Comp from '../Components/New_Feeds/SinglePost_Comp'
import Nav from '../Components/Nav'

const SinglePost = () => {
    return (
        <div>
            <Nav />
            <div className='mb-20'>
                <SinglePost_Comp />
            </div>
        </div>
    )
}

export default SinglePost