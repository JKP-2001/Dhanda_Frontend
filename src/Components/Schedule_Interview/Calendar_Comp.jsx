import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import showToast from '../../Utils/showToast';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchUserStart, getSearchUserSuccess } from '../../Redux/searchUser/searchUser';
import { getUserDataById } from '../../APIs/User_API';
import axios from 'axios';
import RenderRazorpay from './RenderRazorpay';
import { Spinner } from '@material-tailwind/react';

const localizer = momentLocalizer(moment);

const shouldDisableDate = (date) => {
    const today = new Date();
    // Return true if the date is before today
    return date < today;
};

// Custom date cell wrapper to style disabled dates
const CustomDateCellWrapper = ({ children, value }) => {
    const dateIsDisabled = shouldDisableDate(value);
    const className = dateIsDisabled ? 'rbc-off-range-bg' : '';
    return React.cloneElement(React.Children.only(children), {
        className: `${children.props.className} ${className}`
    });
};

const preFilledEvents = [
    {
        title: 'Mock Interview with User1',
        start: new Date(2024, 0, 14, 10, 0),
        end: new Date(2024, 0, 14, 11, 0),
    },
    // Add more events as needed
];

const Calendar_Comp = () => {
    const [selectedDate, setSelectedDate] = useState(moment().toDate());
    const [selectedTime, setSelectedTime] = useState(null);
    const [events, setEvents] = useState(preFilledEvents);
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const [bookLoading, setBookLoading] = useState(false);

    const [displayRazorpay, setDisplayRazorpay] = useState(false);

    const [orderDetails, setOrderDetails] = useState(null);

    const [generatingLink, setGeneratingLink] = useState(false);

    const params = useParams();

    const [meetingDetails, setMeetingDetails] = useState(null);


    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const tileDisabled = ({ activeStartDate, date, view }) => {
        return date < new Date()
    }

    const userRedux = useSelector(state => state.user);

    const instructorId = params.user;

    const handleCreateOrder = async (amount, currency) => {



        if (selectedTime === null) {
            showToast({
                type: 'error',
                msg: 'Please select a time slot',
                duration: 4000
            });
            return
        }

        setBookLoading(true);
        let response = await axios.post(BASE_URL + '/transactions/generate-order-id',
            {
                amount: amount * 100,
                currency: currency,
                instructorId: instructorId,
                studentId: userRedux.data._id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': process.env.REACT_APP_SECURITY_KEY,
                    'auth-token': localStorage.getItem('token')
                }
            }
        );

        setBookLoading(false);

        response = response.data;


        if (response.success && response.data.id) {
            setOrderDetails(response.data);
            setDisplayRazorpay(true);

            console.log({ displayRazorpay });
        };
    };



    // const params = useParams();


    const searchUserRedux = useSelector((state) => state.searchUser);

    const dispatch = useDispatch();


    const getTheUserData = async () => {

        const token = localStorage.getItem("token");

        const role = 'instructor';
        const id = params.user;

        dispatch(getSearchUserStart());

        const userData = await getUserDataById(role, id);

        if (userData.success === false) {

            showToast({
                msg: userData.msg,
                type: 'error',
                duration: 3000,
            });

        } else {
            dispatch(getSearchUserSuccess(userData.data));
        }
    }

    // fetch user data on loading page

    useEffect(() => {
        getTheUserData();
    }, []);

    const timeSlots = useMemo(() => {
        const defaultTimeSlots = [
            '08:00', '09:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
        ];

        if (selectedDate) {
            const selectedDateSlots = events
                .filter((event) => moment(event.start).isSame(selectedDate, 'day'))
                .map((event) => moment(event.start).format('HH:mm'));

            return defaultTimeSlots.filter((slot) => !selectedDateSlots.includes(slot));
        }

        return defaultTimeSlots;
    }, [selectedDate, events]);

    const handleDateClick = ({ start }) => {
        if (shouldDisableDate(start)) {
            showToast({
                type: 'error',
                msg: 'Past dates are not allowed',
                duration: 4000
            });

            return;
        }
        setSelectedDate(start);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleAddMeeting = () => {
        if (selectedDate && selectedTime) {
            const isSlotAlreadyScheduled = events.some((event) => {
                const eventStartTime = moment(event.start);
                const selectedStartTime = moment(selectedDate).set({
                    hour: parseInt(selectedTime.split(':')[0], 10),
                    minute: parseInt(selectedTime.split(':')[1], 10),
                });

                return eventStartTime.isSame(selectedStartTime);
            });

            if (isSlotAlreadyScheduled) {
                showToast({
                    type: 'error',
                    msg: 'Slot already scheduled',
                    duration: 4000
                });
            } else {



                const startHour = parseInt(selectedTime.split(':')[0], 10);
                const startMinute = parseInt(selectedTime.split(':')[1], 10);

                const startDate = new Date(selectedDate);
                startDate.setHours(startHour);
                startDate.setMinutes(startMinute);

                const endDate = new Date(startDate);
                endDate.setHours(startHour + 1);

                const newEvent = {
                    title: `Mock Interview with ${searchUserRedux.data.firstName + " " + searchUserRedux.data.lastName}`,
                    start: startDate,
                    end: endDate,
                };

                setEvents([...events, newEvent]);
                setError(null);
                showToast({
                    type: 'success',
                    msg: 'Slot added successfully. Please check your calendar.',
                    duration: 3000
                });

                setSelectedTime(null);
                handleEventClick(newEvent);
            }
        } else {
            showToast({
                type: 'error',
                msg: 'Please select Date and Time.',
                duration: 3000
            });
        }
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);
        setShowModal(false);
        document.body.style.overflow = 'auto'; // Enable scrolling when the modal is closed
    };

    return (

        displayRazorpay ?
            <RenderRazorpay
                order={orderDetails}
                keyId={process.env.REACT_APP_RAZORPAY_KEY_ID}
                keySecret={process.env.REACT_APP_RAZORPAY_KEY_SECRET}
                setDisplayRazorpay={setDisplayRazorpay}
                handleAddMeeting={handleAddMeeting}
                instructorId={instructorId}
                studentId={userRedux.data._id}
                setGeneratingLink={setGeneratingLink}
                setMeetingDetails={setMeetingDetails}
            />
            :

            generatingLink ?
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">
                        <div className='flex justify-center  font-inter text-base md:text-2xl space-x-3'>
                            <Spinner color='blue' size='large'  className='mt-1'/>
                            <div>
                                <div className='font-handwritten2 text-base  ml-2 mt-[1px] md:-mt-1'>Generating Meet Link.</div>
                                <div className='font-handwritten2 text-base  ml-2 mt-[1px] md:-mt-1'>Please don't refresh the page.
                                </div></div>
                        </div>
                    </div>
                </div>
                :


                searchUserRedux.data ? <div className='my-3'>
                    <div className="w-full p-4  text-center">
                        <h1 className="text-xl font-inter font-bold">
                            Select time slot for interview with {searchUserRedux.data.firstName + " " + searchUserRedux.data.lastName}
                        </h1>
                    </div>
                    <div className="flex flex-wrap-reverse md:justify-between">
                        {showCalendar && (
                            <div className="md:w-3/4 p-4 overflow-y-hidden">
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: `550px` }}
                                    selectable
                                    onSelectSlot={handleDateClick}
                                    onSelectEvent={handleEventClick}
                                    className='bg-white rounded-lg shadow-md font-inter font-semibold'
                                    components={{
                                        dateCellWrapper: CustomDateCellWrapper,
                                    }}
                                />
                            </div>
                        )}

                        <div className="w-full md:w-1/4 p-4 rounded">
                            <h2 className="text-lg font-inter font-semibold mb-4">Select Time Slot</h2>

                            <div className="date">
                                <div className='text-sm font-inter font-semibold my-1'> Selected Date</div>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={moment().toDate()}
                                    className="mb-2 p-2 font-inter font-semibold border border-gray-300 rounded-xl w-3/4"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeClick(time)}
                                        className={`p-2   border-[1.5px] border-blue-gray-100 rounded-xl font-inter font-semibold hover:text-white hover:bg-blue-700 focus:outline-none cursor-pointer transition-colors duration-300 ease-in-out ${selectedTime === time ? 'bg-blue-800 text-white' : 'border-blue-400 text-blue-400'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handleCreateOrder(1000, 'INR')}
                                className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out font-inter font-semibold"
                            >
                                {bookLoading ?
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-t-white rounded-full animate-spin"></div>
                                        <span className="ml-2">Booking...
                                        </span>
                                    </div>
                                    :
                                    "Book Schedule"}
                            </button>
                        </div>

                        {selectedEvent && showModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">


                                <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">
                                    <h2 className="text-xl md:text-2xl font-inter font-bold mb-4">Interview Details</h2>

                                    <p className='text-sm md:text-base font-inter font-semibold text-gray-700'>Title: {selectedEvent.title}</p>
                                    <p className='text-sm md:text-base font-inter font-semibold text-gray-700'>Starts At: {moment(selectedEvent.start).format('DD-MM-YYYY HH:mm')}</p>
                                    <p className='text-sm md:text-base font-inter font-semibold text-gray-700'>Ends At: {moment(selectedEvent.end).format('DD-MM-YYYY HH:mm')}</p>

                                    <p className='text-sm md:text-base font-inter mb-4 font-semibold text-gray-700'>Interview Link: <a className='underline underline-offset-1 text-blue-800' href={meetingDetails?meetingDetails.meeting_url:""} target="_blank" rel="noopener noreferrer">Meet Link</a></p>

                                    <div className="flex justify-end">
                                        <button onClick={handleClosePopup} className="mt-2 text-sm md:text-base bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out font-inter font-semibold">
                                            Close
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div> : null
    );
};

export default Calendar_Comp;
