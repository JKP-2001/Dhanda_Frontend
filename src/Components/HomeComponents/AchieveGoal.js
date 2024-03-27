import React from "react";
import achiveCard from "../../Utils/Images/funfacts.png";

function AchieveGoal() {
  return (
    <div className="w-[100%] mt-28">
      <div className="flex lg:flex-row flex-col w-[80%] item-center justify-between mx-auto gap-12 lg:gap-10 bg-[#002147] rounded-md p-6 lg:p-4">
        <img className="h-auto w-[200px] mx-auto lg:w-[40%]" src={achiveCard}></img>
        <div className="font-roboto text-4xl   lg:mt-[6rem] text-white text-center lg:text-left lg:w-[60%]">
          Transform Your Skills with top companies expert mentorship and
          realistic mock interviews
        </div>
      </div>
    </div>
  );
}

export default AchieveGoal;
