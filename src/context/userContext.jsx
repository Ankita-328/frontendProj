import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("Token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the token
        },
        });
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser(); // moved inside catch
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


const updateUser = (userData) => {
  setUser(userData);
  localStorage.setItem("Token", userData.token); // Save token
  setLoading(false);
};

const clearUser = () => {
  setUser(null);
  localStorage.removeItem("Token");
};


return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;
