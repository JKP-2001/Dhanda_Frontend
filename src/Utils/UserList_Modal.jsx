import React, { useState } from 'react';
import Small_Profile_Card from '../Components/New_Feeds/Small_Profile_Card';
import { IoMdClose } from 'react-icons/io';

const UserList_Modal = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleClose = props.handleClose;
    const heading = props.heading;

    const users = [
        { name: "Emma Smith", username: "emma_smith123" },
        { name: "Liam Johnson", username: "liam_j" },
        { name: "Olivia Davis", username: "olivia_d" },
        { name: "Noah Wilson", username: "noah_wilson" },
        { name: "Ava Brown", username: "ava_brown" },
        { name: "Isabella Turner", username: "isabella_t" },
        { name: "Sophia Miller", username: "sophia_m" },
        { name: "Jackson Lee", username: "jackson_lee789" },
        { name: "Lucas Martin", username: "lucas_martin" },
        { name: "Madison Taylor", username: "madison_t" },
        { name: "Aiden Thomas", username: "aiden_thomas" },
        { name: "Oliver Wilson", username: "oliver_w" },
        { name: "Amelia Johnson", username: "amelia_j" },
        { name: "Elijah Davis", username: "elijah_d" },
        { name: "Harper Smith", username: "harper_smith" },
        { name: "Charlotte Turner", username: "charlotte_t" },
        { name: "Mia Brown", username: "mia_brown" },
        { name: "Ethan Lee", username: "jkp_6957" },
    ];

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20 px-2">

            <div className="block w-[96%] lg:w-[40%] max-w-lg pb-2 pt-0 z-20 bg-white border border-gray-200 rounded-lg shadow h-[400px] ">

                <div className='sticky top-0 bg-white z-10'>
                    <div className='flex justify-between'>
                        <h5 className="mb-2 text-2xl font-inter font-semibold tracking-tight text-gray-900 dark:text-white ml-2 pt-2">{heading}</h5>
                        <IoMdClose fontSize={25} className='mt-3 mr-2 hover:cursor-pointer' onClick={handleClose} />
                    </div>
                    <hr className='border-[1px] border-gray-400' />
                </div>

                <div className='flex items-center px-2 pt-2 pb-6 b-2 border-gray-600'>
                    <input
                        type="text"
                        placeholder="Search users"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-200 focus:border-blue-500 font-inter font-semibold"
                    />
                </div>

                <div className='overflow-y-scroll h-[285px] -mt-4'>
                    {filteredUsers.length === 0 ? (
                        <p className="text-center font-inter font-base text-gray-500 mt-2">No results found</p>
                    ) : (
                        filteredUsers.map((item, id) => (
                            <Small_Profile_Card key={id} name={item.name} username={item.username} />
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default UserList_Modal;
