import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios'
import { useAuth } from "../context/authProvider";
import {Navigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const { logIn, googleSignIn } = useUserAuth();
//   const navigate = useNavigate();
  const {token,setToken}=useAuth();
  if(token){
   return <Navigate to="/chat"/>
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const resp=await axios.post("http://localhost:8080/rest/auth/login",{
        "email":email,
        "password":password
      })
      if(resp.status==200)
        {
          const data=await resp.data;
          setToken(data.token)
          localStorage.setItem("currUser",email)
          alert("Login successful",resp)
        }
        
      else alert("login failed")
    //   navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">React Chat Application</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </>
  );
};

export default Login;