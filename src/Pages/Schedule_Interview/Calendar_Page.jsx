import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import Calendar_Comp from '../../Components/Schedule_Interview/Calendar_Comp'
import { scrollToTop } from '../../Utils/functions'

const Calendar_Page = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div className=''>

      <Nav />
      <div className='mb-20'>
        <Calendar_Comp />
      </div>
    </div>
  )
}

export default Calendar_Page