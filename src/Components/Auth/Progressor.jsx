import React from "react";
import { Stepper, Step} from "@material-tailwind/react";
 
const Progressor = (props)=> {

  const {step} = props;

  return (
    <div className="w-full pt-4 px-8 z-0">
      <Stepper
        activeStep={step}
      >
        <Step>1</Step>
        <Step>2</Step>
        <Step>3</Step>
        <Step>4</Step>
        
      </Stepper>
      
    </div>
  );
}

export default Progressor;