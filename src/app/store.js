import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice"
import modalSliceReducer from "../features/modal/modalSlice"
import paginationSlice from "../features/pagination/paginationSlice";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        modal: modalSliceReducer,
        pagination: paginationSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});