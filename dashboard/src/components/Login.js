import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/"; // Force full reload to update auth state
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || "Invalid Credentials"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="logo.png" alt="TradeX Logo" style={{ width: "120px", marginBottom: "2rem" }} />
        <h1>Welcome Back</h1>
        <p>
          The central dashboard for your TradeX account. Gain insights into your trades and investments with in-depth reports and visualisations.
        </p>
      </div>
      <div className="auth-right">
        <div className="auth-form">
          <h2>Login to TradeX</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            <button type="submit" className="btn-auth">Login</button>
          </form>
          
          <div className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
