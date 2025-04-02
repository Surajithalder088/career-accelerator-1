import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    name:string;
    email:string;
    address:string;
    company:string;
    experience:string;
    id:string;
    isHR:boolean;
    
}

const initialState:UserState={
    name:"",
    email:"",
    address:"",
    company:"",
    experience:"",
    id:"",
    isHR:false,
    
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<UserState >)=>{
            state.name=action.payload.name
            state.email=action.payload.email
            state.address=action.payload.address
            state.company=action.payload.company
            state.experience=action.payload.experience
            state.id=action.payload.id
            state.isHR=action.payload.isHR

        },
        logout:(state)=>{
            state.name=""
            state.email=""
            state.address=""
            state.company=""
            state.experience=""
            state.id=""
            state.isHR=false
        }
    }
})

export const {login,logout} =userSlice.actions
export default userSlice.reducer