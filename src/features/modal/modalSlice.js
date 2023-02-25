import {createSlice} from "@reduxjs/toolkit"

const initialState={
    isOpen:false,
    editBill:{}
};

const modalSlice =createSlice({
    name:'modal',
    initialState,
    reducers:{
        addModelEditBill:(state,action)=>{
            state.isOpen= true;
            state.editBill=action.payload;
        },
        removeModelEditBill:(state,action)=>{
            state.isOpen=false;
            state.editBill={};
        },
        addModalNewBill:(state,action)=>{
            state.isOpen=true;
            state.editBill={};
        }
    }
})

export const {addModalNewBill,addModelEditBill,removeModelEditBill}= modalSlice.actions;
export default modalSlice.reducer;