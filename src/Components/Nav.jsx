import React, { useState, useEffect } from "react";
import { Navbar, Collapse, Typography, IconButton, Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { HiOutlineHome } from "react-icons/hi2";
import { SlPeople } from "react-icons/sl";
import { CiSquarePlus } from "react-icons/ci";

const Avatar = (props) => {

  const navigate = useNavigate();
  const {setIcon,icon} = props;
  return (


    <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className={`mt-1 w-8 h-8 rounded-full cursor-pointer ${icon==="avatar"?"border-2 border-blue-400":""}`} src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User dropdown" onClick={() => {navigate("/user/profile/:user");setIcon("avatar")}} />



  )
}





const Nav = () => {

  const [icon, setIcon] = useState("home");

  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    const url = window.location.pathname;

    if (url.toLowerCase().includes("new-feeds")) {
      setIcon("explore");
    }

    if (url.toLowerCase().includes("mock")) {
      setIcon("mock");
    }

    if (url.toLowerCase().includes("profile")) {
      setIcon("avatar");
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };

    
    
  }, []);

  const [loggedSignIn, setLoggedSignIn] = useState(true);



  const navigate = useNavigate();

  return (
    <>
      {/* <motion.div style={{ scaleX: scrollYProgress }} className='fixed top-[64px] left-0 right-0 h-1 z-50 bg-blue-500 transform origin-left' /> */}

      <div className="sticky top-0 z-10 select-none">
        <div className="w-full mx-auto px-6 py-3 mt-0 bg-white shadow-lg ">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as={Link}
              to="/"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5"
            >
              LOGO
            </Typography>
            <div className="hidden lg:block">
              <div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
                {["Explore", "New-Feeds", "Mock-Interview", "Problems", "Discuss"].map((item, index) => (

                  <Typography
                    key={index}
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium"
                  >
                    <Link to={`/${item.toLowerCase()}`} className={`${window.location.pathname.includes(item.toLowerCase()) ? "text-blue-500" : ""} flex items-center hover:text-blue-500 transition-colors font-inter font-bold`}>
                      {item}
                    </Link>
                  </Typography>
                ))}
                {loggedSignIn ? <Avatar setIcon={setIcon} icon={icon}/> : <>
                  <Link to="/signin" className="">
                    <Button variant="outlined" size="sm" className="lg:inline-block">
                      <span>Sign In</span>
                    </Button>
                  </Link>
                  <Button variant="gradient" size="sm" className={`${window.location.pathname.includes("/signup") ? 'bg-blue-800' : ""}lg:inline-block`} onClick={() => navigate("/signup")}>
                    <span>Sign up</span>
                  </Button></>}
              </div>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>

          </div>
          <Collapse open={openNav}>
            <div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
              {["Problems", "Discuss"].map((item, index) => (

                <Typography
                  key={index}
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="p-1 font-medium"
                >
                  <Link to={`/${item.toLowerCase()}`} className={`${window.location.pathname.includes(item.toLowerCase()) ? "text-blue-500" : ""} flex items-center hover:text-blue-500 transition-colors font-inter font-bold`}>
                    {item}
                  </Link>
                </Typography>
              ))}
              <Button variant="outlined" size="sm" className="lg:inline-block" onClick={() => navigate("/signin")}>
                <span>Sign In</span>
              </Button>
              <Button variant="gradient" size="sm" className="lg:inline-block" onClick={() => navigate("/signup")}>
                <span>Sign up</span>
              </Button>
            </div>
          </Collapse>
        </div>
      </div>




      <div className="lg:hidden border-t-[1px] border-gray-800 overflow-hidden fixed bottom-0 left-0 right-0 z-10 bg-white px-6 py-2 shadow-lg">
        

          <div className="flex flex-wrap space-x-9 sm:space-x-24 justify-between bg-white">
            <HiOutlineHome fontSize={30} className={`${icon==='explore'?"text-blue-800":""} hover:cursor-pointer mt-1`} onClick={()=>{setIcon("explore");navigate("/new-feeds")}}/>
            <SlPeople fontSize={27} className={`${icon==='mock'?"text-blue-800":""} hover:cursor-pointer mt-1`} onClick={()=>{setIcon("mock");navigate("/mock-interview")}}/>
            <CiSquarePlus fontSize={30} className={`${icon==='new'?"text-blue-800":""}  hover:cursor-pointer mt-1`} onClick={()=>setIcon("new")}/>
            <Avatar setIcon={setIcon} icon={icon}/>

          </div>

        
      </div>


    </>
  );
};

export default Nav;
