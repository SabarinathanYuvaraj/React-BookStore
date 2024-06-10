function EditDetails(){
    return(
        <>
         <div className="flex ml-[12%] mt-[19px] mr-[10%]">
        <span className="text-[12px] text-gray-400">Home /</span>
        <span className="text-[12px] ml-[3px] font-semibold brightness-75 contrast-75">Profile</span>
    </div>
        <div className="flex-col  ml-[250px] mt-[20px]">
        <h1 className="text-[#0A0102] text-xl font-semibold flex">Personal Details
        <span className="ml-[50px] text-[16px] text-[#A03037] font-[300]">Edit</span>
        </h1>

        <div className="w-[42%] flex flex-col items-start text-[15px]  mt-[30px]"><label>Full Name</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none"  style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}/></div>
        <div className="w-[42%] flex flex-col items-start text-[15px] mt-[12px]"><label>Email Id</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none" style={{backgroundColor : "#F5F5F5", borderRadius : "4px"}}/></div>
        <div className="w-[42%] flex flex-col items-start text-[15px] mt-[12px]"><label>Password</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none"  style={{backgroundColor : "#F5F5F5" ,borderRadius : "4px"}}/></div>
        <div className="w-[42%] flex flex-col items-start text-[15px] mt-[12px]"><label>Mobile Number</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none"  style={{backgroundColor : "#F5F5F5",borderRadius : "4px"}}/></div>

         </div>

         <div className="flex-col  ml-[250px] mt-[40px]">
            <h1 className="text-[#0A0102] text-xl font-semibold flex">Address Details</h1>
        <h1 className="text-[#0A0102] text-xl font-semibold text-[16px] flex mt-[15px]">1.Work
        <span className="ml-[50px] text-[16px] text-[#A03037] font-[300]">Edit</span>
        </h1>

        <div className="w-[42%] flex flex-col items-start text-[15px]  mt-[30px]"><label>Address</label><textarea className="px-5 w-full py-2 h-[80px] border-2 outline-none"  style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}/></div>
        
        <div className="w-[42%] flex justify-between mt-[15px]">
            
        <div className=" w-[48%] flex flex-col items-start text-[15px]"><label>city/town</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none" style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}/></div>
        <div className="w-[48%] flex flex-col items-start text-[15px]"><label>State</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none" style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}/></div>
        
        </div>
        <div className="w-[42%] flex flex-col items-start text-[15px] mt-[12px]"><label>Mobile Number</label><input className="px-5 w-full py-2 h-[45px] border-2 outline-none"  style={{backgroundColor : "#F5F5F5",borderRadius : "4px"}}/></div>

        <div className="w-[80%] flex-col  mt-[20px] text-[15px]">
                            <div className='flex items-start'>Type</div>
                            <div className='flex w-[40%]'>
                            <div className="flex w-[48%] h-[40px] flex items-center text-[15px] gap-[10px] ml-[10px]">
                                <input type='radio' id='home' name='location' className="px-5 py-2 h-[15px] border-2 outline-none"/>
                                <label htmlFor='home'> Home</label>
                            </div>
                            <div className="flex w-[48%] h-[40px] flex items-center text-[15px] gap-[10px] ml-[10px]">
                                <input type='radio' id='work' name='location' className="px-5 py-2 h-[15px] border-2 outline-none"/>
                                <label htmlFor='work'> Work</label>
                            </div>
                            <div className="flex w-[48%] h-[40px] flex items-center text-[15px] gap-[10px] ml-[10px]">
                                <input type='radio' id='others' name='location' className="px-5 py-2 h-[15px] border-2 outline-none"/>
                                <label htmlFor='others'> Others</label>
                            </div>
                            </div>

                        </div>
         </div>

        </>
    )
}
export default EditDetails;