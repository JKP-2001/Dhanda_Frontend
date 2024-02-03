import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { scrollToTop } from "../Utils/functions";
import Editor from "../Utils/Editor";
import Post_Modal from "../Components/New_Feeds/Post_Modal";
import heroHeader from "../Utils/Images/hero-header.png";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#f0f4f9] min-h-screen">
      <Nav />
      <div className="main-container w-screen flex items-center justify-center flex-col">
        <div className="hero flex flex-col lg:flex-row  items-center justify-between w-[100%] gap-4 p-4 lg:pt-12  lg:w-[80%] pt-12">
          <div className="left-hero flex flex-col gap-3 lg:w-[60%]">
            <div className="quote text-center lg:text-left font-roboto text-[#002147] text-2xl font-bold">
              Become Master
            </div>
            <div className="heading text-center lg:text-left font-landing font-bold text-4xl lg:text-5xl text-[#002147] leading-[40px] lg:leading-[54px]">
              Start your internship and placement preperation journey with us
            </div>
            <div className="btn justify-center lg:justify-start flex flex-row gap-3 items-center mt-8">
              <Button
                onClick={() => navigate("/signin")}
                className={` h-[41px] font-roboto font-bold rounded-md text-white  border-[2px] bg-btn-col text-center `}
              >
                Sign In
              </Button>
              <Button
              onClick={()=>{navigate("/explore")}}
                className={`h-[41px] font-roboto font-bold rounded-md text-white  border-[2px] bg-btn-col text-center `}
              >

                Explore
              </Button>
            </div>
          </div>
          <div className="right-hero w-[100%] lg:w-[40%]">
            <div>
              <img className="lg:h-[600px] lg:w-auto w-[90%] mx-auto" src={heroHeader} alt="Hero-Header" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
