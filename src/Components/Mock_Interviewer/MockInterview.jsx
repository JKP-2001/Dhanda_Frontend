import React from 'react'
import { Button } from "@material-tailwind/react";
import EducationCard from './Education/EducationCard';
import ExperienceCard from './Experience/ExperienceCard';
import FeedbackCard from './FeedBacks/FeedbackCard';

import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';



const MockInterview = () => {

    const variants = {
        hidden: { x: -100 },
        visible: { x: 0 }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/mock-interview/schedule/Manish');
    }

    return (
        <>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="mt-8 ml-2 lg:mt-20 lg:ml-48 mb-10">
                    <div className='ml-3'>
                        <img
                            className="h-[170px] w-[170px] rounded-full object-cover object-center"
                            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            alt="nature"
                        />
                    </div>



                    <div className='ml-5 lg:ml-7'>
                        <h1 className="font-roboto text-xl font-thin mt-4">Manish Mishra</h1>
                        <h1 className="font-inter text-sm w-11/12 lg:w-8/12 text-gray-500">Software Engineer | Ex-PayPal | 110K+ LinkedIn Family | NIT Trichy'20</h1>
                    </div>

                    <div className='ml-5 lg:ml-7 description font-inter w-11/12 lg:w-8/12  mt-10 text-sm'>
                        Filler text is text that shares some characteristics of a real written text, but is
                        random or otherwise generated. It may be used to display a sample of fonts,
                        generate text for testing, or to spoof an e-mail spam filter.

                        Filler text is text that shares some characteristics of a real written text, but is
                        random or otherwise generated. It may be used to display a sample of fonts,
                        generate text for testing, or to spoof an e-mail spam filter.
                    </div>

                    <div className='ml-5 lg:ml-7 mt-10'>
                        <Button
                            color="black"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            className="w-40 h-10 font-inter"
                            onClick={handleClick}
                        >
                            Book a Session
                        </Button>
                    </div>

                    <motion.div 
                        className='ml-5 lg:ml-7 mt-5'>

                        <ExperienceCard />

                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5 }}
                        className='ml-5 lg:ml-7 mt-5'>

                        <EducationCard />

                    </motion.div>

                    <div className='ml-5 lg:ml-7 mt-10'>
                        <Button
                            color="black"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            className="w-40 h-10 font-inter"
                        >
                            Book a Session
                        </Button>
                    </div>

                    <motion.div initial={{ opacity: 0, y:100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5 }}
                    className='ml-5 lg:ml-7 mt-10'>
                        <FeedbackCard />
                    </motion.div>

                    {/* <div className='ml-5 lg:ml-7 mt-10 w-11/12 lg:w-8/12'>
                    <ResponsiveDateTimePickers />
                </div> */}

                </div>

            </motion.div>
        </>
    )
}

export default MockInterview;