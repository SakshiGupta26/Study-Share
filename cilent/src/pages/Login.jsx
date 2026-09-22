import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {login } = useAuth();
  const navigate = useNvigate();

  const [ formData, setFormData ] = useState({
    email : "",
    password : ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      await login(formData.email,formData.passwod);
      navigate("/dashboard")
    } catch(error){
      const message = error.response?.data?.message;
      if(Array.isArray(message)){
        setError(message.join(", "));
      } else{
        setError(message || "Login failed")
      }
    }
  }
  return (
    <div>
      <h1>Login</h1>

      {error && <p>{error}</p>}

      <form onSubmit = {handleSubmit}>
        <input
        type="email"
        name = "email"
        placeholder = "Email"
        value = {formData.email}
        onChange={handleChange}
        />
        <input 
        type="text"
        name= "password"
        placeholder='password'
        value = {formData.password}
        onChange = {handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
