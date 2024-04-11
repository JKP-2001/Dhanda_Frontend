


import React, { useEffect, useState } from 'react';
import showToast from '../../Utils/showToast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookingFailure, bookingRequest, pastbookingSuccess, setTotalBookingPage, upbookingSuccess } from '../../Redux/bookings/bookingSlice';
import { fetchTransactions } from '../../APIs/Transaction_API';
import { scrollToTop } from '../../Utils/functions';
import { Spinner } from '@material-tailwind/react';

import jsPDF from 'jspdf';

import { getUserMeetings } from '../../APIs/Meeting_API';


const convertISOtoDate = (isoString) => {
    const date = new Date(isoString);
    // british format
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    return formattedDate;
}

const convertISOtoTime = (isoString) => {
    const date = new Date(isoString);
    // british format
    const formattedDate = date.toLocaleTimeString("en-GB", {
        hour: 'numeric',
        minute: 'numeric'
    });
    return formattedDate;
}

const EarningCard = (props) => {
    const { title, value } = props;

    return (
        <div className={`w-full transition-all duration-300 hover:scale-[101%] md:w-[95%] h-20  rounded-lg shadow-lg mt-4 ${title === "Balance" ? "bg-blue-200" : title === "Pending Balance" ? "bg-red-200" : "bg-purple-200"} hover:shadow-2xl hover:cursor-pointer`}>
            <div className="px-4 py-2">
                <div className="name">
                    <p className="text-lg font-semibold">{title}</p>
                </div>
                <div className="text-lg font-semibold">
                    {value}
                </div>
            </div>
        </div>
    )
}

