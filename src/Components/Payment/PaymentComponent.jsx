import React, { useEffect, useState } from 'react';
import showToast from '../../Utils/showToast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paymentFailure, paymentRequest, paymentSuccess, setTotalResultPage } from '../../Redux/payment/paymentSlice';
import { fetchTransactions } from '../../APIs/Transaction_API';
import InfiniteScroll from 'react-infinite-scroll-component';
import { scrollToTop } from '../../Utils/functions';
import { Spinner } from '@material-tailwind/react';

import jsPDF from 'jspdf';


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
        <div className={`w-full hover:scale-[101%] md:w-[95%] h-20  rounded-lg shadow-lg mt-4 ${title === "Balance" ? "bg-blue-200" : title === "Pending Balance" ? "bg-red-200" : "bg-purple-200"} hover:shadow-2xl hover:cursor-pointer`}>
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


        doc.text(`Payment Date: ${convertISOtoDate(selectedTransaction.transaction_id.confirmTimestamp)}`, 20, yPos);
        yPos += 10;

        doc.text(`Payment Time: ${convertISOtoTime(selectedTransaction.transaction_id.confirmTimestamp)}`, 20, yPos);
        yPos += 10;

        doc.text(`Payment Id: ${selectedTransaction.transaction_id.razorpayPaymentId}`, 20, yPos);
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
                    <div className="bg-blue-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="text-lg font-semibold text-gray-900 font-inter" id="modal-headline">
                                    Transaction Details
                                </div>
                                <div className="mt-2 space-y-1">
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
                                        Payment Date: {convertISOtoDate(selectedTransaction.transaction_id.confirmTimestamp)}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Payment Time: {convertISOtoTime(selectedTransaction.transaction_id.confirmTimestamp)}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Payment Id: {(selectedTransaction.transaction_id.razorpayPaymentId)}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Amount: ₹ {parseInt(selectedTransaction.transaction_id.amount) / 100}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Status: {userRole === "instructor" ? selectedTransaction.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending" : selectedTransaction.transaction_id.status}
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
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={downloadAsPDF}
                        >
                            Download as PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentCard = (props) => {
    const { title, invoice, studentName, amount, status, date, setOpenTransactionModal, setSelectedTransaction, payment, studentId, instructorName, instructorId, role } = props;

    const openSelectedTransaction = () => {
        setSelectedTransaction(payment);
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

                <div className="flex justify-between">
                    <div className="invoice font-inter text-lg md:text-xl font-semibold">
                        Invoice <span className="invoice-number font-inter text-sm md:text-base text-gray-500">#{invoice}</span>
                    </div>

                    <div className="status">
                        {role === "instructor" ? <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {status}
                        </span>
                            :
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${status === "successful" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {status}
                            </span>
                        }
                        {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800`}>
                            {"Paid"}
                        </span> */}
                    </div>
                </div>
                <hr className='w-[25%] md:w-[10%] mb-2 border-[1px] border-blue-700' />

                <div className="flex justify-between mb-2">
                    <div>
                        <div className="text-sm md:text-lg font-semibold text-gray-700">
                            {title}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-gray-700">
                            {date}
                        </div>
                    </div>

                    <div className='text-right'>
                        <div className="text-sm md:text-lg font-semibold text-gray-700">
                            {"Amount: ₹ " + amount}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-gray-700">
                            {role === "instructor" ? "Booked By: " + studentName : "Paid To: " + instructorName}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

const PaymentComponent = () => {
    const navigate = useNavigate();
    const paymentRedux = useSelector((state) => state.payment);
    const userRedux = useSelector((state) => state.user);

    const [page, setPage] = useState(1);
    // const [hasMoreData, setHasMoreData] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);

    const dispatch = useDispatch();

    const getAllTransaction = async () => {
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
                dispatch(paymentRequest());
                const result = await fetchTransactions(page, 5);

                if (result.success) {
                    console.log({ result })
                    dispatch(paymentSuccess([...paymentRedux.data, ...result.data]));
                    dispatch(setTotalResultPage(result.totalResult));
                    setPage(page + 1);
                } else {
                    showToast({
                        msg: result.msg,
                        type: "error",
                        duration: 3000
                    });
                    dispatch(paymentFailure(result.msg));
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
    // }, [paymentRedux.data]);

    useEffect(() => {
        scrollToTop();
        getAllTransaction();
        return () => {
            dispatch(setTotalResultPage(0));
            dispatch(paymentSuccess([]));
            setPage(1);
        }
    }, [])

    return (
        userRedux.data && <div className="w-full font-inter text-xl">
            <div className="mx-auto mt-2 md:mt-5 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl">Payments</p>
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-end">
                            <div className="flex items-center ml-2">
                                <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                                <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                                    <option className="whitespace-no-wrap text-sm">Recent</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {userRedux.data.role === "instructor" ? <div className="grid grid-cols-1 md:grid-cols-2 mt-2 md:mt-3 mx-2">
                    <EarningCard title="Balance" value="₹ 1000.00" />
                    <EarningCard title="Pending Balance" value="₹ 1000.00" />
                    <EarningCard title="Lifetime Earning" value="₹ 1000.00" />
                </div> : null}
                <div className="mt-6 p-4 overflow-auto rounded-lg  border shadow bg-white h-[450px] md:h-[550px] table-div-transaction">



                    {paymentRedux.loading ?
                        <div className="flex justify-center items-center h-full">
                            <div className="loading flex space-x-2">
                                <Spinner color="blue" fontSize={20} className="mt-[1px]" />
                                <p className="loading-text text-xl font-semibold font-inter">Loading...</p>
                            </div>
                        </div>
                        :

                        paymentRedux.data.length === 0 ?
                            <div className="flex justify-center items-center h-full">
                                <p className="text-xl font-semibold font-inter">No Transactions Found</p>
                            </div>
                            :

                            <>
                                <div className="card-header ml-1">
                                    <p className="text-xl font-semibold font-inter">Transactions</p>
                                </div>

                                {paymentRedux.data.map(payment => (
                                    <PaymentCard
                                        key={payment.transaction_id._id}
                                        invoice={payment.transaction_id.invoice}
                                        title={payment.title}
                                        studentName={payment.studentId.firstName + " " + payment.studentId.lastName}
                                        instructorName={payment.instructorId.firstName + " " + payment.instructorId.lastName}
                                        instructorId={payment.instructorId._id}
                                        amount={parseInt(payment.transaction_id.amount) / 100}
                                        status={userRedux.data.role === "instructor" ? (payment.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending") : payment.transaction_id.status}
                                        role={userRedux.data.role}
                                        date={convertISOtoDate(payment.transaction_id.confirmTimestamp)}
                                        setOpenTransactionModal={setOpenTransactionModal}
                                        setSelectedTransaction={setSelectedTransaction}
                                        studentId={payment.studentId._id}
                                        payment={payment}
                                    />

                                ))}



                                {paymentRedux.data.length < paymentRedux.totalResult ?

                                    <button onClick={getAllTransaction} className=" p-2 text-sm bg-blue-400 bg-slate-500 text-white font-inter rounded-lg mt-3">{paymentRedux.loading ? "Loading" : "Show More"}</button>
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

export default PaymentComponent;
