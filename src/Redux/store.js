import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import instructerReducer from "./instructers/instructerSlice"
import postReducer from "./post/postSlice"
import searchUserReducer from "./searchUser/searchUser"
import paymentReducer from "./payment/paymentSlice"
import bookingReducer from "./bookings/bookingSlice"


const store = configureStore({

    reducer: {
        user: userReducer,
        instructers: instructerReducer,
        post: postReducer,
        searchUser: searchUserReducer,
        payment: paymentReducer,
        booking: bookingReducer
    },
});

export default store