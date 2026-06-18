import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Signup = () => {
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bank, setBank] = useState("");

  const handleLinkAccount = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/signup", {
        name, email, password, bankAccount: bank
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      window.location.href = "/"; // Force full reload to update auth state
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.message || "Error processing request"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="logo.png" alt="TradeX Logo" style={{ width: "120px", marginBottom: "2rem" }} />
        <h1>Welcome to TradeX</h1>
        <p>
          Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the seamless experience across all your devices.
        </p>
      </div>
      <div className="auth-right">
        <div className="auth-form">
          <h2>Create Account</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            <div className="bank-group">
              <div className="form-group">
                <label htmlFor="bank">Bank Account Number</label>
                <input type="text" id="bank" placeholder="1234567890" value={bank} onChange={(e) => setBank(e.target.value)} required />
              </div>
              <button type="button" className="btn-link-account" onClick={handleLinkAccount}>
                Link Account
              </button>
            </div>
            
            <button type="submit" className="btn-auth">Sign Up</button>
          </form>
          <div className="auth-switch">
            Already have an account? <Link to="/login">Log in here</Link>
          </div>
        </div>
      </div>
      {showToast && <div className="toast-message">✔ Account verified</div>}
    </div>
  );
};

export default Signup;
