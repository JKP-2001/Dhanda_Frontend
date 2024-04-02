import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateTimeSlots } from '../../APIs/User_API';
import showToast from '../../Utils/showToast';

// int HH::MM format
const hours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const TimeSlots = () => {
    const [day, setDay] = useState("monday");

    const userRedux = useSelector((state) => state.user);



    const [data, setData] = useState(userRedux.data?userRedux.data.availableTimeslots:{monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []});

    

    // const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const [filteredHours, setFilteredHours] = useState("");

    

    

    const [loading, setLoading] = useState(false);

    const handleAdd = (time)=>{
        // sort tha data after adding

        setData(prevData => ({
            ...prevData,
            [day]: [...prevData[day], time].sort((a, b) => {
                const [h1, m1] = a.split(':').map(Number);
                const [h2, m2] = b.split(':').map(Number);
                return h1 - h2 || m1 - m2;
        })}));

        // sort filtered hours after adding

        setFilteredHours(prevHours => prevHours.filter(hour => hour !== time).sort((a, b) => {
            const [h1, m1] = a.split(':').map(Number);
            const [h2, m2] = b.split(':').map(Number);
            return h1 - h2 || m1 - m2;
        }))

    }

    const handleRemove = (time)=>{
        // sort data after removing

        setData(prevData => ({
            ...prevData,
            [day]: prevData[day].filter(hour => hour !== time).sort((a, b) => {
                const [h1, m1] = a.split(':').map(Number);
                const [h2, m2] = b.split(':').map(Number);
                return h1 - h2 || m1 - m2;
            })
        }))

        // sort filtered hours after adding

        setFilteredHours(prevHours => [...prevHours, time].sort((a, b) => {
            const [h1, m1] = a.split(':').map(Number);
            const [h2, m2] = b.split(':').map(Number);
            return h1 - h2 || m1 - m2;
        }))
    }


    const handleSave = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000
            });
            return;
        }

        if(userRedux.data && userRedux.data.role === "instructor"){
            setLoading(true);
            const response = await updateTimeSlots(data, token);

            if(response.success){
                showToast({
                    msg: 'Time Slots Updated Successfully',
                    type: 'success',
                    duration: 3000
                });
                setLoading(false);
            }else{
                showToast({
                    msg: response.msg,
                    type: 'error',
                    duration: 3000
                });
                setLoading(false);
            }
        }
        else{
            showToast({
                msg: 'Only Instructor can update time slots',
                type: 'error',
                duration: 3000
            });
        }
    }

    const handleClick = (e) => {
        setDay(e.target.value);
        setFilteredHours(hours.filter(hour => !data[e.target.value].includes(hour)));
    };

    useEffect(() => {
        if(userRedux.data && userRedux.data.role === "instructor"){
            setData(userRedux.data.availableTimeslots);
            setFilteredHours(hours.filter(hour => !userRedux.data.availableTimeslots["monday"].includes(hour)));
        }
    },[userRedux.data]);

    return (
        <div className=" font-inter text-xl">
            <div className="mx-auto mt-2 md:mt-5 max-w-screen-lg ">
                <div className="">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl mt-10 sm:mt-16">Time Slots</p>
                    <p className="flex-1 ml-4 font-bold text-sm mt-1 sm:mt-2 text-red-400">(Please select your available time slots for each day, so that student can book your time slot)</p>
                </div>
                <div className="flex items-center mx-3 mt-5 ">
                    <select
                        name=""
                        className="sm:mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm font-inter text-blue-700 font-semibold"
                        value={day}
                        onChange={handleClick}
                    >
                        {days.map((day, index) => (
                            <option className="whitespace-no-wrap text-xs font-inter" value={day} key={index}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end mt-2 mr-8">
                    <p className='font-inter text-xs font-semibold text-blue-800'> *Click on a timeslot to select or deselect</p>
                </div>

                <div>
                    <p className="flex-1 ml-3 font-bold mt-10 sm:mt-10 text-blue-700 underline underline-offset-4">Selected Time Slots</p>
                </div>

                {data[day].length === 0 ? 
                
                <p className="flex-1 ml-3 font-bold text-gray-900 text-center text-sm justify-center mt-10 sm:mt-5">{!userRedux.data?"Loading....":"No time slots selected"}</p> 
                : 

                <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 space-x-3 space-y-2 mr-2">
                    <div className='hidden'></div>
                    {data[day].map((time) => (
                        <button
                            key={time}
                            className={` p-2 border-[1.5px] bg-white border-blue-400  rounded-xl font-inter font-semibold hover:text-white hover:bg-blue-700 focus:outline-none cursor-pointer transition-colors duration-300 ease-in-out hover:border-blue-400 focus:border-blue-400 text-blue-400 text-sm sm:text-xl'}`}
                            onClick={() => handleRemove(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>}

                <div className="flex justify-center sm:justify-end">
                    <button
                        className="bg-blue-500  text-white font-bold py-2 px-4 rounded-lg text-sm  mt-5 mr-3 focus:outline-none cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700 w-11/12 sm:w-auto mx-4"
                        onClick={handleSave}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>

                <div>
                    <p className="flex-1 ml-3 font-bold mt-10 sm:mt-10 text-blue-700 underline underline-offset-4">Available Time Slots</p>
                </div>

                {filteredHours.length === 0 ? <p className="flex-1 ml-3 font-bold text-gray-900 text-center text-sm justify-center mt-10 sm:mt-5">{!userRedux.data?"Loading....":"No time slots available"}</p> : <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 space-x-3 space-y-2 mr-2">
                    <div className='hidden'></div>
                    {filteredHours.map((time) => (
                        <button
                            key={time}
                            className={` p-2 border-[1.5px] bg-white border-blue-400  rounded-xl font-inter font-semibold hover:text-white hover:bg-blue-700 focus:outline-none cursor-pointer transition-colors duration-300 ease-in-out hover:border-blue-400 focus:border-blue-400 text-blue-400 text-sm sm:text-xl'}`}
                            onClick={()=>handleAdd(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>}


            </div>
        </div>
    );
};

export default TimeSlots;
