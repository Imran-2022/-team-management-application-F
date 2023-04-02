import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchProjects: '',
};

const teamSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        filterBySearch: (state, action) => {
            state.searchProjects = action.payload;
        },
    },
});

export const { filterBySearch } = teamSlice.actions;

export default teamSlice.reducer;