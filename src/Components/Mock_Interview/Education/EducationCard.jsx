import React from 'react'

import { Card } from '@material-tailwind/react'
import InstitituteCard from './InstitituteCard'

const EducationCard = () => {
  return (
    <div>
      <Card className='w-11/12 lg:w-8/12 pb-2 border-2 border-gray-300'>
        <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Education</h1>
        <InstitituteCard />
        <InstitituteCard />
        <InstitituteCard />
      </Card>
    </div>
  )
}

export default EducationCard