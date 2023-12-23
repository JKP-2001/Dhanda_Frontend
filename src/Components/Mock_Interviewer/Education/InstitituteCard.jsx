import React from 'react'

const InstitituteCard = () => {
    return (
        <>
            <div className='flex '>
                <div className='logo'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/NITT_logo.png" alt="logo" className='h-[40px] w-[40px] mt-5 mx-4' />
                </div>
                <div className="info mx-2">
                    <h1 className="font-roboto text-base font-medium mt-4">National Institute of Technology, Trichy</h1>
                    <h1 className="font-inter text-sm text-gray-500">Bachelors Of Technology - Computer Science </h1>
                    <h1 className="font-inter text-sm text-gray-500">2019 - 2020 . 2 years </h1>
                </div>

            </div>
            <div className="about">
                <h1 className="font-inter text-sm text-gray-500 ml-[65px] md:ml-[80px] mt-2 mx-10 break-words">
                    Filler text is text that shares some characteristics of a real written text, but is
                    random or otherwise generated. It may be used to display a sample of fonts, 
                    generate text for testing, or to spoof an e-mail spam filter.

                    
                </h1>
            </div>
            <hr className='w-11/12 mx-4 mt-2' />
        </>
    )
}

export default InstitituteCard