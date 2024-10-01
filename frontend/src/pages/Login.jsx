import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        localStorage.setItem('token', res.data.token);  
        navigate("/userdashboard");  
      })
      .catch(err => setError("Invalid login credentials"));
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
       <div className="form-group">
       <label htmlFor=""> User Mail</label> <br />
       <input type="email" name="email" placeholder="Enter email" onChange={handleInput} />
       </div>
       <div className="form-group">
       <label htmlFor=""> Password</label> <br />
       <input type="password" name="password" placeholder="Enter password" onChange={handleInput} />
       </div>
        <button type="submit " className="btn">Login</button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default Login;
