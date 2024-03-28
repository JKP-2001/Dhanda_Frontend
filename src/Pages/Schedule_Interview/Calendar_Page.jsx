import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import Calendar_Comp from '../../Components/Schedule_Interview/Calendar_Comp'
import { scrollToTop } from '../../Utils/functions'
import SideNav from '../../Components/SideNav'

const Calendar_Page = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div className=''>

      <Nav />
      <SideNav />
      <div className='mb-20 lg:mb-2 select-none'>
        <Calendar_Comp />
      </div>
    </div>
  )
}

export default Calendar_Page