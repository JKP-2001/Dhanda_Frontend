import React from 'react'

const FeedBackMaterial = (props) => {

    const { name, text } = props

    return (
        <>
            <div className='flex '>
                <div className='logo'>
                    <img src="https://cdn-icons-png.flaticon.com/512/6378/6378141.png" alt="logo" className='h-[40px] w-[40px] mt-5 mx-4' />
                </div>
                <div className="info">
                    <h1 className="font-roboto text-base font-medium mt-6 ">{name}</h1>
                </div>

            </div>
            <div className="about pb-5">
                <h1 className="font-inter text-sm text-gray-500 ml-[70px] md:ml-[70px] mx-10 break-words">
                    {text}
                </h1>
            </div>



        </>
    )
}

export default FeedBackMaterial