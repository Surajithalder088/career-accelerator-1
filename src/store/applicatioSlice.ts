import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:Number[]=[]

const applicationSlice =createSlice({
    name:"applications",
    initialState,
    reducers:{
        addApplication:(state,action:PayloadAction<Number>)=>{
            state.push(action.payload)
        }
    }
})

export const {addApplication} =applicationSlice.actions
export default applicationSlice.reducer