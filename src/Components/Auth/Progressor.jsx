import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
 
const Progressor = (props)=> {

  
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);



  const {step, setStep, handleNext, handlePrev} = props;

    
  
 
  return (
    <div className="w-full pt-4 px-8">
      <Stepper
        activeStep={step}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setStep(1)}>1</Step>
        <Step onClick={() => setStep(2)}>2</Step>
        <Step onClick={() => setStep(3)}>3</Step>
        <Step onClick={() => setStep(4)}>4</Step>
        
      </Stepper>
      
    </div>
  );
}

export default Progressor;