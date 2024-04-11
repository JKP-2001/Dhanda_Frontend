import "./App.css";
import { lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoute from "./Utils/ProtectedRoute";
import { getUserData } from "./APIs/User_API";
import showToast from "./Utils/showToast";
import { decryptFromJson } from "./Utils/functions";
import { getUserSuccess } from "./Redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";


import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import GoogleAuthCallBack from "./Pages/Auth/GoogleAuthCallBack";
import Loader from "./Utils/Loader";

const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
const NewPassword = lazy(() => import("./Pages/Auth/NewPassword"));
const SignIn = lazy(() => import("./Pages/Auth/SignIn"));
const Calendar_Page = lazy(() => import("./Pages/Schedule_Interview/Calendar_Page"));
const User_Profile = lazy(() => import("./Pages/Profile/User_Profile"));
const PaymentPage = lazy(() => import("./Pages/Payment/PaymentPage"));
const BookingPage = lazy(() => import("./Pages/Booking/BookingPage.jsx"));
const DM = lazy(() => import("./Pages/Profile/DM"));
const TimeSlotPage = lazy(() => import("./Pages/Profile/TimeSlotPage.jsx"));
const Contact = lazy(() => import("./Pages/Contact"));
const MockInterviewProfile = lazy(() => import("./Pages/Mock_Interviewer/MockInterviewProfile.jsx"));
const Mock_Interview = lazy(() => import("./Pages/Mock_Interview/Mock_Interview.jsx"));
const Interviewer_Card = lazy(() => import("./Components/Mock_Interview/Interviewer_Card.jsx"));




export const getLoginUser = async (dispatch, navigate) => {
  const token = localStorage.getItem("token");

  const excludedLinks = ["/signin", "/signup", "/"];

  if (excludedLinks.includes(window.location.pathname)) {
    return;
  }

  if (!token) {
    navigate("/signin");
    showToast({
      msg: "Please login first.",
      type: "error",
      duration: 3000,
    });
    return;
  }

  const userData = await getUserData(token);

  if (userData.success === false) {
    localStorage.removeItem("token");
    showToast({
      msg: userData.msg,
      type: "error",
      duration: 3000,
    });
    navigate("/signin");
    showToast({
      msg: "Please login first.",
      type: "error",
      duration: 3000,
    });
    return;
  } else {
    if (userData.success === false) {
      showToast({
        msg: userData.msg,
        type: "error",
        duration: 2000,
      });
      return;
    }

    const decryptedData = decryptFromJson(userData.data);

    dispatch(getUserSuccess(decryptedData));
  }
};

const App = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  return (
    <>
      <Toaster />
      <Router>
        <Routes>

          <Route path="/signin" element={
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>} />

          <Route path="/contact-us" element={
            <Suspense fallback={<Loader />}>
              <Contact />
            </Suspense>} />

          <Route path="/signup" element={
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>} />


          <Route path="/forgot-password" element={
            <Suspense fallback={<Loader />}>
              <ForgotPassword />
            </Suspense>} />

          <Route path="/reset-password" element={
            <Suspense fallback={<Loader />}>
              <NewPassword />
            </Suspense>} />

          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute ele={<Home />} />
            </Suspense>} />

          <Route
            path="/mock-interview"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute ele={<Mock_Interview />} />
              </Suspense>
            }
          />

          <Route
            path="/mock-interview/:role/:user_id"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute ele={<MockInterviewProfile />} />
              </Suspense>
            }
          />


          <Route
            path="/payment"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute ele={<PaymentPage />} />
              </Suspense>}
          />


          <Route path="/dm" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute ele={<DM />} />
            </Suspense>} />


          <Route
            path="/bookings"
            element={<Suspense fallback={<Loader />}>
              <ProtectedRoute ele={<BookingPage />} />
            </Suspense>}
          />


          <Route
            path="/time-slots"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute ele={<TimeSlotPage />} />
              </Suspense>}
          />

          <Route
            path="/test"
            element={<Suspense fallback={<Loader />}>
              <ProtectedRoute ele={<Interviewer_Card />} />
            </Suspense>}
          />


          {/* Use to test component */}
          <Route path="*" element={<NotFound />} />

          <Route
            path="/mock-interview/schedule/:user"
            element={<Suspense fallback={<Loader />}>
              <ProtectedRoute ele={<Calendar_Page />} />
            </Suspense>}
          />

          <Route
            path="/user/profile/:role/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute ele={<User_Profile />} />
              </Suspense>
            }
          />

          <Route
            path="/google/auth/callback"
            element={
              <Suspense fallback={<Loader />}>
                <GoogleAuthCallBack />
              </Suspense>
            }
          />


          {/* <Route
            path="/new-feeds"
            element={<ProtectedRoute ele={<New_Feeds />} />}
          /> */}
          {/* <Route
            path="/discuss/:discussId"
            element={<ProtectedRoute ele={<DiscussionPostDetails />} />}
          /> */}
          {/* <Route
            path="/post/:id"
            element={<ProtectedRoute ele={<SinglePost />} />}
          /> */}
          {/* <Route
            path="/discuss"
            element={<ProtectedRoute ele={<Discussion />} />}
          /> */}

        </Routes>
      </Router>
    </>
  );
};

export default App;
