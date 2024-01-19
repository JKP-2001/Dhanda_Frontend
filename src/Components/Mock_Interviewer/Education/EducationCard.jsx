import React, { useState } from 'react'

import { Card } from '@material-tailwind/react'
import InstitituteCard from './InstitituteCard'

const EducationCard = () => {

  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <Card className='w-[96%] lg:w-8/12 pb-2 border-2 border-gray-300'>
        <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Education</h1>
        <hr className='w-11/12 mx-4 mt-2' />
        <InstitituteCard />
        <InstitituteCard />
        {!showAll ?
          null :
          <InstitituteCard />}

        <div className="flex justify-center showAll font-roboto hover:cursor-pointer mt-2" onClick={() => setShowAll(!showAll)}>
          {!showAll ? "Show All" : "Show Less"}
        </div>
      </Card>
    </div>
  )
}

export default EducationCard