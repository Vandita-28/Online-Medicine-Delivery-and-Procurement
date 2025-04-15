import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";

export default function UserNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        MedDelivery
      </Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/medicines" style={styles.link}>Medicines</Link>
        <Link to="/equipment" style={styles.link}>Equipment</Link>
        {user && (
          <>
            <Link to="/orders" style={styles.link}>Order Details</Link>
            <Link to="/cart" style={styles.link}>
              <FaShoppingCart /> Cart
            </Link>
          </>
        )}
      </div>
      <div style={styles.auth}>
        {user ? (
          <>
            <span style={styles.username}>Hello, {user.username}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#007bff", // Primary blue color
    color: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
  username: {
    color: "#fff",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#007bff",
    },
  },
}; 