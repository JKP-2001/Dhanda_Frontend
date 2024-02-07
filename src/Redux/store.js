import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import instructerReducer from "./instructers/instructerSlice"
import companyWiseInstructorReducer from "./instructers/companyWiseInstructorSlice"
import postReducer from "./post/postSlice";


const store = configureStore({

    reducer: {
        user: userReducer,
        instructers:instructerReducer,
        companyWiseInstructor:companyWiseInstructorReducer,
        posts:postReducer
    },
});

export default store