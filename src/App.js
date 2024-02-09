import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


import MockInterviewProfile from './Pages/Mock_Interviewer/MockInterviewProfile';
import Home from './Pages/Home';

import Mock_Interview from './Pages/Mock_Interview/Mock_Interview';
import NotFound from './Pages/NotFound';
import Interviewer_Card from './Components/Mock_Interview/Interviewer_Card';
import SignUp from './Pages/Auth/SignUp';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import NewPassword from './Pages/Auth/NewPassword';
import SignIn from './Pages/Auth/SignIn';
import Calendar_Page from './Pages/Schedule_Interview/Calendar_Page';
import User_Profile from './Pages/Profile/User_Profile';
import New_Feeds from './Pages/New_Feeds';
import ProtectedRoute from './Utils/ProtectedRoute';
import { useEffect } from 'react';
import { getUserData } from './APIs/User_API';
import showToast from './Utils/showToast';
import { decryptFromJson } from './Utils/functions';
import { getUserSuccess } from './Redux/user/userSlice';
import { useDispatch } from 'react-redux';
import GoogleAuthCallBack from './Pages/Auth/GoogleAuthCallBack';
import SinglePost from './Pages/SinglePost';
import Discussion from "./Pages/Discussion/Discussion";

const getLoginUser = async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }

  const userData = await getUserData(token);

  if (userData.success === false) {

    showToast({
      msg: userData.msg,
      type: 'error',
      duration: 3000,
    });

  } else {

    if (userData.success === false) {
      showToast({
        msg: userData.msg,
        type: 'error',
        duration: 2000,
      });
      return;
    }

    const decryptedData = decryptFromJson(userData.data);

    dispatch(getUserSuccess(decryptedData));
  }
}




const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getLoginUser(dispatch);
  }, []);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<NewPassword />} />


          <Route path='/' element={<ProtectedRoute ele={<Home />} />} />
          <Route path="/mock-interview" element={<ProtectedRoute ele={<Mock_Interview />} />} />
          <Route path='/mock-interview/:role/:user_id' element={<ProtectedRoute ele={<MockInterviewProfile />} />} />
          <Route path="/test" element={<ProtectedRoute ele={<Interviewer_Card />} />} />   {/* Use to test component */}
          <Route path="*" element={<NotFound />} />
          <Route path="/mock-interview/schedule/:user" element={<ProtectedRoute ele={<Calendar_Page />} />} />
          <Route path="/user/profile/:role/:id" element={<ProtectedRoute ele={<User_Profile />} />} />
          <Route path="/new-feeds" element={<ProtectedRoute ele={<New_Feeds />} />} />
          <Route path="/post/:id" element={<ProtectedRoute ele={<SinglePost />} />} />
          <Route
            path="/discuss"
            element={<ProtectedRoute ele={<Discussion />} />}
          />

          <Route path="/google/auth/callback" element={<GoogleAuthCallBack />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
