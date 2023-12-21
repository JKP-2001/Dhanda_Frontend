import React from 'react'

import { Card, Carousel } from "@material-tailwind/react";

import FeedBackMaterial from './FeedBackMaterial';

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

 
const FeedbackCard = ()=> {
  return (
    <Card className="rounded-xl w-11/12 lg:w-8/12 pb-2 border-2 border-gray-300">
      <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Feedback</h1>
      <FeedBackMaterial />
      <div className='flex justify-between mx-5 pb-2'>
            <ArrowBackIosNewOutlinedIcon className='text-black hover:cursor-pointer' fontSize='small'/>
            <ArrowForwardIosOutlinedIcon className='text-black hover:cursor-pointer' fontSize='small'/>
      </div>
    </Card>
  );
}

export default FeedbackCard