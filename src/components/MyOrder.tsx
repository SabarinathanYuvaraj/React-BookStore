import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import emptyCart from "../assets/empty_cart.png";
import displayImg from '../assets/Image 11.png';

function MyOrder() {
  const getMyOrder = JSON.parse(localStorage.getItem("MyOrders")!);
  console.log(getMyOrder);
  return (
    <div className="w-full h-full flex justify-center">
        <div className="w-[80%] font-[Roboto]">
          <div className="mt-[20px] ml-[-1100px]">
            <Link to={"/dashboard/"} className="text-[#9D9D9D]">
              Home /
            </Link>
            <span> My Orders</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 mt-5 mb-[50px] min-h-[200px]">
            {getMyOrder?.length ? (
              getMyOrder.map((orders: any) =>
                orders.map((book: any) => (
                  <div
                    key={book._id}
                    className="flex w-full p-10 h-[180px] rounded font-[Roboto] border-[#707070] border justify-between"
                  >
                    <div className="flex gap-10">
                      <img
                        src={displayImg}
                        alt={`${book.bookName} Img`}
                        className="w-[80px] h-[100px]"
                      />
                      <div className="flex flex-col gap-2">
                        <h1 className="font-medium">{book.bookName}</h1>
                        <p className="text-[#878787] text-sm">
                          by {book.author}
                        </p>
                        <div className="flex items-center gap-1">
                          <h1 className="text-[18px] font-bold">
                            Rs.{book.discountPrice}
                          </h1>
                          <p className="line-through text-[12px] text-[#878787]">
                            Rs.{book.price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center font-bold">
                      <li className="text-[#26A541] text-2xl" />
                      Order Placed on {book.orderDate}
                    </div>
                  </div>
                ))
              )
            ) : (
              <h1 className="text-xl">
                <img src={emptyCart} alt="emptyCart" width="280px" />
                You have not Ordered Anything!
              </h1>
            )}
          </div>
        </div>
     
    </div>
  );
}

export default MyOrder;