import React from "react";
import achiveCard from "../../Utils/Images/funfacts.jpg";

function AchieveGoal() {
  return (
    <div className="w-[100%] mt-28">
      <div className="flex lg:flex-row flex-col w-[96%] md:w-[80%] item-center justify-between mx-auto gap-12 lg:gap-10 bg-[#002147] p-6 lg:p-4 rounded-lg">
        <img className="h-auto w-[321px] mx-auto lg:w-[40%] rounded-3xl" src={achiveCard}></img>
        <div className="font-handwritten2 text-2xl lg:text-4xl   lg:mt-[11rem] text-white text-center lg:text-left lg:w-[60%]">
          {`Transform your skills with top companies expert's mentorship and
          realistic mock interviews.`}
        </div>
      </div>
    </div>
  );
}

export default AchieveGoal;
