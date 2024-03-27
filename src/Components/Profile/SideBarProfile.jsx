import React, { useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import RingVolumeOutlinedIcon from '@mui/icons-material/RingVolumeOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import logo from "../../Utils/Images/logo.png";
import { Link } from 'react-router-dom';


const SideBarItem = ({ icon, title, active, setActive }) => {
    return (
        <li >
            <div class={`hover:cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${active?"bg-gray-200":"hover:bg-gray-200"} group`} onClick={()=> setActive(title)}>
                {icon}
                <span class="ms-3 font-inter font-semibold">{title}</span>
            </div>
        </li>
    )
}


const SideBarProfile = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const [active, setActive] = useState("Profile");


    if(isOpen){
        document.body.style.overflow = 'hidden';
    }
    else{
        document.body.style.overflow = 'auto';
    }

    

    return (

        <>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 
            dark:focus:ring-gray-600" onClick={toggleSidebar}>
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className={`fixed top-0  left-0 z-50 md:z-20 w-[70%] md:w-60 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
                        <SideBarItem icon={<OtherHousesOutlinedIcon />} title="Home" active={active==="Home"} setActive={setActive}/>
                        <SideBarItem icon={<Groups2OutlinedIcon />} title="Interview" active={active==="Interview"} setActive={setActive}/>
                        <SideBarItem icon={<AssignmentIndOutlinedIcon />} title="Profile" active={active==="Profile"} setActive={setActive}/>
                        <SideBarItem icon={<CalendarMonthOutlinedIcon />} title="Calendar" active={active==="Calendar"} setActive={setActive}/>
                        <SideBarItem icon={<GridOnOutlinedIcon />} title="Post" active={active==="Post"} setActive={setActive}/>
                        <SideBarItem icon={<BookmarkBorderOutlinedIcon />} title="Bookmarked Post" active={active==="Bookmarked Post"} setActive={setActive}/>
                        <SideBarItem icon={<RingVolumeOutlinedIcon />} title="Bookings" active={active==="Bookings"} setActive={setActive}/>
                        <SideBarItem icon={<NoteOutlinedIcon />} title="Priority DM" active={active==="Priority DM"} setActive={setActive}/>
                        <SideBarItem icon={<AccountBalanceWalletOutlinedIcon />} title="Payment" active={active==="Payment"} setActive={setActive}/>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBarProfile