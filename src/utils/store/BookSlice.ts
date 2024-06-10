import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name : "book",
    initialState : {
        bookItems : [],
    },
    reducers : {
        addItemToBooks: (state : any, action) => {
          state.bookItems= action.payload;
        },
    }
})
export const {addItemToBooks} = bookSlice.actions;
export default bookSlice.reducer