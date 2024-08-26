import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // Separate state for login error

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmSignupPassword, setConfirmSignupPassword] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState(""); // Separate state for signup error

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9999/user/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.messages) {
        setLoginErrorMessage(error.response.data.messages.join(" "));
      } else {
        setLoginErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    if (signupPassword !== confirmSignupPassword) {
      setSignupErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9999/user/signup", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", signupName);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.messages) {
        setSignupErrorMessage(error.response.data.messages.join(" "));
      } else {
        setSignupErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <h2>Login</h2>
        {loginErrorMessage && (
          <p className="error-message">{loginErrorMessage}</p>
        )}
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              className="form-input"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              className="form-input"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>

      <div className="signup-container">
        <h2>Sign Up</h2>
        {signupErrorMessage && (
          <p className="error-message">{signupErrorMessage}</p>
        )}
        <form onSubmit={handleSignupSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="signup-name">Name</label>
            <input
              type="text"
              id="signup-name"
              className="form-input"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              className="form-input"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              className="form-input"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-signup-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-signup-password"
              className="form-input"
              value={confirmSignupPassword}
              onChange={(e) => setConfirmSignupPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
