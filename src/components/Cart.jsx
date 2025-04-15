import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return parseFloat(cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handlePlaceOrder = () => {
    navigate("/order");
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some medicines to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      <div style={styles.cartItems}>
        {cart.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p><b>Manufacturer:</b> {item.manufacturer}</p>
              <p><b>Price:</b> Rs. {item.price}</p>
              <div style={styles.quantityControls}>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  -
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <h3>Order Summary</h3>
        <p><b>Total Items:</b> {cart.reduce((total, item) => total + item.quantity, 0)}</p>
        <p><b>Total Amount:</b> Rs. {calculateTotal()}</p>
        <button onClick={handlePlaceOrder} style={styles.placeOrderButton}>
          Place Order
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  emptyCart: {
    textAlign: "center",
    padding: "3rem",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  cartItem: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  itemDetails: {
    flex: 1,
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  quantityButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    minWidth: "30px",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  summary: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  placeOrderButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1rem",
    width: "100%",
    marginTop: "1rem",
  },
}; 