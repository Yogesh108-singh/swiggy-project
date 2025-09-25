import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPage({ cart, setCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const removeFromCart = (indexToRemove) => {
    setCart(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Cart is empty");
    alert(`Swiggy Checkout — Total: ₹${total}`);
    setCart([]);
    navigate("/swiggy"); // ✅ redirect to Swiggy homepage
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h2>🛒 Your Order</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ color: "#666" }}>₹{item.price}</div>
              </div>
              <button
                style={{
                  color: "#e23744",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => removeFromCart(idx)}
              >
                Remove
              </button>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              fontWeight: 700,
            }}
          >
            <div>Total</div>
            <div>₹{total}</div>
          </div>
          <button
            style={{
              marginTop: 12,
              padding: "10px 16px",
              borderRadius: 8,
              background: "#e23744",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
