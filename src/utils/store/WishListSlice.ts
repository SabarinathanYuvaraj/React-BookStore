import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name : "wishList",
    initialState : {
        wishListItems : [],
    },
    reducers : {
        putWishList: (state,action) => {
            state.wishListItems=action.payload
        },
        addItemToWishList: (state : any, action) => {
          state.wishListItems.push(action.payload);
        },
        deleteWishListItem: (state : any , action) => {
            state.wishListItems = state.wishListItems.filter((wishList : any) => wishList._id !== action.payload)
        }
    }
})
export const {addItemToWishList,deleteWishListItem,putWishList} = wishListSlice.actions;
export default wishListSlice.reducer