import React,{useContext} from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { userContext } from "../../Context/userContext";

const DashboardLayouts = ({children, activeMenu}) => {
    const {user} = useContext(userContext);
    console.log("user", user);
  return (
    <div className="">
      <Navbar activeMenu={activeMenu}/>
      {user && (
      <div className="flex">
        <div className="max-[1080px]">
             <SideMenu activeMenu={activeMenu}/>
        </div>
         <div className="grow mx-5">
            {children}
         </div>
      </div>
      )}
    </div>
  );
};
export default DashboardLayouts;
