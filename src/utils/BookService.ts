import axios from "axios";
const bookStoreUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

 const accessToken = localStorage.getItem("accessToken")
const configForBooks =  {
    headers :{
        "content-type" : "application/json",
        "token" : accessToken
    }
}

const configForAddNotes = {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-access-token": localStorage.getItem("accessToken"),
  },
};

export const getBookList = async() => {
    const response = await axios.get(`${bookStoreUrl}/get/book`,configForBooks)
    return response.data.result;
}

export const getCartList = async() => {
    const response = await axios.get(`${bookStoreUrl}/get_cart_items`,configForBooks)
    return response.data.result
}

export const addCartList = async(bookId : string) => {
    const response = await axios.post(`${bookStoreUrl}/add_cart_item/${bookId}`, {}, configForBooks);
    return response.data.result
}

export const updateCartList= async(bookId : string , quantity : any) => {
    console.log(bookId);
    console.log(quantity);
    const response = await axios.put(`${bookStoreUrl}/cart_item_quantity/${bookId}`, { quantityToBuy: quantity },configForBooks)
    return response.data.result
}

export async function removeCartList(productId: string) {
    await axios.delete(
      `${bookStoreUrl}/remove_cart_item/${productId}`,
      configForBooks
    );
  }

  export async function addWishList(productId: string) {
    const response =  await axios.post(
      `${bookStoreUrl}/add_wish_list/${productId}`,
      {},
      configForBooks
    );
    return response.data.result
  }
  
  export async function getWishlistItems() {
    let data: any;
    await axios
      .get(`${bookStoreUrl}/get_wishlist_items`, configForBooks)
      .then((res) => {
        data = res.data.result;
      });
    return data;
  }
  export async function removeWishlistItem(productId: string) {
    await axios.delete(
      `${bookStoreUrl}/remove_wishlist_item/${productId}`,
      configForBooks
    );
  }

  export async function addOrder(order: any) {
    let data: any;
    console.log(order);
  try{
  
      await axios
        .post(`${bookStoreUrl}/add/order`, { orders: order }, configForBooks)
        .then((res) => {
          data = res.data.result;
        });
      return data;
  }catch(err){
      console.log(err);
  
      
  }
  }

  export async function editUserAddress(address: any) {
    let data: any;
    await axios
      .put(`${bookStoreUrl}edit_user`, address, configForBooks)
      .then((res) => {
        data = res.data.result;
      });
    return data;
  }
