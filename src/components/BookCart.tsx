import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartBook from "./CartBook";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Button, Modal } from "@mui/material";
import { deleteCartItem, putCartItem } from "../utils/store/CartSlice";
import AddressCard from "../components/AddressCard";
import EditDetails from "./EditDetails";
import OrderSummary from "./OrderSummary";
import { addOrder, removeCartList } from "../utils/BookService";
import LoginOrSignUp from "./LoginOrSignUp";

function CartComponent() {
  const cartItems = useSelector((store: any) => store.cart.cartItems);
  const books = useSelector((store: any) => store.book.bookItems);
  const addressItem = useSelector((store: any) => store.address.addressItems); 
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const[newAddress, setNewAddress] = useState(false)
  const [sign, setSign] = useState(true);
  const [profile, setProfile] = useState(false);
  console.log(cartItems[0]?.user_id?.address);
  console.log(cartItems[0]);
  console.log(addressItem);
  console.log(cartItems[0]?.user_id);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();


  const createAddress = ()=> {
    setNewAddress(true)
  }

  const placeOrder = () => {
    if (localStorage.getItem("accessToken")) {
      setExpanded(true);
    }
    else{
      setProfile(true)
    }
    
  };

  const orderAddress = () => {
    setExpanded2(true);
  };

  const orderCheckout = async () => {
    let storedData = [];
    const newOrder = cartItems.map(
      (book: any) =>
        (book = {
          product_id: book._id,
          product_name: book.bookName,
          product_quantity: book.quantityToBuy,
          product_price: book.discountPrice,
        })
    );

    const getOrderDate = await addOrder(newOrder);
    if (getOrderDate) {
      navigate("/orderPlaced");
    }
    if (localStorage.getItem("MyOrders")) {
      storedData = JSON.parse(localStorage.getItem("MyOrders")!);
    }
    const orderDate = getOrderDate[0].createdAt?.slice(0, 10);
    storedData.push(
      cartItems.map((book: any) => {
        return { ...book, orderDate: orderDate };
      })
    );
    localStorage.setItem("MyOrders", JSON.stringify(storedData));
    cartItems.map((book: any) => {
      removeCartList(book.cartId);
      dispatch(deleteCartItem(book._id));
    });
  };

  return (
    <div className="w-full h-full flex justify-center mb-[50px]">
      <div className="w-[80%] font-[Roboto]">
        <div className="mt-[20px] ml-[-1120px]">
          <Link to={"/dashboard/"} className="text-[#9D9D9D]">
            Home /
          </Link>
          <span> My Cart</span>
        </div>
        <div className="w-[80%] min-h-[250px] border-[#707070] border mt-[20px]">
          <div className="text-lg font-semibold py-5 px-10 bg-[#F5F5F5] text-start">
            My cart ({cartItems.length})
          </div>
          <div className="flex flex-col gap-2 p-5">
            {cartItems.length ? (
              cartItems.map((book: any, index: number) => (
                <CartBook key={index} book={book} index={index} />
              ))
            ) : (
              <center>
                <h1 className="text-xl">Your Cart is Empty! Add any Book to Cart!</h1>
              </center>
            )}
            <div className={cartItems.length && !expanded ? "flex justify-end" : "hidden"}>
              <Button
                variant="contained"
                sx={{ width: "160px", backgroundColor: "#3371B5" }}
                onClick={placeOrder}
              >
                Place order
              </Button>
            </div>
          </div>
        </div>
        <Accordion
          expanded={expanded}
          sx={{
            width: "80%",
            minHeight: "60px",
            marginTop: "10px",
            border: "1px solid #707070",
            color: "#333232",
          }}
        >
          <AccordionSummary  className=" font-semibold brightness-55 contrast-55" sx={{ fontWeight: 600, fontSize: "20px" }}>
            Customer Details
          </AccordionSummary>
          <AccordionDetails>
            <div>
            <div className=" ml-[20px] w-[76%] flex justify-between mt-[30px]">
                <div className="w-[48%] flex flex-col">
                  <label className="text-start ml-[10px] ">Full Name</label>
                  <span className="px-5 py-2 h-[50px]  border-2 text-start ml-[10px]" style={{color : "#333232"  }}>
                    {cartItems[0]?.user_id?.fullName}
                  </span>
                </div>
                <div className="w-[48%] flex flex-col">
                  <label className="text-start ml-[10px] ">Mobile Number</label>
                  <span className="px-5 py-2 h-[50px] border-2 text-start ml-[10px]" style={{color : "#333232"}}>
                    {cartItems[0]?.user_id?.phone}
                  </span>
                </div>
                
              </div>
              {/* <div className={!expanded2 ? "flex justify-end" : "hidden"}>
                <Button
                  onClick={createAddress}
                  variant="outlined"
                  sx={{ color: "#A03037", borderColor: "#A03037" }}
                >
                  Add New Address
                </Button>
              </div> */}
              <div>

              <AddressCard />
           
              </div>
              {/* {addressItem?.map(
                (useraddress: any, index: number) => (
                  <EditDetails key={index} useraddress={useraddress} index={index} />
                )
              )} */}
               {/* {cartItems?.user_id?.address?.map(
                  (useraddress: any, index: number) => (
                    <EditDetails useraddress={useraddress} index={index} />
                  )
                )} */}
               

              
              
              <div className={!expanded2 ? "flex justify-end" : "hidden"}>
                <Button
                  variant="contained"
                  sx={{ width: "140px", backgroundColor: "#3371B5" }}
                  onClick={orderAddress}
                >
                  Continue
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded2}
          sx={{
            width: "80%",
            minHeight: "60px",
            marginTop: "10px",
            border: "1px solid #707070",
            color: "#333232",
          }}
        >
          <AccordionSummary sx={{ fontWeight: 600, fontSize: "18px" }}>
            Order Summary
          </AccordionSummary>
          <AccordionDetails>
          <div>
                {cartItems.length ? (
                  cartItems.map((book: any, index: number) => (
                    <OrderSummary key={index} index={-1} book={book} />
                  ))
                ) : (
                  <center>
                    <h1 className="text-xl">
                      Your Cart is Empty! Add any Book to Cart!
                    </h1>
                  </center>
                )}
                <div className="flex justify-end mt-[15px]">
                  <Button
                    variant="contained"
                    sx={{ width: "160px", backgroundColor: "#3371B5" }}
                    onClick={orderCheckout}
                  >
                    Checkout
                  </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <Modal 
        open={profile}
         onClose={() => setProfile(false)}
         >
          <LoginOrSignUp profile = {profile} setProfile = {setProfile}/>
        </Modal>
    </div>
  );
}

export default CartComponent;
