import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import showToast from '../../Utils/showToast';

const localizer = momentLocalizer(moment);

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

    const params = useParams();
    const user = params.user;

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
                    duration: 3000
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
                    title: `Mock Interview with ${user}`,
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
        <div className='my-3'>
            <div className="w-full p-4  text-center">
                <h1 className="text-xl font-inter font-bold">
                    Select time slot for interview with {user}
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
                        onClick={handleAddMeeting}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out font-inter font-semibold"
                    >
                        Add Meeting
                    </button>
                </div>

                {selectedEvent && showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">


                        <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">
                            <h2 className="text-2xl font-inter font-bold mb-4">Interview Details</h2>
                            
                            <p className='font-inter font-semibold text-gray-700'>Title: {selectedEvent.title}</p>
                            <p className='font-inter font-semibold text-gray-700'>Starts At: {moment(selectedEvent.start).format('DD-MM-YYYY HH:mm')}</p>
                            <p className='font-inter font-semibold text-gray-700'>Ends At: {moment(selectedEvent.end).format('DD-MM-YYYY HH:mm')}</p>

                            <p className='font-inter mb-4 font-semibold text-gray-700'>Interview Link: <a className='underline underline-offset-1 text-blue-800' href={"www.google.com"} target="_blank" rel="noopener noreferrer">Meet Link</a></p>

                            <div className="flex justify-end">
                                <button onClick={handleClosePopup} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out font-inter font-semibold">
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar_Comp;
