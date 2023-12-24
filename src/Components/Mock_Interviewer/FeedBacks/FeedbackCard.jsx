import React, { useState } from 'react'

import { Card, Carousel } from "@material-tailwind/react";

import FeedBackMaterial from './FeedBackMaterial';

import { motion } from 'framer-motion';

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';


const FeedbackCard = () => {

  const [active, setActive] = useState(0);

  const names = ["Jay Pandey", "Amar Sen", "Amish Tripathi", "Arjun Singh", "Rajesh Kumar"];

  const texts = ["I was able to get a lot of insights from the session. The interviewer was very helpful and gave me a lot of tips to improve my interview skills.",

    " Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",

    "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",

    "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",

    "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. "

  ];

  const setNext = () => {

    if (active === names.length - 1) {
      return;
    }
    setActive(active + 1);
  }

  const setBack = () => {
    if (active === 0) {
      return;
    }
    setActive(active - 1);
  }

  const variants = {
    hidden: { x: 50 },
    visible: { x: 0 }
  };

  return (
    <Card className="rounded-xl w-11/12 lg:w-8/12 pb-2 border-2 border-gray-300 overflow-hidden" >

      <motion.div key={active} // Add key prop here
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ type: "spring", stiffness: 100}} >


        <h1 className="font-roboto text-xl font-thin mt-4 ml-6 text-black">Feedbacks</h1>

        <FeedBackMaterial name={names[active]} text={texts[active]} />

        <div className='flex justify-between mx-5 pb-2'>
          {active > 0 ? <ArrowBackIosNewOutlinedIcon className='text-black hover:cursor-pointer' fontSize='small' onClick={setBack} /> : <div></div>}
          {active < names.length - 1 ? <ArrowForwardIosOutlinedIcon className='text-black hover:cursor-pointer' fontSize='small' onClick={setNext} /> : <div></div>}
        </div>
      </motion.div>
    </Card>
  );
}

export default FeedbackCard