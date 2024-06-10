import { Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Image1 from '../assets/Image 11.png';
import Image8 from '../assets/Image 8.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBooks } from '../utils/store/BookSlice';
import { useEffect, useState } from 'react';
import { AddCircleOutline, Favorite, RemoveCircleOutline } from '@mui/icons-material';
import { addItemToCart, updateCartQuantity } from '../utils/store/CartSlice';
import { addItemToWishList } from '../utils/store/WishListSlice';
import { addCartList, addWishList, getCartList, updateCartList } from '../utils/BookService';


interface Book{
    description : string;
    bookName : string;
    title : string;
    author : string;
    quantity: number;
    rating: number;
    discountPrice: number;
    price: number;
    _id: string;
}

function BookDetails(){

const navigate = useNavigate()
const dispatch = useDispatch()

const navigateToBooks = () => {
  navigate("/dashboard/")
}

  const BookId = useParams();
  console.log(BookId);
  console.log(BookId.bookId);

  const cartItems = useSelector((store: any) => store.cart.cartItems);
  console.log(cartItems);


  
  const token = localStorage.getItem('accessToken')
  const[bookData, setBookData] = useState<Book>()
  const[cartData, setCartData] = useState<Book>()
  const[addToBag, setAddToBag] = useState(false)
  const[updateQuantity , setUpdateQuantity] = useState(0)
  const[wishList, setWishList] = useState(false)


  const bookList  = useSelector((store : any) => store.book.bookItems)
  const cartList =  useSelector((store : any) => store.cart.cartItems)
  const wishListItems = useSelector((store : any) => store.wishList.wishListItems)
  console.log(cartList);
  console.log(cartList[0]);

  console.log(wishListItems);



  const cartId = cartList?.filter((book : any) => book?.product_id?._id === BookId.bookId)[0]
  console.log(cartId);
  
  const noTokenCartId = cartList?.filter((book : any) => book?._id === BookId.bookId)[0]
  console.log(noTokenCartId);



  const wishListId = wishListItems?.filter((book : any) => book?.product_id?._id === BookId.bookId)[0]
  console.log(wishListId);

  useEffect(() => {
    setBookData(bookList.find((book : any)=> book?._id === BookId.bookId))
    if(wishListId?._id){
        setWishList(true)
    }

   else if (cartId?.cartId) {
      setAddToBag(true);
    }
  },[BookId, bookList,cartList,cartId,wishList,wishListId])



  const addToCart = async() => {
    if(localStorage.getItem("accessToken")){
      const newCartItems = await addCartList(BookId.bookId!);
      console.log(newCartItems)
    }
    dispatch(addItemToCart({...bookData,quantityToBuy:1}))
    setAddToBag(true)
    
  }

  // const getCartData = async() => {
  //   const cartData = await getCartList()
  //   console.log(cartData);
  // }

  // useEffect(() => {
  //   getCartData()
  // },[])

  // const token = localStorage.getItem("accessToken")
  console.log(token);




   const incrementCartQuantity = async()=> {
    const cartData = cartList?.filter((book : any)=> book?._id === BookId.bookId)[0]
    console.log(cartData);
    // console.log(cartData.product_id.quantity);

   
    if(localStorage.getItem("accessToken")){
      let updateQuantity = cartData.quantityToBuy;
      updateQuantity++;
      setUpdateQuantity(updateQuantity)
      if(updateQuantity > cartData.product_id.quantity){
        return
      }
      
      const updateCart = await  updateCartList(cartData?.cartId, updateQuantity ) 
      console.log(updateCart); 
      dispatch(updateCartQuantity({itemId : BookId.bookId , updatedQuantity : updateQuantity}))

      }
      else{
        let updateQuantity = cartData.quantityToBuy;
        console.log(updateQuantity);
        updateQuantity++;
        if(updateQuantity > cartData.quantity){
          return
        }

        dispatch(updateCartQuantity({itemId : BookId.bookId , updatedQuantity : updateQuantity}))

      }
   }

   const decrementCartQuantity = async()=> {
    const cartData = cartList?.filter((book : any)=> book?._id === BookId.bookId)[0]

 
   if(localStorage.getItem("accessToken")){
    let updateQuantity = cartData.quantityToBuy;
    if(updateQuantity ){
      updateQuantity--;
      if(updateQuantity == 0){
         setAddToBag(false)
         return
       }
    }
    
    setUpdateQuantity(updateQuantity)
    console.log(updateQuantity);
    const updateCart = await  updateCartList(cartData?.cartId ,updateQuantity ) 
    console.log(updateCart); 
    dispatch(updateCartQuantity({itemId : BookId.bookId , updatedQuantity : updateQuantity}))
    }  
    else{
      let updateQuantity = cartData.quantityToBuy;
      if(updateQuantity ){
        updateQuantity--;
        if(updateQuantity == 0){
           setAddToBag(false)
           return
         }
      }
      dispatch(updateCartQuantity({itemId : BookId.bookId , updatedQuantity : updateQuantity}))

    }
    // const updateCart = await updateCartList(BookId.bookId! ,updateQuantity )
    // console.log(updateCart);
   }


// useEffect(()=>{
//   updateCart()
// },[])

// const updateCart = async() => {
//   const updatedCartData = await updateCartList(BookId.bookId! ,updateQuantity )
//   console.log(updatedCartData);
// }


   const handleWishList = () => {
     addWishList(BookId.bookId!);
    // console.log(wishList);
    dispatch(addItemToWishList(bookData));
    setWishList(true);
  };





    return(
        <>
            <div className="flex ml-[12%] mt-[19px] ">
                <span className="text-[12px] text-gray-400 cursor-pointer" onClick={navigateToBooks}>Home /</span>
                <span className="text-[12px] ml-[2.5px] font-semibold brightness-75 contrast-75">Book(01)</span>
            </div>

            <div className="flex ml-[12%] mt-[2%]  mb-[50px]">
                <div className="flex">
                    <div className="  flex-col">
                    <div className=" flex h-[55px]   w-[43px]   border-2 items-center justify-center  ">
                    <img src={Image1} className='h-[90%] w-[90%]' alt="" />

                    </div>
                    <div className=" flex  h-[55px]   w-[43px] mt-[-2px]  border-2 items-center justify-center ">
                    <img src={Image8} className='h-[90%] w-[90%]' alt="" />

                    </div>
                    </div>
                    <div className='flex flex-col'>
                    <div className="flex flex-col  h-[380px]  w-[350px]  items-center justify-center   border-2 ">
                        <img src={Image1} className='h-[90%] w-[77%]' alt="" />
                    </div>
                    <div className='flex justify-between mt-[5%]'>

                    {addToBag ? (
              <div className="h-[40px] flex gap-1 items-center">
                <IconButton
                onClick={decrementCartQuantity}
                >
                  <RemoveCircleOutline fontSize="large" />
                </IconButton>
                {token ? (
                <div className="w-[66px] h-[38px] p-1 text-center border-2 rounded">
                  {cartId?.quantityToBuy}
                </div>
              ) : (
                <div className="w-[66px] h-[38px] p-1 text-center border-2 rounded">
                  {noTokenCartId?.quantityToBuy}
                </div>
              )}

                <IconButton
                onClick={incrementCartQuantity}>
                    <AddCircleOutline fontSize="large" />
                  </IconButton>
                </div> ):(
                        <button className=' text-white py-1 px-4 w-[47%]' onClick={addToCart} style={{backgroundColor : "#A03037"}}>ADD TO CART</button>

               )}
                {wishList ? (
              <div className="w-[170px] h-[40px] bg-[#e2e2e2] text-black text-center p-[7px] rounded">
                <div className="flex justify-center items-center">
                  <Favorite sx={{ color: "red" }} />
                  Added To Wishlist!
                </div>
              </div>
            ) : (
                        <button className=' text-white py-1 px-4 w-[47%]' style={{backgroundColor : "#373434"}}  onClick={handleWishList}> <FavoriteIcon className='mr-[10%]' style={{height : "18px" , width : "18px"}}/>WISHLIST</button>

               ) }</div>
                    </div>
                </div>
                <div className='flex-col ml-[4%] w-[551px] '>
                <div className="flex  flex-col gap-[4px] items-start  ">
                    <span className="text-[26px] font-semibold brightness-55 contrast-55 opacity-66">{bookData?.bookName}</span>
                    <span className="text-[17px] text-gray-400">{bookData?.author}</span>
                    <div className='flex items-center justify-center'>
                    <div className="h-[20px] w-[45px] flex items-center justify-center" style={{ backgroundColor: "#388E3C"}}>
                        <span className="text-[13px] " style={{color : "#FFFFFF"}}>4.5</span>
                        <StarIcon  style={{ height: "15px", width: "12.5px", color : "#FFFFFF"}}/>
                    </div>
                    <span className='text-[13px] text-gray-400 ml-[8px]'>{`(${bookData?.quantity})`}</span>
                    </div>  
                    <div className='flex items-center justify-center gap-[12px] mt-[6px]'>
                        <span className='text-[28px] font-semibold brightness-75 contrast-75'>Rs. {bookData?.discountPrice}</span>
                        <span className='text-[14px] text-gray-400 line-through'>Rs. {bookData?.price}</span>
                    </div>
                    <div className="w-[551px] h-[1.6px] bg-[#c8c8c8] rounded mt-[5px]" />
                    <li className='text-[#878787] mt-5'><span className='relative left-[-10px]'>Book Detail</span></li>
                    <p className='text-[#373434] text-xs ml-[10px] mt-[5px] font-medium'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate unde excepturi, qui est doloribus facilis earum itaque voluptatibus laborum illo nemo voluptatem, possimus nobis architecto neque? Nam molestiae eos earum?
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate unde excepturi, qui est doloribus facilis earum itaque voluptatibus laborum illo nemo voluptatem, possimus  </p>
                    <div className="w-[551px] h-[1.6px] bg-[#c8c8c8] rounded mt-[18px]" />
                    <p className='text-lg font-medium mt-[10px]'>Customer Feedback</p>
                    <div className='flex flex-col gap-2 w-[560px] h-[192px] bg-[#F5F5F5] p-2 items-start'>
                                    <span>Overall rating</span>
                                    <div className='flex-col'>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>

                                    </div>
                                    <div>
                                        <div className='w-[528px] h-[64px] bg-white'>
                                            <input id='comment' className='text-[#707070] w-[500px]  outline-none' placeholder='Write your review' />
                                        </div>
                                        <div className='flex justify-end px-4 mt-[10px]'><Button variant='contained' size='small' sx={{ width: '76px', backgroundColor: "#3371B5" }} >Submit</Button></div>
                                    </div>
                                </div>
                                <div className='w-full flex gap-5 mt-[10px]  items-center'>
                                <div className="border w-[40px] h-[40px] border-[#E4E4E4] bg-[#F5F5F5] rounded-full flex justify-center items-center">
                                <h1 className="text-xs text-[#707070]">AC</h1>
                                </div>
                                <h1 className="font-bold">Aniket Chile</h1>
                                </div>
                                <div className='flex-col ml-[50px]'>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>

                                    </div>
                                    <p className="text-wrap text-sm text-slate-500 text-xs ">Good product.Even though the translation could have been better, chankya'sneeti are thought provoking. Chanakya has written on many different topics and his writtings</p>
                                    <div className='w-full flex gap-5 mt-[10px]  items-center'>
                                <div className="border w-[40px] h-[40px] border-[#E4E4E4] bg-[#F5F5F5] rounded-full flex justify-center items-center">
                                <h1 className="text-xs text-[#707070]">SB</h1>
                                </div>
                                <h1 className="font-bold">Shweta Bodkar</h1>
                                </div>
                                <div className='flex-col ml-[50px]'>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>
                                      <StarBorderIcon className='text-gray-400'/>

                                    </div>
                                    <p className="text-wrap text-sm text-slate-500 text-xs ">Good product.Even though the translation could have been better, chankya'sneeti are thought provoking. Chanakya has written on many different topics and his writtings</p>


                </div>
                </div>
            </div>
            </>
    )
}
export default BookDetails;