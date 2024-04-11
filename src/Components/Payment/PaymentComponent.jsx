import React, { useEffect, useState } from 'react';
import showToast from '../../Utils/showToast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paymentFailure, paymentRequest, paymentSuccess, setTotalResultPage } from '../../Redux/payment/paymentSlice';
import { exportTransactions, fetchTransactions } from '../../APIs/Transaction_API';
import { scrollToTop } from '../../Utils/functions';
import { Spinner } from '@material-tailwind/react';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ContactSupportOutlined } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { dmTransactions } from '../../APIs/DM_API';


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
        <div className={`w-full hover:scale-[101%] transition-all duration-300 md:w-[95%] h-20  rounded-lg shadow-lg mt-4 ${title === "Balance" ? "bg-blue-200" : title === "Pending Balance" ? "bg-red-200" : "bg-purple-200"} hover:shadow-2xl hover:cursor-pointer`}>
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
    const { openTransactionModal, setOpenTransactionModal, selectedTransaction, userRole, type } = props;

    const [loading, setLoading] = useState(false);

    const downloadAsPDF = () => {
        setLoading(true);
        const doc = new jsPDF();
        let yPos = 20;

        // Set background color
        doc.setFillColor(230, 255, 250); // You can specify RGB values for the color
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Draw a filled rectangle covering the entire page
        doc.addFont('inter')

        // Add title
        doc.setFontSize(20);
        doc.setTextColor(41, 128, 185); // Set custom text color
        // doc.setFont('helvetica', 'bold'); // Set bold font style
        doc.setFont('inter', 'bold');
        doc.text(`Transaction Details (${userRole})`, 105, yPos, { align: 'center' }); // Center align the text
        yPos += 20;

        // Define table columns and rows
        const columns = ["", "Details"];
        const rows = [
            ["Transaction Id:", selectedTransaction.transaction_id._id],
            ["Invoice Number:", selectedTransaction.transaction_id.invoice],
            [userRole === "instructor" ? "Booked By:" : "Paid to:", `${userRole === "instructor" ? selectedTransaction.studentId.firstName + " " + selectedTransaction.studentId.lastName : selectedTransaction.instructorId.firstName + " " + selectedTransaction.instructorId.lastName} (${userRole === "instructor" ? selectedTransaction.studentId.email : selectedTransaction.instructorId.email})`],
            ["Payment Date:", convertISOtoDate(selectedTransaction.transaction_id.confirmTimestamp)],
            ["Payment Time:", convertISOtoTime(selectedTransaction.transaction_id.confirmTimestamp)],
            ["Payment Id:", selectedTransaction.transaction_id.razorpayPaymentId],
            ["Amount:", `${parseInt(selectedTransaction.transaction_id.amount) / 100}`],
            ["Payment Status:", userRole === "instructor" ? (selectedTransaction.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending") : selectedTransaction.transaction_id.status],
            ["Instructor Id:", selectedTransaction.instructorId._id],
            ["Student Id:", selectedTransaction.studentId._id],
            ["Service Type", "Booked Meeting"],
            ["Meeting Id", selectedTransaction._id]
        ];

        // Create table
        doc.autoTable({
            startY: yPos,
            head: [columns],
            body: rows,
            theme: 'grid',
        });

        const signatureYPos = doc.previousAutoTable.finalY + 20; // Position the signature below the table
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.setFont('helvetica', 'bold'); // Set bold font style
        // align to left
        // doc.text("The Interview Hub Team", 105, signatureYPos, { align: 'right' });/

        // Save the PDF
        doc.save(`Invoice #${selectedTransaction.transaction_id.invoice}.pdf`);
        showToast({
            msg: "Invoice Downloaded Successfully",
            type: "success",
            duration: 3000
        });

        setLoading(false);
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
                                    <p className="text-sm text-gray-700 font-inter">
                                        Meeting Id: {selectedTransaction._id}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {userRole === "instructor" ?
                                            `Booked By: ${selectedTransaction.studentId.firstName} ${selectedTransaction.studentId.lastName}  ( ${selectedTransaction.studentId.email})` : `Paid to: ${selectedTransaction.instructorId.firstName} ${selectedTransaction.instructorId.lastName}  ( ${selectedTransaction.instructorId.email})`}
                                    </p>
                                    <p className="text-sm text-gray-700 ">
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
                                        Payment Status: {userRole === "instructor" ? selectedTransaction.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending" : selectedTransaction.transaction_id.status}
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
                            className="mt-2 md:mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={downloadAsPDF}
                        >
                            {loading?"Donwloading.....":"Download as PDF"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const DMTransactionModal = (props) => {
    const { openTransactionModal, setOpenTransactionModal, selectedTransaction, userRole } = props;

    const downloadAsPDF = () => {
        const doc = new jsPDF();
        let yPos = 20;

        // Set background color
        doc.setFillColor(230, 255, 250); // You can specify RGB values for the color
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Draw a filled rectangle covering the entire page
        doc.addFont('inter')

        // Add title
        doc.setFontSize(20);
        doc.setTextColor(41, 128, 185); // Set custom text color
        // doc.setFont('helvetica', 'bold'); // Set bold font style
        doc.setFont('inter', 'bold');
        doc.text(`Transaction Details (${userRole})`, 105, yPos, { align: 'center' }); // Center align the text
        yPos += 20;

        // Define table columns and rows
        const columns = ["Attribute", "Details"];
        const rows = [
            ["Transaction Id:", selectedTransaction.transaction_id._id],
            ["Invoice Number:", selectedTransaction.transaction_id.invoice],
            [userRole === "instructor" ? "Booked By:" : "Paid to:", `${userRole === "instructor" ? selectedTransaction.senderId.firstName + " " + selectedTransaction.senderId.lastName : selectedTransaction.receiverId.firstName + " " + selectedTransaction.receiverId.lastName} (${userRole === "instructor" ? selectedTransaction.senderId.email : selectedTransaction.receiverId.email})`],
            ["Payment Date:", convertISOtoDate(selectedTransaction.transaction_id.confirmTimestamp)],
            ["Payment Time:", convertISOtoTime(selectedTransaction.transaction_id.confirmTimestamp)],
            ["Payment Id:", selectedTransaction.transaction_id.razorpayPaymentId],
            ["Amount:", `${parseInt(selectedTransaction.transaction_id.amount) / 100}`],
            ["Payment Status:", userRole === "instructor" ? (selectedTransaction.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending") : selectedTransaction.transaction_id.status],
            ["Instructor Id:", selectedTransaction.receiverId._id],
            ["Student Id:", selectedTransaction.senderId._id],
            ["Service Type", "Booked Meeting"],
            ["DM Id", selectedTransaction._id]
        ];

        // Create table
        doc.autoTable({
            startY: yPos,
            head: [columns],
            body: rows,
            theme: 'grid',
        });

        const signatureYPos = doc.previousAutoTable.finalY + 20; // Position the signature below the table
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.setFont('helvetica', 'bold'); // Set bold font style
        // align to left
        // doc.text("The Interview Hub Team", 105, signatureYPos, { align: 'right' });/

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
                                    <p className="text-sm text-gray-700 font-inter">
                                        DM Id: {selectedTransaction._id}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {userRole === "instructor" ?
                                            `Booked By: ${selectedTransaction.senderId.firstName} ${selectedTransaction.senderId.lastName}  ( ${selectedTransaction.senderId.email})` : `Paid to: ${selectedTransaction.receiverId.firstName} ${selectedTransaction.receiverId.lastName}  ( ${selectedTransaction.receiverId.email})`}
                                    </p>
                                    <p className="text-sm text-gray-700 ">
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
                                        Payment Status: {userRole === "instructor" ? selectedTransaction.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending" : selectedTransaction.transaction_id.status}
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
                            className="mt-2 md:mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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
    const { title, invoice, studentName, amount, status, date, setOpenTransactionModal, setSelectedTransaction, payment, studentId, instructorName, instructorId, role, type } = props;

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
                        <div className="text-xs md:text-sm font-semibold text-blue-700 mt-2 md:mt-0 underline hover:cursor-pointer hover:text-blue-900" onClick={clickOnPerson}>
                            {role === "instructor" ? "Booked By: " + studentName : "Paid To: " + instructorName}
                        </div>
                    </div>
                </div>



            </div>

        </>
    )
}


const DMPaymentCard = (props) => {
    const { title, invoice, studentName, amount, status, date, setOpenTransactionModal, setSelectedTransaction, payment, studentId, instructorName, instructorId, role, type } = props;

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
                            {role==="instructor" ? `DM from ${studentName}` : `DM to ${instructorName}`}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-gray-700">
                            {date}
                        </div>
                    </div>

                    <div className='text-right'>
                        <div className="text-sm md:text-lg font-semibold text-gray-700">
                            {"Amount: ₹ " + amount}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-blue-700 mt-2 md:mt-0 underline hover:cursor-pointer hover:text-blue-900" onClick={clickOnPerson}>
                            {role === "instructor" ? "Sent By: " + studentName : "Sent To: " + instructorName}
                        </div>
                    </div>
                </div>



            </div>

        </>
    )
}

const ExportTransactionsModal = (props) => {

    const { setOpenExportModal, exportToCSV } = props;

    const handleExport = (month) => {
        exportToCSV(month);
        setOpenExportModal(false);
    }

    return (
        <div>
            <div className="fixed z-50 inset-0 overflow-y-auto">
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
                                        Export Transactions
                                    </div>
                                    <div className="mt-2 -ml-2 space-y-2 space-x-2">
                                        <div className=''></div>
                                        <button className="text-xs text-gray-700 font-inter p-2 bg-white rounded-lg hover:bg-gray-200 font-semibold hover:scale-[102%]" onClick={() => handleExport(0)}>
                                            This Month
                                        </button>
                                        <button className="text-xs text-gray-700 font-inter p-2 bg-white rounded-lg hover:bg-gray-200 font-semibold hover:scale-[102%]" onClick={() => handleExport(3)}>
                                            Last 3 Months
                                        </button>
                                        <button className="text-xs text-gray-700 font-inter p-2 bg-white rounded-lg hover:bg-gray-200 font-semibold hover:scale-[102%]" onClick={() => handleExport(6)}>
                                            Last 6 Months
                                        </button>
                                        <button className="text-xs text-gray-700 p-2 bg-white rounded-lg hover:bg-gray-200 font-semibold hover:scale-[102%]" onClick={() => handleExport(12)}>
                                            Last 12 Months
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => { setOpenExportModal(false); document.body.style.overflow = 'auto'; }}
                            >
                                Close
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
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

    const [selectedDMTransaction, setSelectedDMTransaction] = useState(null);
    const [openDMTransactionModal, setOpenDMTransactionModal] = useState(false);

    const [openExportModal, setOpenExportModal] = useState(false);

    const dispatch = useDispatch();

    const [month, setMonth] = useState(new Date().getMonth());

    const [months, setMonths] = useState([]);

    const [type, setType] = useState("Meetings");

    const covertMonthToIndex = (month) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months.indexOf(month);
    }

    useEffect(() => {
        // filer months less than equal to current month
        const currentMonth = new Date().getMonth();
        const mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const filteredMonths = mon.filter((month, index) => index <= currentMonth);
        setMonths(filteredMonths);
    }, [month]);


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

                if (type === "Meetings") {
                    dispatch(paymentRequest());
                    const result = await fetchTransactions(page, 5, month);

                    if (result.success) {
                        console.log({ result })
                        dispatch(paymentSuccess([...paymentRedux.data, ...result.data]));
                        if (page === 1) {
                            dispatch(setTotalResultPage(result.totalResult));
                        }
                        setPage(page + 1);
                    } else {
                        showToast({
                            msg: result.msg,
                            type: "error",
                            duration: 3000
                        });
                        dispatch(paymentFailure(result.msg));
                    }
                } else {
                    dispatch(paymentRequest());
                    const result = await dmTransactions(page, 5, month);

                    if (result.success) {
                        console.log({ result })
                        dispatch(paymentSuccess([...paymentRedux.data, ...result.data]));
                        if (page === 1) {
                            dispatch(setTotalResultPage(result.totalResult));
                        }
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
            }
        } catch (err) {
            showToast({
                msg: err,
                type: "error",
                duration: 3000
            });
        }
    }


    const exportToCSV = async (month) => {

        try {

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Login Required");
            }

            const loader = toast.loading("Exporting...");
            const result = await exportTransactions(month);

            if (result.success) {
                toast.dismiss(loader);
                showToast({
                    msg: result.msg,
                    type: "success",
                    duration: 3000
                })
            }

            else {
                toast.dismiss(loader);
                showToast({
                    msg: result.msg,
                    type: "error",
                    duration: 3000
                })
            }

        } catch (err) {
            showToast({
                msg: err,
                type: "error",
                duration: 3000
            })
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
    }, [month, type]);

    const handleSortChange = (e) => {
        setMonth(covertMonthToIndex(e.target.value))
        setPage(1);
        dispatch(paymentSuccess([]));
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setPage(1);
        dispatch(paymentSuccess([]));
    }

    return (
        userRedux.data && <div className="w-full font-inter text-xl">
            <div className="mx-auto mt-2 md:mt-5 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl">Payments</p>
                </div>
                {userRedux.data.role === "instructor" ? <div className="grid grid-cols-1 md:grid-cols-2 mt-2 md:mt-3 mx-2">
                    <EarningCard title="Balance" value="₹ 1000.00" />
                    <EarningCard title="Pending Balance" value="₹ 1000.00" />
                    <EarningCard title="Lifetime Earning" value="₹ 1000.00" />
                </div> : null}

                <div className="mt-4 sm:mt-6">
                    <div className="flex flex-wrap items-center justify-end">
                        <div className="flex items-center ml-2">
                            <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Service: </label>
                            <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm" value={type} onChange={handleTypeChange}>
                                <option value={"Meetings"}>Meetings</option>
                                <option value={"DMs"}>DMs</option>
                            </select>
                        </div>
                        <div className="flex items-center ml-2">
                            <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Month: </label>
                            <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm" value={months[month]} onChange={handleSortChange}>
                                {months.map((month, index) => <option value={month} key={index}>{month}</option>)}
                            </select>
                        </div>
                        <button type="button" class="inline-flex cursor-pointer items-center rounded-lg border mt-1 sm:mt-0 border-gray-400 bg-white py-1 sm:py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow" onClick={() => { setOpenExportModal(true); document.body.style.overflow = "hidden" }}>
                            <svg class="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" class=""></path>
                            </svg>
                            Export to CSV
                        </button>
                    </div>
                </div>

                <div className="mt-2 p-4 overflow-auto rounded-lg  border shadow bg-white h-[450px] md:h-[550px] table-div-transaction">



                    {(paymentRedux.loading && paymentRedux.data.length === 0) ?
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

                                {type==="Meetings" ?paymentRedux.data.map(payment => (
                                    <PaymentCard
                                        key={payment.transaction_id._id}
                                        invoice={payment.transaction_id.invoice}
                                        title={payment.calendarEvent.title}
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
                                        type={"meet"}
                                    />

                                )):

                                paymentRedux.data.map(payment => (
                                    <DMPaymentCard
                                        key={payment.transaction_id._id}
                                        invoice={payment.transaction_id.invoice}
                                        title={"DM"}
                                        studentName={payment.senderId.firstName + " " + payment.senderId.lastName}
                                        instructorName={payment.receiverId.firstName + " " + payment.receiverId.lastName}
                                        instructorId={payment.receiverId._id}
                                        amount={parseInt(payment.transaction_id.amount) / 100}
                                        status={userRedux.data.role === "instructor" ? (payment.transaction_id.paymentDoneToReceiver ? "Paid" : "Pending") : payment.transaction_id.status}
                                        role={userRedux.data.role}
                                        date={convertISOtoDate(payment.transaction_id.confirmTimestamp)}
                                        setOpenTransactionModal={setOpenDMTransactionModal}
                                        setSelectedTransaction={setSelectedDMTransaction}
                                        studentId={payment.senderId._id}
                                        payment={payment}
                                        type={"dm"}
                                    />
                                ))
                                
                                }



                                {paymentRedux.data.length < paymentRedux.totalResult ?
                                    <div className="flex justify-center">
                                        <button onClick={getAllTransaction} className=" p-2 text-sm bg-blue-400 bg-slate-500 text-white font-inter rounded-lg mt-3">{paymentRedux.loading ? "Loading...." : "Show More"}</button>
                                    </div>
                                    : null}

                            </>}
                </div>
            </div>
            {openTransactionModal ?
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <TransactionModal openTransactionModal={openTransactionModal} setOpenTransactionModal={setOpenTransactionModal} selectedTransaction={selectedTransaction} userRole={userRedux.data.role} type={"meet"}/>
                </div>
                :
                openDMTransactionModal?
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <DMTransactionModal openTransactionModal={openDMTransactionModal} setOpenTransactionModal={setOpenDMTransactionModal} selectedTransaction={selectedDMTransaction} userRole={userRedux.data.role} type={"dm"}/>
                    </div>
                :
                openExportModal ?
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ExportTransactionsModal setOpenExportModal={setOpenExportModal} exportToCSV={exportToCSV} />
                    </div>
                    : null}
        </div>
    )
}

export default PaymentComponent;
