import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'

import Mock_Interview_Comp from "../../Components/Mock_Interview/Mock_Interview_Comp"
import { scrollToTop } from '../../Utils/functions'
import SideNav from '../../Components/SideNav'
import { getLoginUser } from '../../App'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Mock_Interview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, [])

  useEffect(() => {
    getLoginUser(dispatch, navigate);
  },[])

  return (
    <div>
      <SideNav/>
      <Nav />
      <div className='mb-20 select-none md:ml-48'>
        <Mock_Interview_Comp />
      </div>
    </div>
  )
}

export default Mock_Interview