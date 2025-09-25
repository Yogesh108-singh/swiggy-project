// src/Login.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If already logged in, go to Swiggy homepage
  useEffect(() => {
    if (user) navigate("/swiggy");
  }, [user, navigate]);

  function handleLogin(e) {
    e.preventDefault();

    // Basic validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Reset error and login
    setError("");
    login(email);
    navigate("/swiggy"); // redirect to Swiggy home
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Error message */}
        {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Extra option */}
      <p style={{ marginTop: 10, fontSize: 14 }}>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
