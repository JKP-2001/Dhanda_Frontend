import React from 'react'

const PaymentCard = () => {

    return (
        <>
            <tr className="">
                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    Basic Plan - Nov 2021
                    <div className="mt-1 lg:hidden">
                        <p className="font-normal text-gray-500">14 November, 2021</p>
                    </div>

                    <div className="mt-1 lg:hidden">
                        <p className="font-normal text-gray-500">Booked By: Jitendra</p>
                    </div>
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">Jitendra</td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">14 November, 2021</td>

                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    ₹ 29.00
                    <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-200 py-1 px-2 text-left font-medium text-blue-500 lg:hidden">Pending</div>
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-200 py-1 px-2 text-blue-500">Pending</div>
                </td>
            </tr>

            {/* <hr className='hidden md:block w-full mx-4 mt-2' /> */}
        </>
    )
}

const PaymentComponent = () => {
    return (
        <div className="w-full font-inter text-xl">

            <div className="mx-auto mt-8 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 ml-3 font-bold text-gray-900 text-xl">Payments</p>

                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-end">
                            <div className="flex items-center ml-2">
                                <label for="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                                <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                                    <option className="whitespace-no-wrap text-sm">Recent</option>
                                </select>
                            </div>

                            {/* <button type="button" className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow">
                                <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className=""></path>
                                </svg>
                                Export to CSV
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="mt-6 overflow-auto rounded-lg  border shadow bg-white h-[450px] md:h-[550px]">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead className="hidden border-2 border-black  lg:table-header-group sticky top-0 z-50 bg-white">
                            <tr className="">
                                <td width="25%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Invoice</td>
                                <td width="25%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Booked By</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Date</td>

                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>

                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
                            </tr>
                        </thead>

                        <tbody className="lg:border-gray-300">
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                            <PaymentCard />
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default PaymentComponent