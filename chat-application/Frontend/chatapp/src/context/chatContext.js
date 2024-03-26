import React, { createContext, useContext, useState } from 'react'
import { useMemo } from 'react';
const ChatContextobj=createContext();
const ChatContext=({children}) =>{
  const [usersList,setUsersList]=useState([]);
  const contextValue=useMemo(()=>({
  usersList,
    setUsersList
  }),[usersList]);
  return (
    <ChatContextobj.Provider value={contextValue}>{children}</ChatContextobj.Provider>
  );
}
export const useChat = () => {
    return useContext(ChatContextobj);
  };


export default ChatContext