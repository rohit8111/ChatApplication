import React from 'react'
import { useAuth } from '../context/authProvider'
import { useNavigate } from "react-router-dom";
function Logout() {
    const {setToken}=useAuth();
    setToken()
    const navigate = useNavigate();
    return navigate("/login", { replace: true });
   
}

export default Logout