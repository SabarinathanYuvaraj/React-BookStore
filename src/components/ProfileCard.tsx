import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import AddressCard from "./AddressCard"

function ProfilePage(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    return(
        <>
            <div className="w-full h-full flex justify-center">
        <div className="w-[80%] font-[Roboto]">
            <div className="mt-[20px]  ml-[-1100px]">
            <Link to={'/dashboard/'} className="text-[#9D9D9D]">Home /</Link>
            <span> Profile</span>
            </div>
        <div className="ml-[50px]">
        <h1 className="text-[#0A0102] text-xl font-semibold ml-[-990px] mt-[25px]">Personal Details</h1>
        <div className="w-[45%] flex flex-col gap-[20px] mt-[20px] ml-[20px]">
            <div className="w-full flex flex-col "><label className="text-start ">Full Name</label><span className="px-5 py-2 h-[45px] border-2 rounded text-[18px] text-start" style={{backgroundColor : "#F5F5F5" , borderRadius : "4px" , color : "#878787"}}>{cartItems[0]?.user_id?.fullName}</span></div>
            <div className="w-full flex flex-col"><label className="text-start ">Email Id</label><span className="px-5 py-2 h-[45px] border-2 rounded text-[18px] text-start" style={{backgroundColor : "#F5F5F5" , borderRadius : "4px" , color : "#878787"}}>{cartItems[0]?.user_id?.email}</span></div>
            <div className="w-full flex flex-col"><label className="text-start ">Mobile Number</label><span className="px-5 py-2 h-[45px] border-2 rounded  text-[18px] text-start" style={{backgroundColor : "#F5F5F5" , borderRadius : "4px" , color : "#878787"}}>{cartItems[0]?.user_id?.phone}</span></div>
        </div>
        </div>
        </div>
    </div>

            <div className=" ml-[200px] w-[80%] font-[Roboto] flex justify-between mt-[210px]">

                


              <AddressCard />
           
            
            
            </div>
        </>
    )
}
export default ProfilePage