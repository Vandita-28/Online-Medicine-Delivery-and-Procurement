import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
  };

  const calculateDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    return deliveryDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleConfirmOrder = async () => {
    if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address) {
      alert("Please fill all delivery details.");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart first.");
      return;
    }

    try {
      console.log("Sending order with cart:", cart);
      
      // Format cart items for the backend
      const formattedCartItems = cart.map(item => ({
        medicineId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const payload = {
        ...deliveryDetails,
        items: formattedCartItems
      };

      const response = await axios.post("http://localhost:8000/user/order", payload, {
        withCredentials: true,
      });

      setReceipt({
        ...response.data.order,
        deliveryDate: calculateDeliveryDate()
      });
      clearCart(); 
    } catch (err) {
      console.error("Order failed", err);
      alert("Order failed. Try again.");
    }
  };

  if (receipt) {
    return (
      <div style={receiptContainerStyle}>
        <div style={receiptStyle}>
          <h2 style={receiptTitleStyle}>Order Receipt</h2>
          
          <div style={receiptSectionStyle}>
            <h3 style={sectionTitleStyle}>Delivery Details</h3>
            <p><b>Name:</b> {receipt.deliveryDetails.name}</p>
            <p><b>Phone:</b> {receipt.deliveryDetails.phone}</p>
            <p><b>Address:</b> {receipt.deliveryDetails.address}</p>
            <p><b>Delivery Date:</b> {receipt.deliveryDate}</p>
          </div>

          <div style={receiptSectionStyle}>
            <h3 style={sectionTitleStyle}>Items Ordered</h3>
            <div style={itemsListStyle}>
              {receipt.items.map((item, i) => (
                <div key={i} style={itemStyle}>
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={totalSectionStyle}>
            <h3>Total Amount: ₹{receipt.totalAmount}</h3>
          </div>

          <div style={successMessageStyle}>
            <p>Order placed successfully!</p>
            <p>Thank you for shopping with us.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Enter Delivery Details</h2>
      <input
        name="name"
        placeholder="Full Name"
        value={deliveryDetails.name}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={deliveryDetails.phone}
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={deliveryDetails.address}
        onChange={handleChange}
        style={{ ...inputStyle, height: "100px" }}
      />

      <button onClick={handleConfirmOrder} style={buttonStyle}>
        Confirm Order
      </button>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "1.1rem",
  cursor: "pointer",
  marginTop: "1rem",
};

const receiptContainerStyle = {
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
};

const receiptStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  width: "100%",
};

const receiptTitleStyle = {
  textAlign: "center",
  color: "#2c3e50",
  marginBottom: "2rem",
  borderBottom: "2px solid #eee",
  paddingBottom: "1rem",
};

const receiptSectionStyle = {
  marginBottom: "2rem",
};

const sectionTitleStyle = {
  color: "#34495e",
  marginBottom: "1rem",
};

const itemsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem",
  borderBottom: "1px solid #eee",
};

const totalSectionStyle = {
  textAlign: "right",
  marginTop: "2rem",
  paddingTop: "1rem",
  borderTop: "2px solid #eee",
};

const successMessageStyle = {
  textAlign: "center",
  marginTop: "2rem",
  color: "#28a745",
};
