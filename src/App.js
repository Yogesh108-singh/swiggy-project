import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Swiggy from "./swiggy";
import Login from "./Login";
import Signup from "./Signup";
import OrderPage from "./OrderPage";
import { AuthContext } from "./AuthContext";

export default function App() {
  const { user, logout } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <nav className="nav">
        <Link to="/swiggy" className="logo">Swiggy</Link>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "12px" }}>Welcome, {user.email}</span>
              <button onClick={logout}>Logout</button>
              <Link to="/order" style={{ marginLeft: "12px" }}>🛒 Cart ({cart.length})</Link>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: "12px" }}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/swiggy" element={<Swiggy cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<OrderPage cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}
