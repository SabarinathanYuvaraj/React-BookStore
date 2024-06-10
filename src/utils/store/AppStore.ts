import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "./BookSlice";
import CartSlice from "./CartSlice";
import WishListSlice from "./WishListSlice";
import LoadSlice from "./LoadSlice";
import AddressSlice from "./AddressSlice";

const appStore = configureStore({
    reducer : {
        book : BookSlice,
        cart : CartSlice,
        wishList : WishListSlice,
        pageload:LoadSlice,
        address : AddressSlice,
    }
});

export default appStore