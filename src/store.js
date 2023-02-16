import { configureStore } from "@reduxjs/toolkit";
import authReduser from "./redux/slices/authSlices";


export const store = configureStore({
    reducer: {
        auth: authReduser,
    },
});

