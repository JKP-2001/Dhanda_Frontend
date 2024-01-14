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

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {/* <motion.div style={{ scaleX: scrollYProgress }} className='fixed top-[64px] left-0 right-0 h-1 z-50 bg-blue-500 transform origin-left' /> */}

      <div className="sticky top-0 z-10 flex items-center justify-center bg-white shadow-md shadow-gray-20000">
        <div className="w-[80%]  py-3  ">
          <div className="flex items-center justify-between text-btn-col">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Typography
                as={Link}
                to="/"
                variant="h6"
                className="mr-4 cursor-pointer py-1.5"
              >
                LOGO
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              className="hidden lg:block"
            >
              <div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
                {["Explore", "Mock-Interview", "Problems", "Discuss"].map(
                  (item, index) => (
                    <Typography
                      key={index}
                      as="li"
                      variant="small"
                      className="p-1 font-medium text-btn-col"
                    >
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className={`${
                          window.location.pathname.includes(item.toLowerCase())
                            ? "text-blue-500"
                            : ""
                        } flex items-center hover:text-sec-col transition-colors font-inter font-bold`}
                      >
                        {item}
                      </Link>
                    </Typography>
                  )
                )}
                <Link to="/signin" className="">
                  <button
                    type="submit"
                    className="w-full hover:text-white hover:bg-btn-col  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-md text-sm px-4 border-btn-col py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold border-[2px] hover:scale-105 ease-in-out duration-300 cursor-pointer"
                  >
                    Sign in
                  </button>
                </Link>
                <Link to="/signup" className="">
                  <button
                    type="submit"
                    className="w-full hover:text-white hover:bg-btn-col  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-md text-sm px-4 border-btn-col py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 font-inter font-bold border-[2px] hover:scale-105 ease-in-out duration-300 cursor-pointer"
                  >
                    Sign up
                  </button>
                </Link>
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
              {["Explore", "Mock-Interview", "Problems", "Discuss"].map(
                (item, index) => (
                  <Typography
                    key={index}
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-medium"
                  >
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className={`${
                        window.location.pathname.includes(item.toLowerCase())
                          ? "text-blue-500"
                          : ""
                      } flex items-center hover:text-blue-500 transition-colors font-inter font-bold`}
                    >
                      {item}
                    </Link>
                  </Typography>
                )
              )}
              <Button
                variant="outlined"
                size="sm"
                className="lg:inline-block"
                onClick={() => navigate("/signin")}
              >
                <span>Sign In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="lg:inline-block"
                onClick={() => navigate("/signup")}
              >
                <span>Sign up</span>
              </Button>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default Nav;
