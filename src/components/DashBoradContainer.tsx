import BookNavBar from "./BookNavBar";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import { Outlet } from "react-router-dom";
function DashBoardContainer(){
    return(
        <>
        
        <div className="sticky top-0 z-50">
        <BookNavBar/>
        </div>
        <div className="flex-grow" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Outlet/>
        </div>
        <div
          className="flex h-[50px] w-[100%] items-center"
          style={{ backgroundColor: "#2E1D1E" , position : "absolute"}}
        >
          <footer>
            <p
              style={{
                color: "white",
                fontSize: "12px",
                left: "160px",
                position: "relative",
              }}
            >
              Copyright <CopyrightOutlinedIcon style={{ fontSize: "12px" }} />{" "}
              2020, Bookstore Private Limited. All Rights Reserved
            </p>
          </footer>
        </div>
        </>
    )
}
export default DashBoardContainer;