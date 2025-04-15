import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../context/AuthContext.jsx"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To show error messages
  const navigate = useNavigate(); 
  const authContext = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!authContext || !authContext.login) {
        // Direct API call
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
  
        alert("Login Successful!");
  
      
        if (data.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        // Using AuthContext login
        const user = await authContext.login(email, password); // Update to return user from context if possible
  
        alert("Login Successful!");
  
        // If AuthContext does not return user, fetch session manually
        const res = await fetch("http://localhost:8000/session", { credentials: "include" });
        const sessionData = await res.json();
  
        if (sessionData.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "20px", color: "#007bff" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />

        {error && <p style={styles.error}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button type="submit" style={styles.button}>
            Login
          </button>

          <button type="button" style={styles.button} onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(145deg,rgb(55, 88, 93), #80deea)",
    position: "fixed",
    top: 0,
    left: 0,
  },
  form: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 30px rgba(45, 86, 218, 0.1)",
    width: "400px",
    textAlign: "center",
  },
  input: {
    width: "70%",
    padding: "12px",
    margin: "10px 0",
    border: "2px solid #ddd",
    borderRadius: "10px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    width: "49%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Login;
