import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const {register} = useAuth();
  const navigate = useNavigate();

  const [formData,setFromData] = useState({
    name : "",
    email : "",
    password : ""
  });

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name] : e.target.value
    })
  };

  const handleSubmit = async(e) => {
     e.preventDefault();
     setError("");

     try {
      await register(formData.name,formData.email,formData.password);
      navigate("/dashboard")
     } catch(error){
      const message = error.response?.data?.message;
      if(Array.isArray(message)){
        setError(message.join(", "));
      } else{
        setError(message || "Error in register");
      }
     }
  }
  return (
    <div>
      <h1>Register</h1>
      {error && <p>error</p>}
      <form onSubmit = {handleSubmit}>
        <input
        type = "text"
        name ="name"
        placeholder='Name'
        value= {fromData.name}
        onChange={handleChange}
        />
        <input
        type = "email"
        name = "email"
        placeholder='Email'
        value = {fromData.email}
        onChnage = {handleChange}
        />
        <input 
        type= "text"
        name = "pasword"
        placeholder = "Password"
        value = {fromData}
        onChnage = {handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
