import React from 'react'

function Main() {
  return (
    <div className='container w-full mt-4  border-[1px] border-gray-400 rounded-md p bg-white shadow-sm'>
        <div className='upper-window flex flex-row items-center font-thin  justify-between p-3 border-b-[1px] bg-[#e4e9eb94] border-b-blue-gray-200'>
            <div className='flex flex-row gap-8'>
                <span className='cursor-pointer font-roboto'>Newest to Oldest</span>
                <span className='cursor-pointer'>Most Votes</span>
            </div>
            <div>

            </div>
        </div>
        <div className='all-discussion'>
            <div className='p-3'>

            </div>
        </div>
    </div>
  )
}

export default Main