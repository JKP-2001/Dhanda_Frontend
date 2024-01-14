import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import Calendar_Comp from '../../Components/Schedule_Interview/Calendar_Comp'
import { scrollToTop } from '../../Utils/functions'

const Calendar_Page = () => {

  useEffect(()=>{
    scrollToTop();
  },[])

  return (
    <div className=''>
      
      <Nav />
      
      <Calendar_Comp />
    </div>
  )
}

export default Calendar_Page