import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSubscription,useStompClient } from "react-stomp-hooks";
function ChatWindow(props) {
  console.log("ChatWindow")
  const [message, setMessage] = useState("");
  const [recMessage, setrecMessage] = useState("");
  const stompClient = useStompClient();
  // Subscribe to the queue that we have opened in our spring boot app
  console.log(props.user)
  useEffect(()=>{
    stompClient.subscribe(`/user/${props.currUser}/reply`,message=>{
      console.log("Receiving")
      const parsedMessage=message.body
      setrecMessage(parsedMessage)
    })
  },[stompClient])


  let payload={
    "content":"Hello",
    "sender":props.currUser,
    "reciver":props.user,
    "type":"CHAT"
  }
  
  const publishMessage = (e) => {
    e.preventDefault()
    console.log("Sending message")
    if(stompClient) {
      stompClient.publish({destination: '/app/message/'+props.user, body:JSON.stringify(message)})
    }
  }

  return (
    <>
      <div> The broadcast message from websocket broker is {recMessage}</div>
      <Form onSubmit={(e)=>publishMessage(e)}>
          
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Send
            </Button>
          </div>
        </Form>
     
    </>
  );
}

export default ChatWindow;
