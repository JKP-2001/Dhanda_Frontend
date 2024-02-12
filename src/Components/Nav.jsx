import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom"; // Import Link from react-router-dom



import { HiOutlineHome } from "react-icons/hi2";
import { SlPeople } from "react-icons/sl";
import { CiSquarePlus } from "react-icons/ci";
import { FiLogIn } from "react-icons/fi";
import { LuPlusSquare } from "react-icons/lu";
import showToast from "../Utils/showToast";

import Cookies from "js-cookie";
import { logOut } from "../APIs/Auth_API";
import { useSelector } from "react-redux";

const Avatar = (props) => {

  const navigate = useNavigate();
  const { setIcon, icon } = props;

  const userRedux = useSelector((state) => state.user);


  return (

    userRedux.data && 

    <img id="avatarButton " type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className={`hover:scale-110 mt-1 w-8 h-8 rounded-full cursor-pointer ${icon === "avatar" ? "border-2 border-blue-400" : ""}`} src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User dropdown" onClick={() => { navigate(`/user/profile/${userRedux.data.role}/${userRedux.data._id}`); setIcon("avatar") }} />



  )
}





const Nav = () => {

  const [icon, setIcon] = useState("home");

  const [openNav, setOpenNav] = useState(false);
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

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

  const loggedSignIn = localStorage.getItem("token") ? true : false;

  const navigate = useNavigate();


  const handleLogout = async () => {

    const authToken = Cookies.get("authToken");

    console.log({ authToken });

    const security_key = process.env.REACT_APP_SECURITY_KEY;


    if (authToken) {
      const response = await logOut();

      Cookies.remove("authToken");
    }

    localStorage.removeItem("token");

    showToast({
      msg: "Logout Successful",
      type: "success",
      duration: 3000,
    });
    navigate("/signin");



  }




  return (
    <>


      <div className="sticky left-0 right-0 top-0 z-30 select-none bg-white shadow-sm w-full ">
        <div className=" mx-auto py-3 mt-0 w-[96%]  md:w-[80%] ">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as={Link}
              to="/"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5"
            >
              LOGO
            </Typography>
            <motion.div className="hidden lg:block">
              <div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
                {["Explore", "New-Feeds", "Mock-Interview", "Problems", "Discuss"].map((item, index) => (

                  <Typography
                    key={index}
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium "
                  >
                    <Link to={`/${item.toLowerCase()}`} className={`${window.location.pathname.includes(item.toLowerCase()) ? "text-blue-500 scale-[115%]" : "hover:scale-110"} flex items-center hover:text-blue-500 transition-colors font-inter font-bold`}>
                      {item}
                    </Link>
                  </Typography>
                ))}
                {loggedSignIn ? <><Avatar setIcon={setIcon} icon={icon} />
                  <Button variant="gradient" size="sm" className={`${window.location.pathname.includes("/signup") ? 'bg-blue-800' : ""}lg:inline-block hover:scale-110`} onClick={handleLogout}>
                    <span>Log out</span>
                  </Button>
                </>
                  : <>

                    <Button variant="outlined" size="sm" className="lg:inline-block hover:scale-110" onClick={() => navigate("/signin")}>
                      <span>Sign In</span>
                    </Button>
                    <Button variant="gradient" size="sm" className={`${window.location.pathname.includes("/signup") ? 'bg-blue-800' : ""}lg:inline-block hover:scale-110`} onClick={() => navigate("/signup")}>
                      <span>Sign up</span>
                    </Button>
                  </>}
              </div>
            </motion.div>
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
              {loggedSignIn ?
                <Button variant="outlined" size="sm" className="lg:inline-block" onClick={handleLogout}>
                  <span>Log Out</span>
                </Button>
                :
                <>
                  <Button variant="outlined" size="sm" className="lg:inline-block" onClick={() => navigate("/signin")}>
                    <span>Sign In</span>
                  </Button>
                  <Button variant="gradient" size="sm" className="lg:inline-block" onClick={() => navigate("/signup")}>
                    <span>Sign up</span>
                  </Button></>
              }
            </div>
          </Collapse>
        </div>
      </div>




      <div className="lg:hidden border-t-[2px] border-gray-300 overflow-hidden fixed bottom-0 left-0 right-0 z-10 bg-white px-6 py-2 shadow-2xl">


        <div className="flex flex-wrap space-x-9 sm:space-x-24 justify-between bg-white">
          <HiOutlineHome fontSize={30} className={`${icon === 'explore' ? "text-blue-800 scale-110" : ""} hover:cursor-pointer mt-1 `} onClick={() => { setIcon("explore"); navigate("/new-feeds") }} />
          <SlPeople fontSize={27} className={`${icon === 'mock' ? "text-blue-800 scale-110" : ""} hover:cursor-pointer mt-[5px]`} onClick={() => { setIcon("mock"); navigate("/mock-interview") }} />
          <LuPlusSquare fontSize={27} className={`${icon === 'new' ? "text-blue-800" : ""}  hover:cursor-pointer mt-[6px] scale-110`} onClick={() => setIcon("new")} />
          {loggedSignIn ? <Avatar setIcon={setIcon} icon={icon} /> :
            <FiLogIn fontSize={25} className={`  hover:cursor-pointer mt-[6px]`} onClick={() => navigate("/signin")} />}
        </div>


      </div>


    </>
  );
};

export default Nav;
