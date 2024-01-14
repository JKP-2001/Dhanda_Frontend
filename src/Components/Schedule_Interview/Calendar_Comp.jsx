import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const preFilledEvents = [
    {
        title: 'Mock Interview with User1',
        start: new Date(2024, 0, 14, 10, 0), // Example date and time
        end: new Date(2024, 0, 14, 11, 0), // Example date and time
    },
    // Add more events as needed
];

const Calendar_Comp = () => {
    const [selectedDate, setSelectedDate] = useState(moment().toDate());
    const [selectedTime, setSelectedTime] = useState(null);
    const [events, setEvents] = useState(preFilledEvents); // Initialize with pre-filled events
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const params = useParams();
    const user = params.user;

    const timeSlots = useMemo(() => {
        const defaultTimeSlots = [
            '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
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
        // Show the modal when an event is clicked
        setShowModal(true);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleAddMeeting = () => {
        if (selectedDate && selectedTime) {
            // Check if the selected date and time already exist in events
            const isSlotAlreadyScheduled = events.some((event) => {
                const eventStartTime = moment(event.start);
                const selectedStartTime = moment(selectedDate).set({
                    hour: parseInt(selectedTime.split(':')[0], 10),
                    minute: parseInt(selectedTime.split(':')[1], 10),
                });

                return eventStartTime.isSame(selectedStartTime);
            });

            if (isSlotAlreadyScheduled) {
                setError('Slot already scheduled');
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
            }
        }
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);
        // Close the modal
        setShowModal(false);
    };

    return (
        <div className='my-3'>
            <div className="w-full p-4 bg-gray-100 text-center">
                <h1 className="text-xl font-roboto">
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
                        />
                    </div>
                )}

                <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded">
                    <h2 className="text-lg font-semibold mb-4">Select Time Slot</h2>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <div className="date">
                        <div className='text-sm font-roboto font-no'> Selected Date</div>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => handleTimeClick(time)}
                                className={`p-2 border border-gray-300 rounded hover:bg-blue-100 focus:outline-none cursor-pointer transition-colors duration-300 ease-in-out ${selectedTime === time ? 'bg-blue-500 text-white' : ''
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleAddMeeting}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out"
                    >
                        Add Meeting
                    </button>
                </div>

                {selectedEvent && showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <div className="bg-white p-4 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full">
                            <h2 className="text-lg font-roboto mb-4">Interview Details</h2>
                            <p className='font-roboto'>Title: {selectedEvent.title}</p>
                            <p className='font-roboto'>Start Time: {moment(selectedEvent.start).format('DD-MM-YYYY HH:mm')}</p>
                            <p className='font-roboto'>End Time: {moment(selectedEvent.end).format('DD-MM-YYYY HH:mm')}</p>

                            <p className='font-roboto'>Interview Link: <a className='underline underline-offset-1 text-blue-800' href={"www.google.com"} target="_blank" rel="noopener noreferrer">Meet Link</a></p>

                            <button onClick={handleClosePopup} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar_Comp;
