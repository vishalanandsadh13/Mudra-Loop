import { useContext } from "react"
import { userContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../Utils/apiPath";
import axiosInstance from "../Utils/axiosInstance";
import { useEffect } from "react";

export const useUserAuth = () => {
    const {user, clearUser, updateUser} =useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
      if(user) return;

      let isMounted = true;

      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get(API_PATHS.Auth.GET_USER_INFO);
          if(isMounted && response.data) {
            updateUser(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
          if(isMounted) {
            clearUser();
            navigate("/login");
          }
        }
      }
        fetchUserData();
        return () => {
          isMounted = false;
        }
    },[updateUser, clearUser, navigate, user]);
}