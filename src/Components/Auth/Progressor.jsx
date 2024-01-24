import React from "react";
import { Stepper, Step } from "@material-tailwind/react";

const Progressor = (props) => {
  const { step, totalSteps } = props;

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="w-full pt-4 px-8 z-0">
      <Stepper activeStep={step}>
        {stepsArray.map((index) => (
          <Step key={index}>{index}</Step>
        ))}
      </Stepper>
    </div>
  );
};

export default Progressor;
