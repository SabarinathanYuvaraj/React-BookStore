import { createSlice } from "@reduxjs/toolkit";

const LoadSlice = createSlice({
    name:"load",
    initialState:{
        pageLoads: true,
        pageLoadsWishList: true,
        
    },
    reducers:{
        setLoaded:(state:any,action) =>{  
            state.pageLoads = (action.payload);
        },
        setLoadedWishList:(state:any,action) =>{  
            state.pageLoadsWishList = (action.payload);
        },
    }
})

export const{ setLoaded,setLoadedWishList } = LoadSlice.actions;
export default LoadSlice.reducer;