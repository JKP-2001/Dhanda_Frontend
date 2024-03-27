import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import MockInterview from '../../Components/Mock_Interviewer/MockInterview'
import { scrollToTop } from '../../Utils/functions'
import SideNav from '../../Components/SideNav'


const MockInterviewProfile = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div>
      <SideNav/>
      <Nav />
      <div className='mb-20 lg:ml-44'>
        <MockInterview />
      </div>

    </div>
  )
}

export default MockInterviewProfile