import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { editUserAddress } from '../utils/BookService';
import { addItemToAddress, editItemToAddress } from '../utils/store/AddressSlice';

const AddressCard = () => {
  const addressItems = useSelector((store: any) => store.address.addressItems);
  console.log(addressItems);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const dispatch = useDispatch();
    const cartItems = useSelector((store: any) => store.cart.cartItems);

    // console.log(addressItems[3].addressType);


  const selectedAddressType = (document.querySelector('input[name="location"]:checked') as HTMLInputElement)?.value;
  console.log(selectedAddressType);

  const saveAddress = async (index: number) => {
    const addressObj = {
      addressType: addressItems[index].selectedAddressType,
      fullAddress: (document.getElementById(`fullAddress-${index}`) as HTMLInputElement).value,
      city: (document.getElementById(`city-${index}`) as HTMLInputElement).value,
      state: (document.getElementById(`state-${index}`) as HTMLInputElement).value,
    };
    dispatch((editItemToAddress({index, addressObj})))
    setEditIndex(null); 
  };



  const addNewAddress = async () => {
    const addressObj = {
      addressType:(document.querySelector('input[name="location"]:checked') as HTMLInputElement)?.value,
      fullAddress: (document.getElementById('newFullAddress') as HTMLInputElement).value,
      city: (document.getElementById('newCity') as HTMLInputElement).value,
      state: (document.getElementById('newState') as HTMLInputElement).value,
    };
    cartItems?.user_id?.address?.push(addNewAddress)
    dispatch(addItemToAddress(addressObj))

    // console.log((document.getElementById('newAddressType') as HTMLInputElement).value);
    console.log((document.getElementById('newFullAddress') as HTMLInputElement).value);
    console.log((document.getElementById('newCity') as HTMLInputElement).value);
    console.log((document.getElementById('newState') as HTMLInputElement).value);
    // await addUserAddress(addressObj);
    // setShowNewAddressForm(false); // Close the new address form after saving
  };

  return (
    
    <div className=''>
               <Button
               style={{marginLeft : "750px" , marginTop : "-280px" , borderRadius : "3px"}}
                variant="outlined"
                sx={{ color: '#A03037', borderColor: '#A03037' }}
                onClick={() => setShowNewAddressForm(true)}
              >
                Add New Address
              </Button>
      {addressItems.length > 0 ? (
        addressItems.map((useraddress: any, index: number) => (
          <div key={index}>
            <div className="w-[80%] mt-[50px] flex items-center justify-between">
              <div className=''>
                <input type="radio" name="address" defaultChecked />
                <span className="p-1 text-[18px] font-bold">
                  {index + 1}. {useraddress.addressType}
                </span>
                {editIndex === index ? (
                  <span
                    className="text-[13px] text-[#A03037] mt-[15px] pl-[50px] cursor-pointer"
                    onClick={() => setEditIndex(null)}
                    style={{marginTop : "12px"}}
                  >
                    Cancel
                    </span>
                ) : (
                  <span
                    className="text-[13px] text-[#A03037] mt-[15px] pl-[50px] cursor-pointer"
                    onClick={() => setEditIndex(index)}
                    style={{marginTop : "12px"}}
                  >
                    Edit
                    </span>
                )}
              </div>
              {editIndex === index && (
                <span
                className='mt-[18px] ml-[-100px]'
                  style={{ width: '123px', height: '34px', fontSize : "13px", marginRight :"400px" , color : "bli" }}
                  onClick={() => saveAddress(index)}
                >
                  Save
                </span>
              )}
            </div>
            <div className="w-[80%] flex flex-col  gap-1 mt-2">
              
              {editIndex === index ? (
                <div className='ml-[20px] gap-8 '>
                  <div className='flex flex-col'>
                  <span className='text-start ml-[5px] text-[17px]'> Address</span>
                  <input
                   style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}
                    id={`fullAddress-${index}`}
                    className="px-5 py-2 h-[70px] border-2"
                    defaultValue={useraddress.fullAddress}
                  />
                  </div>
                  <div className="flex justify-between mt-[20px]">
                    <div className="w-[48%] flex flex-col">
                      <label className='text-start ml-[5px] text-[17px]'>City/Town</label>
                      <input
                       style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}
                        id={`city-${index}`}
                        type="text"
                        className=" h-[50px] w-[340px] px-5 py-2 border-2"
                        defaultValue={useraddress.city}
                      />
                    </div>
                    <div className="w-[48%] flex flex-col">
                      <label className='text-start ml-[5px] text-[17px]'>State</label>
                      <input
                       style={{backgroundColor : "#F5F5F5" , borderRadius : "4px"}}
                        id={`state-${index}`}
                        type="text"
                        className="  h-[50px] w-[340px] px-5 py-2 border-2"
                        defaultValue={useraddress.state}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col'>
                  <span className='text-start ml-[17px] font-semibold'> Address</span>
                <span className='text-start ml-[17px]'>{`${useraddress.fullAddress}, ${useraddress.city}, ${useraddress.state}`}</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}

      {showNewAddressForm && (
        <div className="mt-4">
          <div className=" ml-[20px] flex flex-col gap-2 w-[76%]">

         <div className='flex flex-col'>
         <label className='text-start ml-[5px] text-[17px]'>Address</label>
            <input id="newFullAddress"  className="px-5 py-2 h-[70px] border-2" />
         </div>
            <div className="flex justify-between">
            <div className='flex flex-col'>
            <label className='text-start ml-[5px] text-[17px]'>City/Town</label>
            <input id="newCity"  className="w-[333px] h-[50px] px-5 py-2 border-2" />
            </div>
              <div className='flex flex-col'>
              <label className='text-start ml-[5px] text-[17px]'>State</label>
              <input id="newState"  className=" h-[50px] w-[333px] px-5 py-2 border-2" />
              </div>
            </div>
            <div className="w-[80%] flex-col  mt-[20px] text-[15px]">
                            <div className='flex items ml-[10px] text-[17px]'>Type</div>
                            <div className='flex w-[100%]'>
                            <div className="flex w-[48%] h-[40px] flex items-center text-[16px] gap-[10px] ml-[10px]">
                                <input type='radio' id='home' value="Home" name='location' className="px-5 py-2 h-[15px] border-2 outline-none"/>
                                <label htmlFor='home'> Home</label>
                            </div>
                            <div className="flex w-[48%] h-[40px] flex items-center text-[16px] gap-[10px] ml-[10px]">
                                <input type='radio' id='work' name='location' value="Work" className="px-5 py-2 h-[15px] border-2 outline-none"/>
                                <label htmlFor='work'> Work</label>
                            </div>
                            <div className="flex w-[48%] h-[40px] flex items-center text-[16px] gap-[10px] ml-[10px]">
                                <input type='radio' id='others' name='location' value="Others" className="px-5 py-2 h-[15px] border-2 outline-none"/>
                                <label htmlFor='others'> Others</label>
                            </div>
                            </div>

                        </div>
            <div className="flex justify gap-8 mt-2 ml-[40px] mb-[30px]">
              <Button
              className='w-[120px]'
                variant="outlined"
                sx={{ color: '#A03037', borderColor: '#A03037' }}
                onClick={() => setShowNewAddressForm(false)}
              >
                Cancel
              </Button>
              <Button
              className='ml-[200px]'
                variant="contained"
                sx={{ width: '123px', marginLeft: "40px", height: '34px', backgroundColor: '#3371B5' }}  
                onClick={() => {
                  addNewAddress();
                  setShowNewAddressForm(false);
                }}
              >
              
              
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
