import React, { useState } from 'react'

function OnetoOne() {
  const [message,setMessage]=useState();
  return (
    <input type="text" placeholder="Enter Message" value={message}/>
  )
}

export default OnetoOne