import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'
import User_Profile_Comp from '../../Components/Profile/User_Profile_Comp'
import { useDispatch, useSelector } from 'react-redux'
import OnBoarding from '../../Components/Profile/OnBoarding'
import { getUserData } from '../../APIs/User_API'
import showToast from '../../Utils/showToast'
import { decryptFromJson, scrollToTop } from '../../Utils/functions'
import { getUserSuccess } from '../../Redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { getLoginUser } from '../../App'

const User_Profile = () => {

  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getLoginUser(dispatch, navigate);
  },[])

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    userState.data ?
      <div>
        <Nav />
        <div className='mb-20 select-none'>
          {userState.data.onBoarding ? <User_Profile_Comp /> :
            <OnBoarding />}
        </div>
      </div>

      :

      null
  )
}

export default User_Profile