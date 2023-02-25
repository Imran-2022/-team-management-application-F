import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchKey:undefined,
    searchResult:undefined,
};

const searchSlice = createSlice({
    name: "search",
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

export const {setPage,setTotalCount,addpaginatedData } = searchSlice.actions;
export default searchSlice.reducer;