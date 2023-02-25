import {createSlice} from "@reduxjs/toolkit"

const initialState={
    token:undefined,
    user:undefined,
};

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLoggedIn:(state,action)=>{
            state.token= action.payload.token;
            state.user=action.payload.user;
        },
        userLoggedOut:(state,action)=>{
            state.token= undefined;
            state.user= undefined;
        },
    }
})


export const {userLoggedIn,userLoggedOut}= authSlice.actions;
export default authSlice.reducer;