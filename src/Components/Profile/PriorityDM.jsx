import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { answerToDm, fetchUserDM } from '../../APIs/DM_API';
import showToast from '../../Utils/showToast';
import { dmRequest, dmSuccess, setTotalDMPage } from '../../Redux/DM/dmSlice';
import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';

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


const Message_Modal = (props) => {

    const { text, setText, handleClose, setOpenMessageModal, question, userRole, studentName, instructorName, answer, isAnswered, id, setType } = props;

    const answerDM = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000
            });
            return;
        }

        if(text.length === 0){
            showToast({
                msg: 'Please enter your reply',
                type: 'error',
                duration: 3000
            });
            return;
        }

        if(text.length > 1000){
            showToast({
                msg: 'Reply cannot be more than 1000 characters',
                type: 'error',
                duration: 3000
            });
            return;
        }

        const loader = toast.loading('Sending Reply...');

        const result = await answerToDm(id, text);

        toast.dismiss(loader);

        if (result.success) {
            showToast({
                msg: result.message,
                type: 'success',
                duration: 3000
            });
            setType("answered");
            setText("");
            handleClose();
        }

        if (!result.success) {
            showToast({
                msg: result.msg,
                type: 'error',
                duration: 3000
            });
        }
    }

    return (
        <div>
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center mt-32 md:mt-0 md:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">

                            <div className="mt-3 mx-2 sm:mx-0   sm:text-left">
                                <div className="text-lg ml-1 font-semibold text-gray-900 font-inter" id="modal-headline">
                                    {userRole === "instructor" ? `Reply To ${studentName}` : `Sent to ${instructorName}`}
                                </div>
                                <div className="  mt-3">
                                    <div></div>
                                    <div className='question w-full'>
                                        <textarea type="text" id="text" rows={8} className="font-inter w-full px-3 placeholder-gray-900 border rounded-lg text-sm focus:shadow-outline" placeholder="Type your question here" value={"Q." + "  " + question} disabled />
                                    </div>

                                    {isAnswered? 
                                    <div className='your-answer w-full'>
                                    <textarea type="text" id="text" rows={10} className={`font-inter w-full px-3 placeholder-gray-900 border rounded-lg text-sm focus:shadow-outline`} placeholder="Type answer here" value={"Ans. "+" "+answer}  disabled/>
                                </div>:
                                    userRole === "instructor" ?
                                    <div className='your-answer w-full'>
                                        <textarea type="text" id="text" rows={10} className={`font-inter w-full px-3 placeholder-gray-900 border rounded-lg text-sm focus:shadow-outline`} placeholder="Type answer here" value={text} onChange={(e) => setText(e.target.value)} disabled={isAnswered}/>
                                    </div> : null}
                                    {(userRole==="instructor" && !isAnswered) &&<div className="flex justify-end">
                                        {/* tag to show word overlimit */}
                                        {text.length > 1000 ? <div className="text-xs text-red-600 font-inter font-bold">Characters limit reached.</div> :
                                            <div className="text-xs text-green-600 font-inter font-bold">{1000 - text.length} characters left</div>
                                        }
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}
                            >
                                Close
                            </button>

                            {(userRole==="instructor" && !isAnswered) &&<button
                                type="button"
                                className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-2 md:mt-0" onClick={answerDM}
                            >
                                Send
                            </button>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}



const DMCard = (props) => {
    const { dm, userRole, setType } = props;

    const [openMessageModal, setOpenMessageModal] = useState(false);

    const handleClick = () => {
        setOpenMessageModal(true);
        document.body.style.overflow = 'hidden';
    }

    const handleClose = () => {
        setOpenMessageModal(false);
        document.body.style.overflow = 'auto';
        setText('');
    }


    console.log({openMessageModal})
    const [text, setText] = useState('');

    return (
        <>


            <div className="w-full p-4 my-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg hover:cursor-pointer hover:bg-blue-50 " onClick={handleClick}>

                <div className="flex justify-between w-auto">
                    <div className="invoice font-inter text-lg md:text-xl font-semibold">
                        Message <span className="invoice-number font-inter text-sm md:text-base text-gray-500"># {dm._id}</span>
                    </div>

                    <div className="invoice font-inter text-lg md:text-xl font-semibold">
                        <span className={`items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${dm.isAnswered ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}>
                            {dm.isAnswered ? "answered" : "unanswered"}
                        </span>
                    </div>



                </div>
                <hr className='w-[25%] md:w-[10%] mb-2 border-[1px] border-blue-700' />

                <div className="flex justify-between mb-2">
                    <div>
                        {userRole === "instructor" ? <div className="text-sm md:text-lg font-semibold text-gray-700">
                            {"Sender" + " - " + dm.senderId.firstName}
                        </div> :
                            <div className="text-sm md:text-lg font-semibold text-gray-700">
                                {"Send to" + " - " + dm.receiverId.firstName}
                            </div>}
                        <div className="text-xs md:text-sm mt-2 md:mt-0 font-semibold text-gray-700">
                            {"Date" + " - " + new Date(dm.creationDateAndTime).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                    </div>

                </div>
            </div>
            {openMessageModal ? <Message_Modal question={dm.question} text={text} setText={setText} setOpenMessageModal={setOpenMessageModal} handleClose={handleClose} userRole={userRole} studentName={dm.senderId.firstName} instructorName={dm.receiverId.firstName} answer={dm.answer ? dm.answer : null} isAnswered={dm.isAnswered} id={dm._id} setType={setType}/>:null}
        </>
    )
}

const PriorityDM = () => {

    const userRedux = useSelector(state => state.user);
    const dmRedux = useSelector(state => state.dm);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [type, setType] = useState("unanswered");





    const fetchDM = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            showToast({
                msg: 'Login Required',
                type: 'error',
                duration: 3000
            })
            return;
        }

        dispatch(dmRequest());
        const response = await fetchUserDM(page, 5, type);
        if (response.success === false) {
            showToast({
                msg: response.msg,
                type: 'error',
                duration: 3000
            })
        } else {
            dispatch(dmSuccess(response.data));
            dispatch(setTotalDMPage(response.totalResult));
        }

    }



    useEffect(() => {
        fetchDM();
    }, [type])

    return (
        userRedux.data && <div className="w-full font-inter text-xl">
            <div className="mx-auto mt-2 md:mt-5 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl">Priority DM</p>
                </div>

                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-2xl"></p>
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-end">
                            <div className="flex items-center ml-2">
                                <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                                <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm" value={type} onChange={(e) => { setType(e.target.value); setPage(1) }}>
                                    <option
                                        className="whitespace-no-wrap text-xs" value="unanswered">Unanswered</option>
                                    <option className="whitespace-no-wrap text-xs" value="answered">Answered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {<div className="mt-3 p-4 overflow-auto rounded-lg  border shadow bg-white h-[450px] md:h-[550px] table-div-transaction">
                    <div className="card-header ml-1">
                        <p className="text-xl font-semibold font-inter">Your Messages</p>
                    </div>

                    {dmRedux.data.length === 0 ? <div className="flex justify-center items-center h-full">
                                <p className="text-xl font-semibold font-inter">No Messages Found</p>
                            </div>:null}

                    {(dmRedux.loading && dmRedux.data.length === 0) ?
                        <div className="flex justify-center items-center h-full">
                            <div className="loading flex space-x-2">
                                <Spinner color="blue" fontSize={20} className="mt-[1px]" />
                                <p className="loading-text text-xl font-semibold font-inter">Loading...</p>
                            </div>
                        </div>
                        :

                        dmRedux.data && dmRedux.data.map((item, index) => (
                            <DMCard key={index} dm={item} userRole={userRedux.data.role} setType={setType}/>
                        ))}

                    {
                        dmRedux.data.length < dmRedux.totalResult ?
                            <div className="flex justify-center items-center">
                                <button onClick={fetchDM} className=" text-center p-2 text-sm bg-blue-400 bg-slate-500 text-white font-inter rounded-lg mt-3">{dmRedux.loading ? "Loading" : "Show More"}</button>
                            </div>
                            : null
                    }
                </div>}

            </div>

        </div>
    )
}

export default PriorityDM