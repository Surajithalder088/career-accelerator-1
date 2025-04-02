import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice"
import applicationReducers from "./applicatioSlice"

export const store=configureStore({
    reducer:{
        user:userReducer,
        applications:applicationReducers
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch