import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { motion } from "framer-motion";

const Interviewer_Card = (props) => {

    const navigate = useNavigate();

    return (
        // <motion.div initial={{ opacity: 0, y: 200 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true, amount: 0.1 }}
        // transition={{ duration: 0.5 }} >
        <div className="select-none">
            <Card className="mt-5 mx-5 md:w-11/12 border-2 shadow-lg hover:shadow-2xl border-gray-200 hover:border-gray-300">
                <div className="price absolute right-4 top-2 text-black font-inter">
                    {`₹ ${props.price} (${props.interviewDuration} mins)`}
                </div>

                <div className="info mt-2">
                    <div className="image mt-14 flex justify-center">
                        <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="" className="h-[140px] w-[140px] rounded-full object-cover object-center border-2 border-blue-gray-300" />
                    </div>

                    <div className="mx-5 lg:mx-20 mt-2">

                        <div className="name font-inter text-black font-bold text-lg">
                            {`${props.firstName} ${props.lastName}`}
                        </div>
                        <div className="name font-inter text-sm">
                            {props.headline}
                        </div>

                        <div className="flex flex-wrap mt-2 -ml-1">
                            <GradeOutlinedIcon />
                            <div className="rating">
                                {`${props.rating}/5 (${props.interviewsTaken} Done)`}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                color="lightBlue"
                                buttonType="filled"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                className="mt-5 mb-5 font-inter"
                                onClick={() => navigate("/mock-interview/ss")}
                            >
                                See More
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Interviewer_Card;