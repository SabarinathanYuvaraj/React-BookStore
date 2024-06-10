import StarIcon from '@mui/icons-material/Star';
import Image11 from '../assets/Image 11.png';
import { link } from 'fs';
import { Link } from 'react-router-dom';
import Image1 from '../assets/Image 11.png';
import Image2 from '../assets/Image 2.png'
import Image3 from '../assets/Image 3.png'
import Image4 from '../assets/Image 4.png'
import Image5 from '../assets/Image 5.png'
import Image6 from '../assets/Image 6.png'
import Image7 from '../assets/Image 7.png'
import Image8 from '../assets/Image 8.png'
import Image9 from '../assets/Image 9.png'

interface Book{
    description : string;
    bookName : string;
    bookImage : string;
    title : string;
    author : string;
    quantity: number;
    rating: number;
    discountPrice: number;
    price: number;
    _id: string;
}

function BookCard({ book }: any){


    console.log(book);

    const ImageList = [Image1,Image2,Image3,Image4,Image5,Image6,Image7,Image8,Image9]

    const getRandomImage = ()=> {
        const randomNumber = Math.floor(Math.random() * ImageList.length)
        return ImageList[randomNumber]
    }
 
    return(
         <Link  to={`/dashboard/bookdetails/${book._id}`}>
        
        <div className="flex flex-col  h-[255px]   w-[210px] border-white-400  border-2 shadow-md   "
             style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="h-[60%] w-full flex items-center justify-center" style={{ backgroundColor: "#F5F5F5"} }>
            <img src= {`${getRandomImage()}`}  className='w-[50%] h-[85%]' alt="" />
            </div>
                
                <div className="flex ml-[10%] mt-[2%] items-start flex-col gap-[2px] ">
            
                    <span className=" text-left text-[14px] font-semibold brightness-75 contrast-75 ">{book.bookName}</span>
    
                    <span className="text-[10px] text-gray-400">{book.author}</span>
                    <div className='flex items-center justify-center'>
                    <div className="h-[16px] w-[33px] flex items-center justify-center" style={{ backgroundColor: "#388E3C"}}>
                        <span className="text-[10px] " style={{color : "#FFFFFF"}}>4.5</span>
                        <StarIcon  style={{ height: "15px", width: "12.5px", color : "#FFFFFF"}}/>
                    </div>
                    <span className='text-[11px] text-gray-400'>({book.quantity})</span>
                    </div>  
                    <div className='flex items-center justify-center gap-[12px]'>
                        <span className='text-[13px] font-semibold brightness-75 contrast-75'>Rs. {book.discountPrice}</span>
                        <span className='text-[11px] text-gray-400 line-through'>Rs. {book.price}</span>
                    </div>
                </div>
                </div>
         </Link>

    
    )
}

export default BookCard;