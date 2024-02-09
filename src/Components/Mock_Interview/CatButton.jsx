import { Button } from "@material-tailwind/react";
import React from "react";

const CatButton = ({ active, type, handleCat, num }) => {
  if (active) {
    return (
      <Button
        onClick={() => {
          handleCat(num);
        }}
        className={`w-[147.39px] h-[41px] font-inter font-bold rounded-md text-white  border-[2px] bg-btn-col text-center my-2`}
      >
        {type}
      </Button>
    );
  } else
    return (
      <Button
        onClick={() => {
          handleCat(num);
        }}
        className={`w-[147.39px] h-[41px] font-inter font-bold rounded-md text-btn-col border-[2px] border-btn-col  bg-white text-center my-2`}
      >
        {type}
      </Button>
    );
};

export default CatButton;
