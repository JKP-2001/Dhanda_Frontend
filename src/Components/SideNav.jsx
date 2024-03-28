import React, { useEffect, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import SettingsPowerOutlinedIcon from '@mui/icons-material/SettingsPowerOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import logo from "../Utils/Images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logOut } from '../APIs/Auth_API';
import showToast from '../Utils/showToast';
import { useDispatch, useSelector } from 'react-redux';
import userimg from "../Utils/Images/user2.jpg"
import { getUserSuccess } from '../Redux/user/userSlice';


const SideBarItem = ({ icon, title, active, setActive, link }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
        setActive(title);
    }

    return (
        <li >
            <div class={`hover:cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${active ? "bg-gray-300" : "hover:bg-gray-200"} group`} onClick={handleClick}>
                {icon}
                <span class="ms-3 font-inter font-semibold">{title}</span>
            </div>
        </li>
    )
}

const Avatar = (props) => {
    const navigate = useNavigate();
    const { setIcon, icon } = props;

    const userRedux = useSelector((state) => state.user);

    return (

        userRedux.data &&

        <img id="avatarButton " type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className={`hover:scale-110 mt-1 w-8 h-8 rounded-full cursor-pointer ${icon === "avatar" ? "border-2 border-blue-400" : ""}`} src={userimg} alt="User dropdown" onClick={() => { navigate(`/user/profile/${userRedux.data.role}/${userRedux.data._id}`); setIcon("avatar") }} />



    )
}


const SideNav = (props) => {

    const {schedule} = props;

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const [active, setActive] = useState();
    const loggedSignIn = localStorage.getItem("token") ? true : false;

    const navigate = useNavigate();
    // const { setIcon, icon } = props;

    const userRedux = useSelector((state) => state.user);


    if (isOpen) {
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = 'auto';
    }

    const dispatch = useDispatch();

    const handleLogout = async () => {
        const authToken = Cookies.get("authToken");

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
        dispatch(getUserSuccess(null));
        navigate("/signin");
    };

    useEffect(() => {
        const url = window.location.pathname;

        if (url.toLowerCase().includes("new-feeds")) {
            setActive("New Feeds");
        }

        else if (url.toLowerCase().includes("mock")) {
            setActive("Interview");
        }

        else if (url.toLowerCase().includes("profile")) {
            setActive("Profile");
        }

        else if (url.toLowerCase().includes("signin")) {
            setActive("Signin");
        }
        
        else if (url.toLowerCase().includes("signup")) {
            setActive("Signup");
        }

    }, []);



    return (

         
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 
            dark:focus:ring-gray-600" className='hidden lg:block ' onClick={toggleSidebar}>
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className={`hidden md:block fixed top-0  left-0 z-50 md:z-20 w-[70%] md:w-60 xl:w-72 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0 border-2 border-gray-200`}
                aria-label="Sidebar"
            >
                <div class="h-full px-2 py-4 overflow-y-auto bg-white">
                    <div className="flex justify-between md:justify-center mb-5">

                        <Link to="/"> <img className="h-[55px] hover:cursor-pointer" src={logo} alt="Prepify" /></Link>
                        <div className='md:hidden'>
                            <CloseOutlinedIcon className="cursor-pointer" onClick={toggleSidebar} />
                        </div>
                    </div>
                    <hr className='my-2 border-[1px] mb-5 ' />
                    <ul class="space-y-3 font-medium">
                        <SideBarItem icon={<OtherHousesOutlinedIcon />} title="Home" active={active === "Home"} setActive={setActive} link={"/"} />
                        <SideBarItem icon={<AppsOutlinedIcon />} title="New Feeds" active={active === "New Feeds"} setActive={setActive} link={"/new-feeds"} />
                        <SideBarItem icon={<Groups2OutlinedIcon />} title="Interview" active={active === "Interview"} setActive={setActive} link={"/mock-interview"} />
                        {userRedux.data ? <SideBarItem icon={<AssignmentIndOutlinedIcon />} title="Profile" active={active === "Profile"} setActive={setActive} link={`/user/profile/${userRedux.data.role}/${userRedux.data._id}`} />:null}
                        <SideBarItem icon={<CalendarMonthOutlinedIcon />} title="Calendar" active={active === "Calendar"} setActive={setActive} />
                        <SideBarItem icon={<DialpadOutlinedIcon />} title="Contact Us" active={active === "Contact Us"} setActive=
                            {setActive} />

                        {loggedSignIn ? <li >
                            <div class={`hover:cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group`} onClick={handleLogout}>
                                {<SettingsPowerOutlinedIcon />}
                                <span class="ms-3 font-inter font-semibold">{"Logout"}</span>
                            </div>
                        </li> :
                            <>
                                <SideBarItem icon={<LockOpenOutlinedIcon />} title="Signin" active={active === "Signin"} setActive={setActive} link={"/signin"}/>
                                <SideBarItem icon={<AssignmentOutlinedIcon />} title="Signup" active={active === "Signup"} setActive={setActive} link={"/signup"}/>
                            </>
                        }

                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideNav