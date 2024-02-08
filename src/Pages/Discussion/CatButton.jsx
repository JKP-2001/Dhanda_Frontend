import { Button } from "@material-tailwind/react";
import React from "react";

const CatButton = ({ active, type, num }) => {
  if (active) {
    return (
      <Button
        className={`  font-inter font-bold rounded-md text-white  border-[2px] bg-btn-col text-center my-2`}
      >
        {type}
      </Button>
    );
  } else
    return (
      <Button
        className={` font-inter font-bold rounded-md text-btn-col border-[2px] border-btn-col  bg-white text-center my-2`}
      >
        {type}
      </Button>
    );
};

export default CatButton;
