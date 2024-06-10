import BookNavBar from "./BookNavBar";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import  {addItemToBooks}  from "../utils/store/BookSlice";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { MenuItem, Pagination, Select, Stack } from "@mui/material";

interface Book{
    description : string;
    bookName : string;
    title : string;
    author : string;
    quantity: number;
    rating: number;
    discountPrice: number;
    price: number;
    _id: string;
}
function BookContainer() {

    const dispatch = useDispatch();
    const BookList = useSelector((store : any) => store.book.bookItems);

    console.log(BookList);

    
    const SortPriceLowToHigh = () => {
      const sortedData = [...BookList].sort(
        (a: any, b: any) => a.discountPrice - b.discountPrice
      );
      dispatch(addItemToBooks(sortedData));
    };
    const SortPriceHignToLow = () => {
      const sortedData = [...BookList].sort(
        (a: any, b: any) => b.discountPrice - a.discountPrice
      );
      dispatch(addItemToBooks(sortedData));
    };
    const newArrivals = () => {
      const sortedData = [...BookList].sort(
        (a: any, b: any) =>
          Date.parse(b.discountPrice) - Date.parse(a.discountPrice)
      );
      dispatch(addItemToBooks(sortedData));
    };
  
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalItems = BookList.length;
    // console.log('totalItems',totalItems);
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const displayedBooks = BookList.slice(startIndex, endIndex);
    const [sortOption, setSortOption] = useState("");
  

    return (
        <>
        { BookList.length ? (
           <div>
           <div className="flex w-[80%] mt-[22px] mb-[37px] ml-[160px] font-bold text-xl" style={{justifyContent : "space-between"}}>
         <p>
          <span className='text-[20px] sm:text-lg lg:text-xl font-medium'> Books{" "}</span>
           <span className='text-gray-400 ml-1 sm:ml-2 text-sm sm:text-base'>
             ({BookList.length} Items)
           </span>
         </p>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           size="small"
           // value={sortOption}
           defaultValue="Sort by relevance"
           onChange={(e) => setSortOption(e.target.value as string)}
         //   style={{
         //     width: "180px",
         //     left: "738px",
         //     height: "25px",
         //     fontSize: "12px",
         //   }}
         className="flex h-[33px] w-[220px] mr-[75px]  shadow-md px-4 py-2"
         style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginLeft : "-100px" }}
         >
           <MenuItem value={"Sort by relevance"}>Sort by relevance</MenuItem>
           <MenuItem value={"LowToHign"} onClick={SortPriceLowToHigh}>
             Price: Low to High
           </MenuItem>
           <MenuItem value={"HighToLow"} onClick={SortPriceHignToLow}>
             Price: Hign to Low
           </MenuItem>
           <MenuItem value={"newArrivals"} onClick={newArrivals}>
             Newest Arrivals
           </MenuItem>
         </Select>
       </div>
 
             <div className="lg:ml-[10%] lg:mr-[10%] mb-[50px]">
                 <div className="grid grid-cols-4 gap-10">
                 {displayedBooks?.map((book : Book, index: number) => (
                   <BookCard key={index} index ={index} book={book} />
               ))}
                 </div>
             </div>
             <div className="flex justify-center mb-[15px] mt-4" >
          <Stack spacing={2} className="mb-[40px]">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="secondary"
              
            />
          </Stack>
        </div>
           </div>
        ) :
        (
         
          <div className=" w-full flex item-center  ">
          <div className=" w-full flex item-center justify-center items-center mt-[230px] text-[18px] "  style={{color : "red"}}>No Books Are Avalible</div>

          </div>
        )}
        
         
        
        </>
    );
}

export default BookContainer;
