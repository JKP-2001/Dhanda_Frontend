import React from 'react'
import { useNavigate } from 'react-router-dom';

const Small_Profile_Card = () => {

    const navigate = useNavigate();

    return (
        <div className="flex justify-between space-x-14 mx-2 my-5">
            <div className="flex leftside space-x-2">
                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className={`w-12 h-12 rounded-full cursor-pointer`} src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User dropdown" onClick={() => { navigate("/user/profile/:user")}} />

                <div className=" mt-1">
                    <p className="text-sm font-bold font-inter">User Name</p>
                    <p className="text-sm text-gray-500 font-inter">User Email</p>
                </div>

            </div>
            <div className="followbutton">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl font-inter text-sm">
                    Follow
                </button>
            </div>
        </div>
    )
}

export default Small_Profile_Card