import { Box, Button, FormHelperText, IconButton, InputAdornment, Modal, OutlinedInput, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/shoppingCart.png';
import React from "react";
import { createUser, loginUser } from "../utils/UserService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCartList, getCartList, updateCartList } from "../utils/BookService";
import { updateCartQuantity } from "../utils/store/CartSlice";



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

  interface LoginOrSignUpProps {
    profile: boolean;
    setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  }
  

  const LoginOrSignUp: React.FC<LoginOrSignUpProps> = ({ profile, setProfile }) => {
  // const navigate = useNavigate()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [profile, setProfile] = useState(false);
    const [sign, setSign] = useState(true);
    const [emailValidator, setEmailValidator] = useState(false);
    const [passwordValidator, setPasswordValidator] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState(Array<IError>);
    const [showPassword, setShowPassword] = useState(false);
    const[accessToken, setAccessToken] = useState(false)
    const[name,setName] = useState("")


    const cartList =  useSelector((store : any) => store.cart.cartItems)


  const [signUpDetails, setSignUpDetails] = useState<SignUpDetails>({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: ""
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
    apiError: ""
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

const token = localStorage.getItem("accessToken")

  
  const handleSignUpDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";
    
    switch (name) {
      case "fullName":
        error = value.trim() === "" ? "Full name is required" : "";
        break;
      case "email":
        error = !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value) ? "Invalid email" : "";
        break;
      case "password":
        error = value.length < 6 ? "Password should be at least 6 characters" : "";
        break;
      case "mobileNumber":
        error = value.trim() === "" ? "Mobile number is required" : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

    setSignUpDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };




  const newUser = async () => {
    const fullname = (document.getElementById('signUpfullname')as HTMLInputElement).value
    console.log(fullname);
    const emailId = (document.getElementById('signUpemailId')as HTMLInputElement).value
    console.log(emailId);
    const password = (document.getElementById('signUppassword')as HTMLInputElement).value
    console.log(password);
    const mobileNo = (document.getElementById('signUpmobileNo')as HTMLInputElement).value
    console.log(mobileNo);
    const userObj = {
        fullName: fullname,
        email: emailId,
        password: password,
        phone: mobileNo
        
      }
      console.log(userObj);

    try {
      const res = await createUser(userObj, navigate);
      console.log(res);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };
  

  const handleSign = (action : string) => {
    if(action === "login"){
      setSign(false)
    }
    if(action === "signUp"){
      setSign(true)
    }
  };



  
  

  const handleLogin = async () => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    setEmailValidator(!emailRegex.test(email));
    setPasswordValidator(password.length < 6);
    


    const loginObj = {
      email : email ,
      password : password
    }
    


    if (!emailValidator && !passwordValidator) {
      const res = await loginUser(loginObj , setError);
      console.log(res);
      const fetchCartList = await getCartList();
      console.log(fetchCartList);
  
      if (fetchCartList.length === 0 && cartList.length !== 0) {
        for (const item of cartList) {
            await addCartList(item._id);
        }
    }
  
    if (cartList.length !== 0  && fetchCartList.length ===0) {
      for (const item of cartList) {
          const isInFetchCartList = fetchCartList.some((fetchedItem: any) => fetchedItem.product_id._id === item._id);
          if (!isInFetchCartList) {
              await addCartList(item._id);
          }
      }
  }
  
  // if (cartList.length !== 0  && fetchCartList.length !==0) {
  //   for (const item of cartList) {
  //       const cartItem = fetchCartList.find((fetchedItem: any) => fetchedItem.product_id._id === item._id);
  //       console.log(item._id);
  //       const reduxQuantity = item.quantity
  //       const updatedQuantity = cartItem.quantityToBuy + reduxQuantity
  //       const updateCart = await updateCartList(item._id,updatedQuantity)
  //       console.log(updateCart);
  //       dispatch(updateCartQuantity({itemId : item._id, updatedQuantity : updatedQuantity})) 
       
  //   }
  // }
  
  
      // navigate("/dashboard/")
      <Link to={"/dashboard/"}></Link>
      setProfile(false)

      
  
    }
  };



    return(

          <div className="flex align-center justify-center mt-[170px] outline-none">
            <div className="flex min-h-[391px] w-[660px] bg-neutral-100 m-auto rounded-2xl">
              <div className="flex flex-col h-[245px] w-[245px] bg-transparent ml-[53px] mt-[52px]">
                <img className="rounded-full" src={Logo} alt="Logo" />
                <p className="font-bold text-base mt-3 ml-[10px]">ONLINE BOOK SHOPPING</p>
              </div>
              <div className="ml-[110px] mt-[4%] absolute top-[88px] left-[728px] flex flex-row min-h-[440px] w-[330px] bg-neutral-100 ml-[40px] bg-white rounded-xl">
                <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
                  <div className="mt-[8%] ml-[20px] flex-row">
                    <div className="flex mb-[20px]">
                      <div className="flex flex-col">
                      <div
                        className="text-[23px] ml-[16%] font-bold cursor-pointer brightness-95 contrast-75"
                        onClick={() => handleSign("login")}
                      >
                        LOGIN
                      </div>
                      {sign ? (
                        <div></div>
                      ) : (
                        <div className="w-[30px] h-[6px] ml-[30px]" style={{backgroundColor : "#A03037" , borderRadius : "8px"}}></div>
                      )}
                      </div>
                      <div
                        className="ml-[25%] text-[23px] font-bold cursor-pointer brightness-45 contrast-55"
                        onClick={() => handleSign("signUp")}
                      >
                        SIGNUP
                        <div>
                        {sign ? (
                          <div className="w-[30px] h-[6px] ml-[35px]" style={{backgroundColor : "#A03037" , borderRadius : "8px"}}></div>) :
                           (
                        <div></div>
                            )}
                    </div>
                        </div>
                      </div>
               
                    {sign ? (
                      <div className="flex-col">
                        <div className="mt-3 w-full">
                          <TextField
                            id="signUpfullname"
                            label="Full Name*"
                            name="fullName"
                            error={errors.fullName !== ""}
                            helperText={errors.fullName}
                            value={signUpDetails.fullName}
                            onChange={handleSignUpDetails}
                            className="w-[90%]"
                          />
                        </div>

                        <div className="mt-4 w-full">
                          <TextField
                            id="signUpemailId"
                            label="Email*"
                            name="email"
                            error={errors.email !== ""}
                            helperText={errors.email}
                            value={signUpDetails.email}
                            onChange={handleSignUpDetails}
                            className="w-[90%]"
                          />
                        </div>

                        <OutlinedInput
                          id="signUppassword"
                          placeholder="Password"
                          name="password"
                          size="small"
                          type={showPassword ? "text" : "password"}
                          value={signUpDetails.password}
                          onChange={handleSignUpDetails}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={(event) => event.preventDefault()}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          } 
                          style={{ width: "90%", height: "50px", marginBottom: 10, marginTop: 20, color: "black" }}
                        />
                        <FormHelperText error={errors.password !== ""}>{errors.password}</FormHelperText>

                        <TextField
                          id="signUpmobileNo"
                          label="Mobile Number*"
                          name="mobileNumber"
                          onChange={handleSignUpDetails}
                          error={errors.mobileNumber !== ""}
                          helperText={errors.mobileNumber}
                          value={signUpDetails.mobileNumber}
                          className="w-[90%]"
                        />

                        <div>
                          <Button
                            variant="contained"
                            style={{ width: "280px", top: "23px", backgroundColor: "#A03037" }}
                            onClick={newUser}
                          >
                            SignUp
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-col">
                        <div className="mt-8 w-full">
                          <TextField
                             id='emailId'
                            label="Email Id*"
                            name='emailId'
                            value={email}
                            error={Error[0]?.param === "email"}
                            helperText={Error[0]?.param === "email" ? Error[0].msg : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[90%]"
                          />
                        </div>

                        <div className="mt-4 w-full">
                          <TextField
                          value={password}
                          id='password'
                          name='password'
                            label="Password*"
                            InputProps={{endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      edge="end"> 
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                              </InputAdornment>
                          )}}
                            type={showPassword ? "text" : "password"}
                            error={Error[0]?.param === "password"}
                            helperText={Error[0]?.param === "password" ? Error[0].msg : ""}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[90%]"
                          />
                          <div className="text-xs ml-[55%] mt-[3px] cursor-pointer">Forgot Password?</div>
                        </div>

                        <div>
                          <Button
                            variant="contained"
                            style={{ width: "252px", left: "16px", top: "10px", backgroundColor: "#A03037" }}
                            onClick={handleLogin}
                          >
                            Login
                          </Button>
                        </div>

                        <div>
                          <div className="flex flex-row mt-[20px] ml-[65px]">
                            <hr style={{ borderColor: "white" }} /> ________
                            <span className="flex font-bold mt-[5.5px]">OR</span>
                            <hr style={{ borderColor: "white" }} /> ________
                          </div>

                          <div className="flex">
                            <Button
                              variant="outlined"
                              style={{ width: "126px", left: "31px", top: "20px", backgroundColor: "#4266B2", color: "white" }}
                            >
                              Facebook
                            </Button>
                            <Button
                              variant="outlined"
                              style={{
                                width: "119px",
                                left: "37px",
                                top: "20px",
                                backgroundColor: "#F5F5F5",
                                border: "#E4E4E4",
                                color: "#0A0102",
                              }}
                            >
                              Google
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Box>
              </div>
            </div>
          </div>
    )
}

export default LoginOrSignUp