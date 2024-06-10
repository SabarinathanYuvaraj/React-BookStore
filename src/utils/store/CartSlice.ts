import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        cartItems : [],
    },
    reducers : {
        addItemToCart: (state : any, action) => {
          state.cartItems.push(action.payload);
        },
        updateCartQuantity : (state : any , action) => {
            state.cartItems = state.cartItems.map((cartBook : any) =>{
            if(cartBook._id == action.payload.itemId){
                return {...cartBook,quantityToBuy: action.payload.updatedQuantity}
          }
          return cartBook
         })
        },
        deleteCartItem: (state : any, action) => {
            state.cartItems = state.cartItems.filter((book : any) => book._id != action.payload)
        },
        putCartItem : (state : any , action) => {
            state.cartItems = action.payload
        }
    }
})
export const {addItemToCart,updateCartQuantity,deleteCartItem,putCartItem} = cartSlice.actions;
export default cartSlice.reducer