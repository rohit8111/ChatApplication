import React from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "../context/authProvider";
import SideBar from "./chatComponenets/SideBar";
import ChatWindow from "./chatComponenets/ChatWindow";
import { StompSessionProvider} from "react-stomp-hooks";
import ChatContext from "../context/chatContext";
import AddUser from "./chatComponenets/AddUser";

function Chat() {
  console.log("Chat");
  const {token, setToken } = useAuth();
  const handleLogout = () => {
    setToken();
    return <Navigate to="/login" />;
  };
  console.log("ChatJs",token)
  return (
    <>
    <StompSessionProvider url={'http://localhost:8080/websocket'}
    headers={{ Authorization: `Bearer ${token}` }}
    >
     <ChatContext>
        <AddUser/>
      </ChatContext>
      <Button onClick={() => handleLogout()}>Logout</Button>
      </StompSessionProvider>
    </>
  );
}

export default Chat;
