import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pagination: {
        currentPage: 1,
        limit: 10,
        totalCount: 1,
    },
    paginatedData:[],
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pagination.currentPage = parseInt(action.payload) || 1;
        },
        setTotalCount: (state, action) => {
            state.pagination.totalCount = parseInt(action.payload) || 1;
        },
        addpaginatedData:(state, action)=>{
            state.paginatedData=action.payload
        },
    },
});

export const {setPage,setTotalCount,addpaginatedData } = paginationSlice.actions;
export default paginationSlice.reducer;