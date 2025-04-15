import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt, FaTachometerAlt, FaBoxes, FaUserCog } from "react-icons/fa";

export default function AdminNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>MediStore Admin</h2>
      <ul style={styles.navLinks}>


      </ul>
      <div style={styles.auth}>
        <span style={styles.username}>Admin: {user?.username}</span>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt /> Logout
        </button>
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
    backgroundColor: "#2c3e50", // Different color for admin navbar
    color: "white",
    boxShadow: "0px 4px 10px rgba(36, 70, 184, 0.1)",
  },
  logo: { 
    fontSize: "1.8rem", 
    fontWeight: "bold", 
    letterSpacing: "1px",
    color: "#ecf0f1" 
  },
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
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  username: {
    color: "#f1c40f", // Different color for admin username
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
  },
  auth: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
}; 