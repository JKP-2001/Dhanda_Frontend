import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { scrollToTop } from "../Utils/functions";
import heroHeader from "../Utils/Images/hero-header.png";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import AchieveGoal from "../Components/HomeComponents/AchieveGoal";
import TrustUs from "../Components/HomeComponents/TrustUs";
import OpenWindow from "../Components/HomeComponents/OpenWindow";
import Service from "../Components/OurServices/Service";
import Accordion from "../Components/Faq/Accordion";
import Footer from "../Components/Footer/Footer";
import Portfolio from "../Components/TopCreators/Portfolio";
import SideNav from "../Components/SideNav";
import { useSelector } from "react-redux";

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const userRedux = useSelector((state) => state.user);

  return (
    <div className="bg-[#f0f4f9] min-h-screen pb-14">
      <Nav type={"home"}/>
      <div className="main-container w-full flex items-center justify-center flex-col ">
        <div className="hero flex flex-col lg:flex-row  items-center justify-between w-[100%] gap-4 py-4  lg:pt-12  lg:w-[80%] pt-12">
          <div className="left-hero flex flex-col gap-3 lg:w-[60%]">
            <div className="quote text-center lg:text-left font-roboto text-[#002147] text-2xl font-bold">
              Become Master
            </div>
            <div className="heading text-center lg:text-left font-custom font-bold text-4xl lg:text-5xl text-[#002147] leading-[40px] lg:leading-[54px]">
              Start your internship and placement preperation journey with us
            </div>
            {/* <div className="btn justify-center lg:justify-start flex flex-row gap-3 items-center mt-8">
              <Button
                onClick={() => navigate("/signin")}
                className={` h-[41px] font-roboto font-bold rounded-md text-white  border-[2px] bg-btn-col text-center `}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  navigate("/explore");
                }}
                className={`h-[41px] font-roboto font-bold rounded-md text-white  border-[2px] bg-btn-col text-center `}
              >
                Explore
              </Button>
            </div> */}
          </div>
          <div className="right-hero w-[100%] lg:w-[40%]">
            <div>
              <img
                className="lg:h-[500px] lg:w-auto w-[90%] mx-auto"
                src={heroHeader}
                alt="Hero-Header"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <AchieveGoal />
      </div>
      <div>
        <TrustUs />
      </div>
      <div>
        <Portfolio />
      </div>
      <div>
        <Service />
      </div>
      <div>
        <Accordion />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
