import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSlots, AccordionSummary, Button, Fade, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity} from "../utils/store/CartSlice";
import { removeCartList, updateCartList, getCartList } from "../utils/BookService";
import displayImg from '../assets/Image 11.png';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const CartBookCardComponent = ({ book, index }: { book: any; index: number }) => {
  console.log(book._id);
  console.log(book.quantityToBuy);
  console.log(book);
  const dispatch = useDispatch();
  const cartItems = useSelector((store: any) => store.cart.cartItems);
  const cartBook = cartItems.filter((cartbook: any) => cartbook._id === book._id)[0]
  
  const token  = localStorage.getItem("accessToken")

  const removeItem = async () => {
    const res = await removeCartList(book.cartId!);
    console.log(res);
    dispatch(deleteCartItem(book._id));
  };

  const IncrementQuantity = () => {
    let updatedQuntity = cartBook.quantityToBuy;
    if (updatedQuntity <= book.product_id.quantity) {
      updatedQuntity++;
      dispatch(
        updateCartQuantity({ itemId: book._id, updatedQuantity: updatedQuntity })
      );
      updateCartList(book.cartId, updatedQuntity);
    }
  };

  const decrementQuantity = () => {
    let updatedQuntity = cartBook.quantityToBuy;
    if (updatedQuntity > 1) {
      updatedQuntity--;
      dispatch(
        updateCartQuantity({ itemId: book._id, updatedQuantity: updatedQuntity })
      );
      updateCartList(book.cartId, updatedQuntity);
    }
  };


  return (
    <div>
      <div className="flex gap-10 w-[890px] mt-[10px] h-[190px] font-[Roboto] align-center" >
        <img src={displayImg} alt={`${book.bookName} Img`} className="w-[80px] h-[100px] mt-[20px] ml-[20px]" />
        <div className="flex flex-col gap-2 w-[600px] ml-[50px]">
          <div className="flex mt-[20px] ">

            <h1 className="font-semibold">{book.bookName}</h1>
            {/* <DeleteIcon
              onClick={removeItem}
              sx={{
                marginLeft: '450px',
                color: '#E4E4E4',
                '&:hover': {
                  color: 'blue',
                },
              }}
            /> */}
          </div>
    
          <p className="text-[#878787] text-sm text-start">by {book.author}</p>
          <div className="flex items-center gap-0.5">
            <h1 className="text-[18px] font-bold">Rs.{book.discountPrice}</h1>
            <p className="line-through text-[12px] text-[#878787] ml-[5px]">Rs.{book.price}</p>
          </div>
            <div className="flex">
            <div className='flex gap-1 items-center ml-[-10px]'>
            <IconButton onClick={decrementQuantity} disabled={book.quantityToBuy === 1 ? true : false}>
              <RemoveCircleOutline />
            </IconButton>

            <div className='w-[40px] h-[28px] text-center border-2 rounded'>{book.quantityToBuy}</div>

            {token ? (<IconButton onClick={IncrementQuantity} disabled={book.quantityToBuy < book.product_id.quantity ? false : true}>
              <AddCircleOutline />
            </IconButton>) : <IconButton onClick={IncrementQuantity} disabled={book.quantityToBuy < book.quantity ? false : true}>
              <AddCircleOutline />
            </IconButton>}

          </div>
          <div className="flex items-center ml-[20px] cursor-pointer font-medium" onClick={removeItem} >Remove</div>
            </div>
        </div>
      </div>
      <div>
     
    </div>
  
    </div>
  )};

export default CartBookCardComponent;