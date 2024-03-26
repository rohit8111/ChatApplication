import React from 'react'
import {Navigate,Outlet} from "react-router-dom"
import { useAuth } from '../context/authProvider'
function ProtectedRoute() {
  
    const {token}=useAuth();
    
    if(token==null || token==""){
      
        return <Navigate to="/login"/>
    }
    console.log("Prtected Route", token)
     return <Outlet/>
}

export default ProtectedRoute