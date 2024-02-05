import React from 'react'

const InstitituteCard = (props) => {

    const {instituteName, degree, startDate, endDate, description, branch} = props.education;

    const startYear = startDate.slice(0, 4);
    const endYear = endDate.slice(0, 4);


    return (
        <>
            <div className='flex '>
                <div className='logo'>
                    <img src="https://cdn.icon-icons.com/icons2/38/PNG/512/university_4593.png" alt="logo" className='h-[40px] w-[40px] mt-5 mx-4' />
                </div>
                <div className="info ml-7 md:mx-2">
                    <h1 className="font-roboto text-base font-medium mt-4">{instituteName}</h1>
                    <h1 className="font-inter text-sm text-gray-500">{degree} - {branch} </h1>
                    <h1 className="font-inter text-sm text-gray-500">{startYear} - {endYear} . {endYear-startYear} years</h1>
                </div>

            </div>
            {description!=="" &&<div className="about">
                <h1 className="font-inter text-sm text-gray-500 ml-[70px] md:ml-[80px] mt-2 mx-10 ">
                    {/* Filler text is text that shares some characteristics of a real written text, but is
                    random or otherwise generated. It may be used to display a sample of fonts, 
                    generate text for testing, or to spoof an e-mail spam filter. */}

                    {description}
                    
                </h1>
            </div>}
            <hr className='w-11/12 mx-4 mt-2' />
        </>
    )
}

export default InstitituteCard