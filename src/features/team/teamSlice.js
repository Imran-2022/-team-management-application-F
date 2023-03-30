import {createSlice} from "@reduxjs/toolkit"

const initialState={
    token:[],
};

const teamSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{}
})

export default teamSlice.reducer;