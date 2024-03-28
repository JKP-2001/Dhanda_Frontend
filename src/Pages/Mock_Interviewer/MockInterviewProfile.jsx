import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import MockInterview from '../../Components/Mock_Interviewer/MockInterview'
import { scrollToTop } from '../../Utils/functions'
import SideNav from '../../Components/SideNav'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginUser } from '../../App'


const MockInterviewProfile = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser(dispatch, navigate);
  },[])

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