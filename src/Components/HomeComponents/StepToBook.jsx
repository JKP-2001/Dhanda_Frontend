import React from 'react'

// create three cards for step to book interview

const StepToBook = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
        <div className='bg-white p-6 rounded-lg'>
            <div className='text-2xl font-custom font-semibold'>Step 01</div>
            <div className='text-lg text-gray-900 font-handwritten2 mt-2 font-semibold'>Choose your mentor according to your need</div>
        </div>
        <div className='bg-white p-6 rounded-lg'>
            <div className='text-2xl font-custom font-semibold'>Step 02</div>
            <div className='text-lg text-gray-900 font-handwritten2 mt-2 font-semibold'>Choose your time slot. Book your mock-interview</div>
        </div>
        <div className='bg-white p-6 rounded-lg'>
            <div className='text-2xl font-custom font-semibold'>Step 03</div>
            <div className='text-lg text-gray-900 font-handwritten2 mt-2 font-semibold'>Meet with your interviewer virtually</div>
        </div>
        <div className='bg-white p-6 rounded-lg'>
            <div className='text-2xl font-custom font-semibold'>Step 04</div>
            <div className='text-lg text-gray-900 font-handwritten2 mt-2 font-semibold'>Get detailed feedback and crack the interview</div>
        </div>
    </div>
  )
}

export default StepToBook