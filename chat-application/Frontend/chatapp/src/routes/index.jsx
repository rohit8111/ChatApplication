import React from 'react'
import { useAuth } from '../context/authProvider'
import ProtectedRoute from './ProtectedRoute';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../components/home"
import Login from "../components/login"
import Register from "../components/register"
import Logout from "../components/Logout"
import Chat from '../components/chat';
const Routes=()=>{
    const {token}=useAuth();
    const routesForPublic=[
        {
            path:"/home",
            element:<Home/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        }
    ];
    const routesForAuthenticatedOnly=[
        {
            path:"/",
            element: <ProtectedRoute/>,
            children:[
                {
                    path:"/chat",
                    element:<Chat/>
                },
                {
                    path:"/logout",
                    element:<Logout/>
                }
            ]
        }
    ]
     const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;

}

export default Routes