import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation logic here
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        console.log(res.data);
        navigate("/login"); // Redirect to login after successful signup
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup">
      <h2> User Sign Up</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="">Name: </label> <br />
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Mail: </label> <br />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password:</label> <br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
