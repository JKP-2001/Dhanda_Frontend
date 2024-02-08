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
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { fetchCompanyWiseInstructors } from "../../Redux/instructers/companyWiseInstructorAction";

const Mock_Interview_Comp = () => {
  const Spinner = () => {
    return (
      <div className=" mt-8 flex items-center justify-center">
        <img src={Loading} alt="Loading" />
      </div>
    );
  };

  const navigate = useNavigate();

  const [comp, setComp] = useState([]);
  const dispatch = useDispatch();
  const currPage = useSelector((state) => state.instructers.currPage);
  const instructers = useSelector((state) => state.instructers.instructers);
  const totalResults = useSelector((state) => state.instructers.totalResults);
  const location = useLocation();
  const [sortByItem, setSortByItem] = useState("");
  const companyWiseInstructors = useSelector(
    (state) => state.companyWiseInstructor.instructor
  );

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
  const sort_by = [
    "Company",
    "Price Low to High",
    "Price High to Low",
    "Rating",
  ];

  const variants = {
    hidden: { x: -30 },
    visible: { x: 0 },
  };

  const fetchMoreData = async () => {
    const data = {
      companies: comp,
      page: currPage,
      limit: 6,
      sortBy: sortByItem,
    };
    dispatch(fetchInstructer(data));
  };

  useEffect(() => {
    const data = {
      companies: comp,
      page: currPage,
      limit: 6,
      sortBy: sortByItem,
    };
    dispatch(fetchInstructer(data));
    console.log(location);
  }, []);

  const updateSortBy = (sortBy) => {
    const searchParams = new URLSearchParams();
    searchParams.set("sortBy", sortBy);
    if (comp.length !== 0) {
      searchParams.append("company", comp);
    }
    navigate(`?${searchParams.toString()}`);
  };

  const updateCompanies = (companies) => {
    const searchParams = new URLSearchParams();
    companies.forEach((company) => {
      searchParams.append("company", company);
    });
    if (sortByItem !== "") {
      searchParams.append("sortBy", sortByItem);
    }

    navigate(`?${searchParams.toString()}`);
  };

  const updateURLWithCompanies = () => {
    const searchParams = new URLSearchParams();
    comp.forEach((company) => {
      searchParams.append("company", company);
    });
    navigate(`?${searchParams.toString()}`);
  };

  const categories=["All","SDE","Data Science","Analyst"];

  const [selectedCat,setSelectedCat]= useState(0);
  const handleCat=(idx)=>{
    setSelectedCat(idx);
    dispatch(fetchCompanyWiseInstructors({sortBy:"",companies:[],category:categories[idx]}));
  }

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
            {
              categories.map((cat,idx)=>{
                return <CatButton handleCat={handleCat} key={idx} type={cat} active={selectedCat===idx?true:false} num={idx} />
              })
            }
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
              location={location}
              menuItems={companies}
              setComp={setComp}
              tag="comp"
              comp={comp}
              updateCompanies={updateCompanies}
              sortBy={sortByItem}
            />
            <Sorting_Button
              sortByItem={sortByItem}
              setSortByItem={setSortByItem}
              type={"Sort By"}
              menuItems={sort_by}
              location={location}
              updateSortBy={updateSortBy}
              comp={comp}
            />
          </div>
        </motion.div>
        <CompanyTag
          comp={comp}
          sortBy={sortByItem}
          updateURLWithCompanies={updateURLWithCompanies}
          setComp={setComp}
        />
        <InfiniteScroll
          dataLength={instructers.length}
          next={fetchMoreData}
          hasMore={totalResults !== instructers.length}
          loader={<Spinner />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {comp.length === 0 &&
              sortByItem === "" &&
              instructers.map((ins, idx) => {
                return <Interviewer_Card key={idx} instructer={ins} />;
              })}
            {comp.length !== 0 &&
              Object.keys(companyWiseInstructors).map((key) => {
                companyWiseInstructors[key].map((ins, idx) => {
                  return <Interviewer_Card key={idx} instructer={ins} />;
                });
              })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Mock_Interview_Comp;
