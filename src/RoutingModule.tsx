import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoardContainer from "./components/DashBoradContainer";
import BookContainer from "./components/BookContainer";
import BookDetails from "./components/BookDetails";
import BookCart from "./components/BookCart";
import EditDetails from "./components/EditDetails";
import { Provider } from "react-redux";
import appStore from "./utils/store/AppStore";
import ErrorComponent from "./components/ErrorComponent";
import WishList from "./components/WishList";
import SuccessPage from "./components/SuccessPage";
import MyOrder from "./components/MyOrder";
import ProfileCard from "./components/ProfileCard";

function RoutingModule(){
  const AppRoutes = createBrowserRouter([
    {path : "/dashboard", element : <DashBoardContainer/> , children : [
        {path: "",element : <BookContainer/>},
        {path : "cart" , element : <BookCart/>},
        {path : "bookdetails/:bookId" , element : <BookDetails/>},
        {path : "wishList", element : <WishList/>},
        {path : "myOrders" , element : <MyOrder/>},
        {path : "profile" , element : <ProfileCard/>}
    ]},
    {path :"/orderPlaced", element : <SuccessPage/>},
    {path : "/error", element : <ErrorComponent/>},
    {path : "/edit" , element : <EditDetails/>}
  ])
    return <Provider store={appStore}>
      <RouterProvider  router = {AppRoutes}></RouterProvider>
      </Provider>
        
    
}
export default RoutingModule;