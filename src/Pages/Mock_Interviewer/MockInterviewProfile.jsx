import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import MockInterview from '../../Components/Mock_Interviewer/MockInterview'
import { scrollToTop } from '../../Utils/functions'


const MockInterviewProfile = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div>
      <Nav />
      <div className='mb-20'>
        <MockInterview />
      </div>

    </div>
  )
}

export default MockInterviewProfile