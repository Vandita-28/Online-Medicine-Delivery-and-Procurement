import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa"; // Logout icon

export default function NavBar() {
  const { user, logout } = useContext(AuthContext); // Get user and logout function

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>MediStore</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.navLink}>Home</Link></li>
        <li><Link to="/medicines" style={styles.navLink}>Medicines</Link></li>
        <li><Link to="/equipment" style={styles.navLink}>Equipment</Link></li>
        <li><Link to="/order" style={styles.navLink}>Order Details</Link></li>
        <li><Link to="/cart" style={styles.navLink}>Cart</Link></li>

        {user ? ( // If user is logged in
          <>
            <li style={styles.username}>Hello, {user.username}!</li>
            <li>
              <button onClick={logout} style={styles.logoutButton}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : ( // If user is NOT logged in
          <>
            <li><Link to="/login" style={styles.navLink}>Login</Link></li>
            <li><Link to="/signup" style={styles.navLink}>Signup</Link></li>
          </>
        )}
      </ul>
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
    backgroundColor: "#007bff",
    color: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  logo: { fontSize: "1.8rem", fontWeight: "bold", letterSpacing: "1px" },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: "0",
    padding: "0",
    alignItems: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  username: {
    color: "yellow",
    fontSize: "1rem",
    fontWeight: "600",
  },
  logoutButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "5px",
  }
};
