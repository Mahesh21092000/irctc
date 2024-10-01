import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import Welcome from "./pages/Welcome";
import AdminLogin from "./pages/AdmilLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
