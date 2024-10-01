import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/adminsignup', values)
      .then(res => {
        console.log(res.data);
        navigate('/adminlogin');
      })
      .catch(err => console.log(err));
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup">
      <h2>Admin Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">User Name</label> <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={values.name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Enter Email</label> <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignup;
