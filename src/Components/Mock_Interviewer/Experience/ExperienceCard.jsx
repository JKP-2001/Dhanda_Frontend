import React, { useState } from 'react'

import { Card, useSelect } from '@material-tailwind/react'

import CompanyCard from './CompanyCard'
import { useSelector } from 'react-redux';

const ExperienceCard = (props) => {

    const [showAll, setShowAll] = useState(false);

    const userRedux = props.exp;

    if(!userRedux){
        return null;
      }

    if(!userRedux.data){
        return null;
    }

    const experienceList = userRedux.data.experience;

    console.log({experienceList})

  const visibleExp = showAll ? experienceList : experienceList.slice(0, 2);

  return (
    <div>
      <Card className='w-[96%] lg:w-8/12 pb-2 border-2 border-gray-300'>
        <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Experience</h1>
        <hr className='w-11/12 mx-4 mt-2' />

        {visibleExp.map((exp, index) => (
          <CompanyCard exp={exp} key={index} />
        ))}

        {experienceList.length > 2 && (
          <div className="flex justify-center showAll font-roboto hover:cursor-pointer mt-2" onClick={() => setShowAll(!showAll)}>
            {!showAll ? 'Show All' : 'Show Less'}
          </div>
        )}
      </Card>
    </div>
  );
}

export default ExperienceCard