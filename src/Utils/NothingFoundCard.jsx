import React from 'react'

const NothingFoundCard = (props) => {
    return (

        <div  class="block w-[95%] px-2 md:px-6 py-20 md:py-52 bg-white border border-gray-200 rounded-lg shadow  text-center mt-4">

            <h5 class="mb-2 text-2xl font-bold font-custom tracking-tight text-gray-900 dark:text-white">{props.heading}</h5>
            <p class="font-semibold font-inter text-gray-700 dark:text-gray-400">{props.description}</p>
        </div>

    )
}

export default NothingFoundCard