import axios from "axios";

const BASEURL = "https://bookstore.incubation.bridgelabz.com/bookstore_user";



    // export async function createUser(userObj:object,navigate:Function){
    //     await axios.post(`${BASEURL}/registration`,userObj).then(res => {
    //     const usertoken = res.data.result.accessToken
    //     localStorage.setItem("accessToken",usertoken)
    
    //     navigate("/dashboard/")
    //         }).catch(err => {
    //         navigate("/error")
    //             const error = err.res.data.error
    //             console.log(error);
                
    //         });
    //         }

export async function createUser(userObj: object,navigate :Function  ) {
  try {
    const res = await axios.post(`${BASEURL}/registration`, userObj);
    console.log(res);
    const usertoken = res.data.result.accessToken;
    localStorage.setItem("accessToken", usertoken);
  } catch (err) {
    console.error("Error during user registration:", err);
    navigate("/error");
  }
}


export async function loginUser(loginObj:object,setError:Function){
    await axios.post(`${BASEURL}/login`,loginObj).then(res => {
        console.log(res);
       const usertoken = res.data.result.accessToken
       localStorage.setItem("accessToken",usertoken)
              
         }).catch(err => {
           if(err?.response?.data){
             
             const error = err.response.data.error
            setError(error);
           }
            
           });
     
         }
// export async function loginUser(userObj: object, navigate: Function, setError: Function) {
//   try {
//     const res = await axios.post(`${BASEURL}/login`, userObj);
//     console.log(res);
//     const usertoken = res.data.result.accessToken;
//     localStorage.setItem("accessToken", usertoken);
//     navigate("/dashboard/");
//   } catch (err) {
//     navigate("/error")
//     console.error("Error during login:", err);
//     if ( err?.response?.data) {
//       const error = err.response.data.error;
//       setError(error);
//     }
//   }
// }
