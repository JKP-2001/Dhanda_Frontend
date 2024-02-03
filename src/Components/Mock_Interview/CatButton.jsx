import { Button } from "@material-tailwind/react";
import React from "react";

const CatButton = ({ active,type }) => {
  if (active) {
    return (
      <Button
        className={`w-[147.39px] h-[41px] font-inter font-bold rounded-3xl text-white  border-[2px] bg-btn-col text-center my-2`}
      >
        {type}
      </Button>
    );
  } else
    return (
      <Button
        className={`w-[147.39px] h-[41px] font-inter font-bold rounded-3xl text-btn-col border-[2px] border-btn-col  bg-white text-center my-2`}
      >
        {type}
      </Button>
    );
};

export default CatButton;
