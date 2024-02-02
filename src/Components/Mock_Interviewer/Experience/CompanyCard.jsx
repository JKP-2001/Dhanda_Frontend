import React from 'react'

const CompanyCard = () => {
    return (
        <>
            <div className='flex'>
                <div className='logo'>
                    <img src="https://cdn-icons-png.freepik.com/512/895/895360.png?ga=GA1.1.1404805500.1684049480&" alt="logo" className='h-[40px] w-[40px] mt-5 mx-4' />
                </div>
                <div className="info mx-2">
                    <h1 className="font-roboto text-base font-medium mt-4">Software Engineer II</h1>
                    <h1 className="font-inter text-sm text-gray-500">PayPal - Full-time </h1>
                    <h1 className="font-inter text-sm text-gray-500">2019 - 2020 . 2 years </h1>
                </div>

            </div>
            <div className="about">
            <h1 className="font-inter text-sm text-gray-500 ml-[80px] lg:ml-[80px] mt-2 mx-10 break-words">
                    Filler text is text that shares some characteristics of a real written text, but is
                    random or otherwise generated. It may be used to display a sample of fonts, 
                    generate text for testing, or to spoof an e-mail spam filter.

                    
                </h1>
            </div>
            <hr className='w-11/12 mx-4 mt-2' />
        </>
    );
}

export default CompanyCard