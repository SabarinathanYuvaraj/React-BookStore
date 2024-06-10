import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const addressSlice = createSlice({
    name : "address",
    initialState : {
        addressItems : [],
    },
    reducers : {
        addItemToAddress: (state : any, action) => {
          state.addressItems.push(action.payload);
        },
        editItemToAddress: (state : any, action) => {
        state.addressItems[action.payload.index] = action.payload.addressObj
          },
    }
})
export const {addItemToAddress,editItemToAddress} = addressSlice.actions;
export default addressSlice.reducer