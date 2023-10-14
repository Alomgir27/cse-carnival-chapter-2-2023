import { configureStore } from "@reduxjs/toolkit";
//middleware
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: {
       
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== "production",
});