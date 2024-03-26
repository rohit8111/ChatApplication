import React, { useEffect, useState } from 'react'
import { useChat } from '../../context/chatContext'
import axios from 'axios'
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from '../../context/authProvider';
import ChatWindow from './ChatWindow';
import AlertMessage from '../AlertMessage'
import { Navigate } from "react-router-dom";
function AddUser() {
  //List of all the emails that curruser has added
  const {usersList,setUsersList}=useChat()
  const {token,setToken}=useAuth();
  //new user to add 
  const [user,setUser]=useState("")
  const [currUser,setCurrUser]=useState(localStorage.getItem("currUser"))
  const [userToChat,setUserToChat]=useState("")
  const [clickedUser,setClickedUser] = useState(null);
  const [statusCode,setStatusCode]=useState();
  const addUserToList=(e)=>{
    setUser(userToChat)
  }
  const util=async()=>{
    console.log("useEffect")
    let resp=""
    try {
       resp=await axios.post("http://localhost:8080/chat/addUser",{
         "currUser":currUser,
          "userToAdd":user
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    } catch (error) {
      if(error.response.status==403){
        console.log("403 status");
        setToken();
        setStatusCode("403");
        alert("Session Expired, please login again")
        return;
      
      }
      console.log(error.response.status)
    }
    
      console.log(resp)
      if(resp.status===200)
        {
          const data=await resp.data;
          console.log(data)
          setUsersList(data[currUser])
          setStatusCode("200");
          console.log(usersList)
        }
      else alert("There is some problem while adding users, please try again later")
  }
  useEffect(()=> {
     util();
     return;
    } 
  ,[user],[])
  const handleClickUser=(name)=>{
    setClickedUser(name==clickedUser?null:name)
  }
  return (
    <>
    <Form onSubmit={addUserToList}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add user"
              onChange={(e) => setUserToChat(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add user
            </Button>
          </div>
        </Form>

        {
         usersList!=null ?
          usersList.map((name,index)=>{
            if(name!='')
            return  <li onClick={()=>handleClickUser(name)}>{name}</li>
          }):null
        }
      
        {statusCode==="200" && clickedUser && <ChatWindow user={clickedUser} currUser={currUser}/>}
        {statusCode==="403" && <Navigate to="/login" />}
    </>
  )
}

export default AddUser