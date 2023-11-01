import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import data from "./data";
//middleware
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: {
        data: data,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== "production",
});