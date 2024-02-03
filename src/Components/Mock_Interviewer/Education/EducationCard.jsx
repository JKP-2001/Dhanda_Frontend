import React, { useState } from 'react';
import { Card } from '@material-tailwind/react';
import InstitituteCard from './InstitituteCard';
import { useSelector } from 'react-redux';

const EducationCard = (props) => {
  const [showAll, setShowAll] = useState(false);

  const userRedux = props.edu;

  if(!userRedux){
    return null;
  }

  if (!userRedux.data) {
    return null;
  }

  const educationList = userRedux.data.education;

  const visibleEducation = showAll ? educationList : educationList.slice(0, 2);

  return (
    <div>
      <Card className='w-[96%] lg:w-8/12 pb-2 border-2 border-gray-300'>
        <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Education</h1>
        <hr className='w-11/12 mx-4 mt-2' />

        {visibleEducation.map((education, index) => (
          <InstitituteCard education={education} key={index} />
        ))}

        {educationList.length > 2 && (
          <div className="flex justify-center showAll font-roboto hover:cursor-pointer mt-2" onClick={() => setShowAll(!showAll)}>
            {!showAll ? 'Show All' : 'Show Less'}
          </div>
        )}
      </Card>
    </div>
  );
};

export default EducationCard;
