import { useSelector } from "react-redux";
import displayImg from '../assets/Image 11.png';
import { useEffect } from "react";

const OrderSummeryDisplayComponent = ({ book, index }: { book: any; index: number }) => {
    const cartItems = useSelector((store: any) => store.cart.cartItems);


    useEffect(() => {
    }, [cartItems])



    return (
        <div>
            <div className="flex gap-10 w-[800px] h-[170px] font-[Roboto] align-center">
                <img src={displayImg} alt={`${book.bookName} Img`} className="w-[80px] h-[100px] mt-[20px] ml-[20px]" />
                <div className="flex flex-col gap-1 w-[600px] ml-[10px]">
                    <div className="flex mt-[20px] ">
                        <h1 className="font-medium">{book.bookName}</h1>
                    </div>
                    <p className="text-[#878787] text-sm text-start">by {book.author}</p>
                    <div className="flex items-center gap-2">
                        <h1 className="text-[18px] font-bold">Rs.{book.discountPrice}</h1>
                        <p className="line-through text-[12px] text-[#878787]">Rs.{book.price}</p>
                    </div>
                    <div className='flex gap-1 items-center ml-[-10px]'>
                    </div>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
};

export default OrderSummeryDisplayComponent;