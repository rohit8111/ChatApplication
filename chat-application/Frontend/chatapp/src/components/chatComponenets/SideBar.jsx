import React, { useEffect, useState } from "react";
import { useChat } from "../../context/chatContext";
import UsersToChatWith from "./UsersToChatWith";
import ChatWindow from "./ChatWindow";
function SideBar() {
  const { usersList, setUsersList } = useChat();
  const [activeUser, setActiveUser] = useState("");
  console.log("Sidebar");
  console.log(usersList);

  return (
    {
      
    }
  );
}

export default SideBar;
