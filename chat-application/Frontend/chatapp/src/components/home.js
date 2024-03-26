import React from 'react'
import { Link, useNavigate } from "react-router-dom";
function Home() {
  return (
    <>
    <div>Welcome to HowsApp</div>
    <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    <div className="p-4 box mt-3 text-center">
    Don't have an account? <Link to="/register">Sign up</Link>
    </div>
  </>
  )
}

export default Home