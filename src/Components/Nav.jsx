import React, { useState, useEffect } from "react";
import { Navbar, Collapse, Typography, IconButton, Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // Import Link from react-router-dom




const NavList = () => (
  <div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
    {["Explore", "Mock-Interview", "Problems", "Discuss"].map((item, index) => (
      
      <Typography
        key={index}
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to={`/${item.toLowerCase()}`} className={`${window.location.pathname.includes(item.toLowerCase())?"text-blue-500":""} flex items-center hover:text-blue-500 transition-colors font-inter font-bold`}>
          {item}
        </Link>
      </Typography>
    ))}
    <Button variant="text" size="sm" className="lg:inline-block">
      <span>Log In</span>
    </Button>
    <Button variant="gradient" size="sm" className="lg:inline-block">
      <span>Sign up</span>
    </Button>
  </div>
);


const Nav = () => {

  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  


  


  

  return (
      <>
      {/* <motion.div style={{ scaleX: scrollYProgress }} className='fixed top-[64px] left-0 right-0 h-1 z-50 bg-blue-500 transform origin-left' /> */}

      <div className="sticky top-0 z-10">
        <Navbar className="mx-auto max-w-screen-xl px-6 py-3 mt-2 w-full bg-white shadow-lg ">
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
              <NavList />
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
            <NavList />
          </Collapse>
        </Navbar>
      </div>
      </>
  );
};

export default Nav;
