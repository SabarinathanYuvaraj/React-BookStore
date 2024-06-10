import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { HeartBroken } from "@mui/icons-material";
import WishListCard from "./WishListCard";
import { useEffect } from "react";

function WishList() {
    
  const WishListItems = useSelector((store: any) => store.wishList.wishListItems);

  console.log('WishList Iemss',WishListItems);
  
  useEffect(()=>{
  
  },[WishListItems])


  return (
    <div className="w-full h-full flex justify-center mb-[178px]">
        <div className="w-[80%] font-[Roboto]">
          <div className="mt-[20px] ml-[-1090px]">
            <Link to={"/dashboard/"} className="text-[#9D9D9D]">
              Home /
            </Link>
            <span> My Wishlist</span>
          </div>
          <div className="w-full mt-5 min-h-[250px] border-[#707070] border">
            <div className="text-lg font-semibold py-5 px-10 bg-[#F5F5F5] text-start">
              My Wishlist ({WishListItems.length})
            </div>
            <div className="flex flex-col mt-[20px]">
              {WishListItems?.length ? (
                WishListItems.map((book: any, index: number) => (
                  <WishListCard key={index} book={book} />
                ))
              ) : (
                <div className="flex h-[180px] justify-center items-center gap-2">
                  <HeartBroken />
                  <h1 className="text-xl">Your Wishlist is Empty!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
   
    </div>
  );
}

export default WishList;