const TransactionModal = (props) => {
    const { openTransactionModal, setOpenTransactionModal, selectedTransaction, userRole } = props;

    const downloadAsPDF = () => {
        const doc = new jsPDF();
        let yPos = 20;

        // Add title
        doc.setFontSize(20);
        doc.text('Transaction Details', 105, yPos, { align: 'center' });
        yPos += 20;

        // Add fields
        doc.setFontSize(12);

        doc.text(`Transaction Id: ${selectedTransaction.transaction_id._id}`, 20, yPos);
        yPos += 10;

        doc.text(`Invoice Number: ${selectedTransaction.transaction_id.invoice}`, 20, yPos);
        yPos += 10;



        if (userRole === "instructor") {
            doc.text(`Booked By: ${selectedTransaction.studentId.firstName} ${selectedTransaction.studentId.lastName} ( ${selectedTransaction.studentId.email})`, 20, yPos);
        } else {
            doc.text(`Paid to: ${selectedTransaction.instructorId.firstName} ${selectedTransaction.instructorId.lastName} ( ${selectedTransaction.instructorId.email})`, 20, yPos);
        }

        yPos += 10;


        doc.text(`booking Date: ${convertISOtoDate(selectedTransaction.transaction_id.confirmTimestamp)}`, 20, yPos);
        yPos += 10;

        doc.text(`booking Time: ${convertISOtoTime(selectedTransaction.transaction_id.confirmTimestamp)}`, 20, yPos);
        yPos += 10;

        doc.text(`booking Id: ${selectedTransaction.transaction_id.razorpaybookingId}`, 20, yPos);
        yPos += 10;

        doc.text(`Amount: ${parseInt(selectedTransaction.transaction_id.amount) / 100}`, 20, yPos);
        yPos += 10;

        doc.text(`Status: ${selectedTransaction.transaction_id.status}`, 20, yPos);
        yPos += 10;


        // Save the PDF
        doc.save(`Invoice #${selectedTransaction.transaction_id.invoice}.pdf`);
    };

    return (
        <div className={`fixed z-50 inset-0 overflow-y-auto ${openTransactionModal ? "block" : "hidden"}`}>
            <div className="flex items-center justify-center mt-32 md:mt-0 md:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-light-blue-100 to-pink-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="text-lg font-semibold text-gray-900 font-inter" id="modal-headline">
                                    Booking Details
                                </div>
                                <div className="mt-2 space-y-1">

                                    <p className="text-sm text-gray-700 font-inter">
                                        Booking Id: {selectedTransaction._id}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        Interview Date: {convertISOtoDate(selectedTransaction.calendarEvent.start)}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        Start Time: {convertISOtoTime(selectedTransaction.calendarEvent.start)}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        Duration: {selectedTransaction.duration} minutes
                                    </p>

                                    <p className='text-sm text-gray-700'>Interview Link: <a className='underline underline-offset-1 text-blue-800' href={selectedTransaction.meeting_link} target="_blank" rel="noopener noreferrer">Link</a></p>

                                    <p className="text-sm text-gray-700 font-inter">
                                        Transaction Id: {selectedTransaction.transaction_id._id}
                                    </p>
                                    <p className="text-sm text-gray-700 font-inter">
                                        Invoice Number: {selectedTransaction.transaction_id.invoice}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {userRole === "instructor" ?
                                            `Booked By: ${selectedTransaction.studentId.firstName} ${selectedTransaction.studentId.lastName}  ( ${selectedTransaction.studentId.email})` : `Paid to: ${selectedTransaction.instructorId.firstName} ${selectedTransaction.instructorId.lastName}  ( ${selectedTransaction.instructorId.email})`}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Booking Date: {convertISOtoDate(selectedTransaction.transaction_id.confirmTimestamp)}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Payment Id: {(selectedTransaction.transaction_id.razorpayPaymentId)}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Amount: ₹ {parseInt(selectedTransaction.transaction_id.amount) / 100}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Payment Status: {userRole === "instructor" ? selectedTransaction.transaction_id.bookingDoneToReceiver ? "Paid" : "Pending" : selectedTransaction.transaction_id.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => { setOpenTransactionModal(false); document.body.style.overflow = 'auto'; }}
                        >
                            Close
                        </button>
                        {/* <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={downloadAsPDF}
                        >
                            Download as PDF
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingCard = (props) => {
    const { title, invoice, studentName, amount, status, date, setOpenTransactionModal, setSelectedTransaction, booking, studentId, instructorName, instructorId, role, upcoming } = props;

    const openSelectedTransaction = () => {
        setSelectedTransaction(booking);
        setOpenTransactionModal(true);

        // stop scrolling
        if (openSelectedTransaction) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    const navigate = useNavigate();

    const clickOnPerson = () => {
        if (role === "student") {
            navigate(`/mock-interview/instructor/${instructorId}`);
        }
    }

    return (
        <>


            <div className="w-full p-4 my-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg hover:cursor-pointer hover:bg-blue-50 " onClick={openSelectedTransaction}>

                <div className="flex justify-between w-auto">
                    <div className="invoice font-inter text-lg md:text-xl font-semibold">
                        Booking <span className="invoice-number font-inter text-sm md:text-base text-gray-500">#{invoice}</span>
                    </div>

                    <div className="invoice font-inter text-lg md:text-xl font-semibold">
                    <span className={`items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${upcoming ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                            {upcoming ? "upcoming" : "completed"}
                        </span>
                    </div>

                </div>
                <hr className='w-[25%] md:w-[10%] mb-2 border-[1px] border-blue-700' />

                <div className="flex justify-between mb-2">
                    <div>
                        <div className="text-sm md:text-lg font-semibold text-gray-700">
                            {title}
                        </div>
                        <div className="text-xs md:text-sm mt-2 md:mt-0 font-semibold text-gray-700">
                            {date}
                        </div>
                    </div>

                    <div className='text-right'>
                        <div className="text-xs md:text-lg font-semibold text-gray-700">
                            {"₹ " + amount}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-blue-700 mt-2 md:mt-0 underline hover:cursor-pointer hover:text-blue-900" onClick={clickOnPerson}>
                            {role === "instructor" ? "Booked By: " + studentName : "Paid To: " + instructorName}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

const BookingComponent = () => {
    const navigate = useNavigate();

    const bookingRedux = useSelector((state) => state.booking);
    const userRedux = useSelector((state) => state.user);

    const [upage, setuPage] = useState(1);
    const [pastPage, setPastPage] = useState(1);
    // const [hasMoreData, setHasMoreData] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [sortBy, setSortBy] = useState('upcoming');

    const dispatch = useDispatch();

    const getAllMeetings = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                showToast({
                    msg: "Login Required",
                    type: "error",
                    duration: 3000
                });
                navigate("/signin");
                return;
            } else {

                if (sortBy === 'upcoming') {
                    dispatch(bookingRequest());
                    const result = await getUserMeetings(upage, 5, sortBy);
                    if (result.success) {

                        dispatch(upbookingSuccess([...bookingRedux.upComing, ...result.data]));
                        dispatch(setTotalBookingPage(result.totalResult));
                        setuPage(upage + 1);
                    } else {
                        showToast({
                            msg: result.msg,
                            type: "error",
                            duration: 3000
                        });
                        dispatch(bookingFailure(result.msg));
                    }
                } else {
                    dispatch(bookingRequest());
                    const result = await getUserMeetings(pastPage, 5, sortBy);

                    if (result.success) {

                        dispatch(pastbookingSuccess([...bookingRedux.past, ...result.data]));
                        dispatch(setTotalBookingPage(result.totalResult));
                        setPastPage(pastPage + 1);
                    } else {
                        showToast({
                            msg: result.msg,
                            type: "error",
                            duration: 3000
                        });
                        dispatch(bookingFailure(result.msg));
                    }
                }
            }
        } catch (err) {
            showToast({
                msg: err,
                type: "error",
                duration: 3000
            });
        }
    }

    // const handleScroll = () => {
    //     const tableDiv = document.querySelector('.table-div-transaction');
    //     console.log({tableDiv})
    //     if (tableDiv) {
    //         const { scrollTop, clientHeight, scrollHeight } = tableDiv;
    //         if (scrollTop + clientHeight === scrollHeight) {
    //             getAllTransaction();
    //         }
    //     }
    // };

    // useEffect(() => {
    //     const tableDiv = document.querySelector('.table-div-transaction');
    //     console.log({tableDiv})
    //     if (tableDiv) {
    //         tableDiv.addEventListener('scroll', handleScroll);
    //         return () => tableDiv.removeEventListener('scroll', handleScroll);
    //     }
    // }, [bookingRedux.data]);



    useEffect(() => {
        scrollToTop();
        getAllMeetings();
        return () => {
            dispatch(setTotalBookingPage(0));
            dispatch(upbookingSuccess([]));
            dispatch(pastbookingSuccess([]));
            setuPage(1);
            setPastPage(1);
        }
    }, [sortBy])


    return (
        userRedux.data && <div className="w-full font-inter text-xl">
            <div className="mx-auto mt-2 md:mt-5 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl">Bookings</p>
                </div>
                {userRedux.data.role === "instructor" ? <div className="grid grid-cols-1 md:grid-cols-2 mt-2 md:mt-3 mx-2">
                    <EarningCard title="Balance" value="₹ 1000.00" />
                    <EarningCard title="Pending Balance" value="₹ 1000.00" />
                    <EarningCard title="Lifetime Earning" value="₹ 1000.00" />
                </div> : null}

                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl"></p>
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-end">
                            <div className="flex items-center ml-2">
                                <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                                <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option
                                        className="whitespace-no-wrap text-sm" value="upcoming">upcoming</option>
                                    <option className="whitespace-no-wrap text-sm" value="past">completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 overflow-auto rounded-lg  border shadow bg-white h-[450px] md:h-[550px] table-div-transaction">



                    {bookingRedux.loading && (sortBy === "upcoming" ? bookingRedux.upComing.length === 0 : bookingRedux.past.length === 0) ?
                        <div className="flex justify-center items-center h-full">
                            <div className="loading flex space-x-2">
                                <Spinner color="blue" fontSize={20} className="mt-[1px]" />
                                <p className="loading-text text-xl font-semibold font-inter">Loading...</p>
                            </div>
                        </div>
                        :

                        (sortBy === "upcoming" ? bookingRedux.upComing.length === 0 : bookingRedux.past.length === 0) ?
                            <div className="flex justify-center items-center h-full">
                                <p className="text-xl font-semibold font-inter">No Bookings Found</p>
                            </div>
                            :

                            <>
                                <div className="card-header ml-1">
                                    <p className="text-xl font-semibold font-inter">Your Bookings</p>
                                </div>

                                {sortBy === "upcoming" ?
                                    bookingRedux.upComing.map(booking => (
                                        <BookingCard
                                            key={booking._id}
                                            invoice={booking.transaction_id.invoice}
                                            title={booking.calendarEvent.title}
                                            studentName={booking.studentId.firstName + " " + booking.studentId.lastName}
                                            instructorName={booking.instructorId.firstName + " " + booking.instructorId.lastName}
                                            instructorId={booking.instructorId._id}
                                            amount={parseInt(booking.transaction_id.amount) / 100}
                                            status={userRedux.data.role === "instructor" ? (booking.transaction_id.bookingDoneToReceiver ? "Paid" : "Pending") : booking.transaction_id.status}
                                            upcoming={new Date(booking.calendarEvent.start) > new Date()}
                                            role={userRedux.data.role}
                                            date={convertISOtoDate(booking.calendarEvent.start)}
                                            setOpenTransactionModal={setOpenTransactionModal}
                                            setSelectedTransaction={setSelectedTransaction}
                                            studentId={booking.studentId._id}
                                            booking={booking}
                                        />

                                    )) :
                                    bookingRedux.past.map(booking => (
                                        <BookingCard
                                            key={booking._id}
                                            invoice={booking.transaction_id.invoice}
                                            title={booking.calendarEvent.title}
                                            studentName={booking.studentId.firstName + " " + booking.studentId.lastName}
                                            instructorName={booking.instructorId.firstName + " " + booking.instructorId.lastName}
                                            instructorId={booking.instructorId._id}
                                            amount={parseInt(booking.transaction_id.amount) / 100}
                                            status={userRedux.data.role === "instructor" ? (booking.transaction_id.bookingDoneToReceiver ? "Paid" : "Pending") : booking.transaction_id.status}
                                            upcoming={new Date(booking.calendarEvent.start) > new Date()}
                                            role={userRedux.data.role}
                                            date={convertISOtoDate(booking.calendarEvent.start)}
                                            setOpenTransactionModal={setOpenTransactionModal}
                                            setSelectedTransaction={setSelectedTransaction}
                                            studentId={booking.studentId._id}
                                            booking={booking}
                                        />

                                    ))
                                }



                                {sortBy === "upcoming" ? (bookingRedux.upComing.length < bookingRedux.totalResult) : (bookingRedux.past.length < bookingRedux.totalResult) ?
                                    <div className="flex justify-center items-center">
                                        <button onClick={getAllMeetings} className=" text-center p-2 text-sm bg-blue-400 bg-slate-500 text-white font-inter rounded-lg mt-3">{bookingRedux.loading ? "Loading" : "Show More"}</button>
                                    </div>
                                    : null}

                            </>}
                </div>
            </div>
            {openTransactionModal ?
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <TransactionModal openTransactionModal={openTransactionModal} setOpenTransactionModal={setOpenTransactionModal} selectedTransaction={selectedTransaction} userRole={userRedux.data.role} />
                </div>
                : null}
        </div>
    )
}

export default BookingComponent;
// 