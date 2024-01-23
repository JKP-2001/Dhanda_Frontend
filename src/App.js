
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
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





function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/mock-interview" element={<Mock_Interview />} />
          <Route path='/mock-interview/:user_id' element={<MockInterviewProfile />} />
          <Route path="/test" element={<Interviewer_Card />} />   {/* Use to test component */}
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<NewPassword />} />
          <Route path="/mock-interview/schedule/:user" element={<Calendar_Page />} />
          <Route path="/user/profile/:user" element={<User_Profile />} />
          <Route path="/new-feeds" element={<New_Feeds />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
