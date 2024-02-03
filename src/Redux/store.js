import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import instructerReducer from "./instructers/instructerSlice"


const store = configureStore({

    reducer: {
        user: userReducer,
        instructers:instructerReducer
    },
});

export default store