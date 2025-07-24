import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { SIDE_MENU_DATA } from "../../Utils/data";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  console.log("rendered SideMenu");
  console.log("sidemenu", SIDE_MENU_DATA);
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("user", user);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
    return;
  };
  const handleClick = (path) => {
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-200">
        <div className="flex flex-col items-center justify-center gap-3 mb-7 mt-3">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : 
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-3xl"
            />
          }
          <h5 className="text-gray-950 font-medium leading-6">
            {user?.fullName || "Guest User"}
          </h5>
        </div>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex item-center gap-4 text-15px ${
              activeMenu === item.label ? "text-white bg-primary" : ""
            } py-3 px-5 rounded-lg mb-3`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default SideMenu;
