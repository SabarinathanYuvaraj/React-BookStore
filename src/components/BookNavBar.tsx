import educationIcon from '../assets/education.svg';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBooks } from '../utils/store/BookSlice';
import { addCartList, getBookList, getCartList, getWishlistItems, updateCartList } from '../utils/BookService';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Avatar, Box, Button, FormHelperText, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput, TextField } from '@mui/material';
import Logo from '../assets/shoppingCart.png';
import { createUser, loginUser } from '../utils/UserService';
import { BorderRight, FavoriteBorder, MarkunreadMailboxOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import { addItemToCart, putCartItem, updateCartQuantity } from '../utils/store/CartSlice';
import { putWishList } from '../utils/store/WishListSlice';
import LoginOrSignUp from './LoginOrSignUp';

interface IError {
  msg: string;
  param: string;
}

interface SignUpDetails {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

function BookNavBar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const [sign, setSign] = useState(true);
  const [emailValidator, setEmailValidator] = useState(false);
  const [passwordValidator, setPasswordValidator] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(Array<IError>);
  const [showPassword, setShowPassword] = useState(false);
  const[accessToken, setAccessToken] = useState(false)
  const[name,setName] = useState("")

  const myName = localStorage.getItem("myName")
  console.log(name);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

    useEffect( () => {
      getAccessToken();

    },[])

    const getAccessToken = () => {
    const token =  localStorage.getItem("accessToken")
      if(token !== null && token!= "" ){
        setAccessToken(true)
        console.log(token);
      }
    }

    // const carts = useSelector((store : any) => store.cart.cartItems)
    // console.log(carts);

    // const getNotes = async() => {
    //   try{
    //     const res = await getCartList()
    //     console.log(res);

    //   dispatch(putCartItem(res))
    //   }catch(err){
    //     console.error(err)
    //   }


    // }

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogout = ()=>{
      setProfile(true)
      localStorage.removeItem("accessToken")
    }




    const navigateToCart = () => {
      navigate("/dashboard/cart");
    };

    const navigateToBooks = () => {
      navigate("/dashboard/");
    };

    const dispatch = useDispatch();


    useEffect(() => {
      fetchBookList();
    }, []);


    const getCartDetails = async () => {
      const response = await getCartList();
      console.log(response);
      if(response.length){
        setProfile(false)
        setName(response[0].user_id.fullName)
        localStorage.setItem("myName",response[0].user_id.fullName)
        console.log(response[0].user_id.fullName);
      }
      const bookList = response.map((cartBook: any) => {
        return {
          ...cartBook,
          bookName: cartBook.product_id.bookName,
          author: cartBook.product_id.author,
          price: cartBook.product_id.price,
          discountPrice: cartBook.product_id.discountPrice,
          _id: cartBook.product_id._id,
          cartId: cartBook._id,
          quantityToBuy: cartBook.quantityToBuy,
          user_id: cartBook.user_id,
          quantity : cartBook.product_id.quantity
        };
      });
      console.log(bookList);
      dispatch(putCartItem(bookList));
    };

    const wishListDetails = async() => {
      const response = await getWishlistItems();
      console.log(response);
      dispatch(putWishList(response))
    }


   

    useEffect(()=> {
      if(localStorage.getItem("accessToken")){
        getCartDetails()
        wishListDetails()
        setProfile(false)
      }
    },[])



    const fetchBookList = async () => {
      try {
        const res = await getBookList();
        if (res !== "") {
          dispatch(addItemToBooks(res));
          console.log(res);
        }
      } catch (err) {
        console.error(err);
      }
    };




  return (
    <>
      <div
        className="nav-bar h-10 sm:h-12 lg:h-14 w-full bg-gray-400 flex items-center"
        style={{ backgroundColor: "#A03037" }}
      >
        <div
          className="ml-4 sm:ml-8 lg:ml-20 xl:ml-40 w-24 sm:w-32 lg:w-40 xl:w-52 flex items-center gap-2 cursor-pointer"
          onClick={navigateToBooks}
        >
          <img src={educationIcon} alt="" className="h-6 sm:h-8 lg:h-6 w-4 sm:w-8 lg:w-10" />
          <span className="text-white text-[12px] sm:text-[16px] lg:text-lg xl:text-xl">Bookstore</span>
        </div>
        <div
          className="ml-4 sm:ml-2 h-7 lg:ml-12 xl:ml-30 w-full sm:w-80 lg:w-[450px] h-10 sm:h-9 flex items-center"
          style={{ backgroundColor: "#FFFFFF", borderRadius: "3px" }}
        >
          <SearchIcon className="ml-2 sm:ml-3 text-gray-400" />
          <input
            type="text"
            className="w-full h-full ml-2 sm:ml-3 mr-[10px] outline-none"
            placeholder="Search"
          />
        </div>
        {/* <div className="flex ml-auto mr-4 sm:mr-8 lg:mr-[7rem] xl:mr-50 xl:gap-18 sm:gap-[5rem]"> */}
        <div className="flex ml-auto mr-[8rem] ">

         {accessToken ?  (
            <div className='text-white cursor-pointer h-full w-[120px] ' style={{ borderLeft: "1px solid #891a21", borderRight : "1px solid #891a21"}  }  onClick={handleClick} >
              <div><PersonOutlineIcon className="ml-2 sm:ml-3 text-white" style={{ height: "25px", width: "26px" }} /></div>
              <div className='text-[14px] ml-[5px] text-medium'>{name}</div>
              </div>
          ) : (<div className="flex flex-col cursor-pointer w-[120px]" style={{ borderLeft: "1px solid #891a21", borderRight : "1px solid #891a21"}  } onClick={handleClick} >
            <PersonOutlineIcon className="ml-[50px] text-white" style={{ height: "25px", width: "25px" }} />
            <span className="text-[14px] ml-[5px] text-medium text-white">Profile</span>
          </div>) 
          } 
          <div className="flex flex-col cursor-pointer  flex-center justify-center w-[83px]" style={{ borderRight : "1px solid #891a21"}  }  onClick={navigateToCart}>
            <ShoppingCartIcon className="ml-[33px] text-white mt-[4px] " style={{ height: "20px", width: "25px" }} />
            <span className="text-white text-[14px] ml-[7px] mt-[2px] ">Cart</span>
          </div>
        </div>

        {accessToken ?( <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem style={{backgroundColor : "white" , fontWeight : "600"}}>
                Hello {name}, 
                </MenuItem>
                <Link to={"/dashboard/profile"}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                </Link>
                <Link to={"/dashboard/myOrders"}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <MarkunreadMailboxOutlined fontSize="small" />
                    </ListItemIcon>
                    My Orders
                  </MenuItem>
                </Link>
                <Link to={"/dashboard/wishList"}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <FavoriteBorder fontSize="small" />
                    </ListItemIcon>
                    Wishlist
                  </MenuItem>
                </Link>
                
                  <MenuItem onClick={handleClose}>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "150px",
                        height: "40px",
                        borderColor: "#A03037",
                        color: "#A03037",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
              </Menu>) :
               (  
                <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                  <MenuItem style={{fontWeight : "600" ,backgroundColor: "white"
}}>
                     Welcome
                  </MenuItem> 
                  <MenuItem style={{color : "#878787"}}>
                  to access account and manage orders
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "140px",
                        height: "40px",
                        borderColor: "#A03037",
                        color: "#A03037",
                        borderRadius : "3px"
                      }}
                      onClick={() => setProfile(true)}
                    >
                      Login/SignUp
                    </Button>
                  </MenuItem>
                  <MenuItem>
                  <span className='w-[95%] h-[2px] mt-[5px]' style={{ backgroundColor : "rgba(0, 0, 0, 0.47)"}}></span>
                  </MenuItem>
                  <Link to={"/dashboard/myOrders"}>
                  <MenuItem style={{color : "#878787"}}>
                  My Orders
                  </MenuItem >
                  </Link>
                  <Link to={"/dashboard/wishList"}>
                  <MenuItem style={{color : "#878787"}}>
                  WishList
                  </MenuItem>
                    </Link>
              </Menu>
              )}
       

        <Modal 
        open={profile}
         onClose={() => setProfile(false)}
         >
          <LoginOrSignUp profile = {profile} setProfile = {setProfile}/>
        </Modal>
      </div>
    </>
  );
}

export default BookNavBar;
