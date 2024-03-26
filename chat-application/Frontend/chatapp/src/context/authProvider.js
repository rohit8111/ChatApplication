import { Axios } from "axios";
import axios from "axios";
import React, { useEffect, useState,useMemo,useContext } from "react";
import { createContext } from "react";
import Home from "../components/home";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  console.log("Inside authProvider")
  const [token, setToken_] = useState(localStorage.getItem("accessToken"));
  console.log(token)
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer" + token;
      localStorage.setItem("accessToken", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [token]);
  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
    return useContext(AuthContext);
  };

export default AuthProvider;
