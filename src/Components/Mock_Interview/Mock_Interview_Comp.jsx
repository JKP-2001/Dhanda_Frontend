import React, { useState } from "react";
import CatButton from "./CatButton";
import Sorting_Button from "./Sorting_Button";
import CompanyTag from "./CompanyTag";
import Interviewer_Card from "./Interviewer_Card";
import { motion } from "framer-motion";

const Mock_Interview_Comp = () => {
  const [comp, setComp] = useState([]);

  const companies = [
    "Amazon",
    "Google",
    "Microsoft",
    "Facebook",
    "Apple",
    "Uber",
    "Adobe",
    "Oracle",
    "Paypal",
    "Salesforce",
    "Cisco",
    "Samsung",
    "Walmart",
    "Intuit",
    "Spotify",
    "Twitter",
    "LinkedIn",
    "Snapchat",
    "Twitch",
    "TikTok",
    "Reddit",
    "Pinterest",
    "Netflix",
    "Airbnb",
    "IBM",
  ];
  const sort_by = ["Company", "Date", "Rating"];

  const variants = {
    hidden: { x: -30 },
    visible: { x: 0 },
  };

  return (
    <div className="flex items-center justify-center">
      <div className="pb-10 w-[80%]">
        <motion.div
          className="category"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex flex-wrap mt-10 space-x-4">
            <div></div>
            <CatButton type={"All"} active={true} />
            <CatButton type={"SDE"} active={false} />
            <CatButton type={"Data Science"} active={false} />
            <CatButton type={"Analyst"} active={false} />
          </div>
        </motion.div>
        <motion.div
          className="sorting"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex mt-10 space-x-6">
            <div></div>
            <Sorting_Button
              type={"Company"}
              menuItems={companies}
              setComp={setComp}
              tag="comp"
              comp={comp}
            />
            <Sorting_Button type={"Sort By"} menuItems={sort_by} />
          </div>
        </motion.div>
        <CompanyTag comp={comp} setComp={setComp} />
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
          <Interviewer_Card />
        </motion.div>
      </div>
    </div>
  );
};

export default Mock_Interview_Comp;
