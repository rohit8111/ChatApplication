import React, { useState } from 'react'
import ChatWindow from './ChatWindow'

function UsersToChatWith(props) {
    
  let component=[]
  const [showChatWindow,setShowChatWindow]=useState(null)
  console.log("UserS ToChat with")
  const loadComponent=(e)=>{
   setShowChatWindow(<ChatWindow user={props.user}/>)
  }
  return (
    <>
    <h1 onClick={loadComponent}>{props.user}</h1>
    </>
  )
}

export default UsersToChatWith