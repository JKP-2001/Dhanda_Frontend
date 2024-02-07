import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import instructerReducer from "./instructers/instructerSlice"
import companyWiseInstructorReducer from "./instructers/companyWiseInstructorSlice"


const store = configureStore({

    reducer: {
        user: userReducer,
        instructers:instructerReducer,
        companyWiseInstructor:companyWiseInstructorReducer
    },
});

export default store