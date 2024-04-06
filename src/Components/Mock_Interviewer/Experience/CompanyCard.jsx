import React from 'react'

const CompanyCard = (props) => {

    const {role, startDate, endDate, description, company} = props.exp; 

   

    const startYear = startDate.slice(0, 4);

    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

   

    const endYear = endDate?endDate.slice(0, 4):currentYear;

    return (
        <>
            <div className='flex'>
                <div className='logo'>
                    <img src="https://cdn-icons-png.freepik.com/512/895/895360.png?ga=GA1.1.1404805500.1684049480&" alt="logo" className='h-[40px] w-[40px] mt-5 mx-4' />
                </div>
                <div className="info mx-2">
                    <h1 className="font-roboto text-sm md:ext-base font-medium mt-4 mb-1">{role}</h1>
                    <h1 className="font-inter text-xs md:text-sm text-gray-500">{company}  {endDate?" - Full-time":""} </h1>
                    <h1 className="font-inter text-xs md:text-sm text-gray-500">{startYear} - {endDate?endYear:"Present"} . {currentYear-startYear} years </h1>
                </div>

            </div>
            <div className="about">
            <h1 className="font-inter text-xs md:text-sm text-gray-500 ml-[80px] lg:ml-[80px] mt-2 mx-10 break-words">
                    {description}

                    
                </h1>
            </div>
            <hr className='w-11/12 mx-4 mt-2' />
        </>
    );
}

export default CompanyCard