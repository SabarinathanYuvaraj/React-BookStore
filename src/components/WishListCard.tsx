
import { DeleteOutline } from "@mui/icons-material"
import { removeWishlistItem } from "../utils/BookService"
import { useDispatch, useSelector} from "react-redux"
import { deleteWishListItem } from "../utils/store/WishListSlice"
import displayImg from '../assets/Image 11.png';

function WishListCard({book}:{book:any}) {
    console.log(book);
    const dispatch = useDispatch()
    const WishListItems = useSelector((store: any) => store.wishList.wishListItems);

    const removeWishItem = async()=>{
        await removeWishlistItem(book.product_id?._id)
        dispatch(deleteWishListItem(book?._id))
    }
    return(
        <div className="flex  ml-[20px] w-[85%] mb-[50px] gap-8 h-[170px] rounded font-[Roboto] border-b-2 px-10 items-center"style={{ border: '2px solid #E4E4E4' }}>
            
            <img src={displayImg} alt={`${book?.product_id} Img`} className="w-[80px] h-[100px]"/>
            <div className="flex flex-col gap-2">
            <div className="flex  justify-between items-center gap-[600px] ">
            <h1 className="font-medium w-[200px] text-start">{book.product_id?.bookName}</h1>
            <button onClick={removeWishItem} className="hover:text-blue-500">
                <DeleteOutline sx={{ height: "20px" }} />
            </button>
            </div>

            <p className="text-[#878787] text-sm text-start">by {book.product_id?.author}</p>
            <div className="flex items-center gap-1"><h1 className="text-[18px] font-bold">
                Rs.{book.product_id?.discountPrice}</h1>
                <p className="line-through text-[12px] text-[#878787]">Rs.{book.product_id?.price}</p></div>
            </div>

        </div>
    )
}
export default WishListCard;