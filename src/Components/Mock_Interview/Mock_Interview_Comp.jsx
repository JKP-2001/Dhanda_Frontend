import React, { useEffect, useState } from "react";
import CatButton from "./CatButton";
import Sorting_Button from "./Sorting_Button";
import CompanyTag from "./CompanyTag";
import Interviewer_Card from "./Interviewer_Card";
import { motion } from "framer-motion";
import { fetchInstructer } from "../../Redux/instructers/instructerAction";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setCurrentPage } from "../../Redux/instructers/instructerSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../Utils/Loader";
import Loading from "../../Utils/Loading.gif";

const Mock_Interview_Comp = () => {

  const Spinner = () => {
    return (
      <div className=" mt-8 flex items-center justify-center">
        <img src={Loading} alt="Loading" />
      </div>
    );
  };

  const [comp, setComp] = useState([]);
  const dispatch = useDispatch();
  const currPage = useSelector((state) => state.instructers.currPage);
  const instructers = useSelector((state) => state.instructers.instructers);
  const totalResults = useSelector((state) => state.instructers.totalResults);

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



  const fetchMoreData = async () => {
    dispatch(fetchInstructer());
  };

  useEffect(()=>{
    dispatch(fetchInstructer());
  },[]);

 

  return (
    <div className="flex items-center justify-center ">
      <div className="pb-10 w-[80%] mt-10 ">
        <motion.div
          className="category"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex flex-wrap  space-x-4">
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
        <InfiniteScroll
          dataLength={instructers.length}
          next={fetchMoreData}
          hasMore={totalResults !== instructers.length}
          loader={<Spinner />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {instructers.map((ins,idx) => {
              return <Interviewer_Card key={idx} instructer={ins} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Mock_Interview_Comp;
