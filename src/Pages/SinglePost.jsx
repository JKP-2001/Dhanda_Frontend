import React from 'react'
import SinglePost_Comp from '../Components/New_Feeds/SinglePost_Comp'
import Nav from '../Components/Nav'
import Editor_Utils from '../Utils/Editor_Utils'

const SinglePost = () => {
    return (
        <div>
            <Nav />
            <div className='mb-20'>
                <SinglePost_Comp />
                {/* <Editor_Utils placeholder={"Write something here..."}/> */}
            </div>
        </div>
    )
}

export default SinglePost