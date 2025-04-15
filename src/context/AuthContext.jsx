import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user session from backend on app start
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8000/session", {
          credentials: "include", // Send cookies
        });

        const data = await response.json();
        if (response.ok && data.user) {
          setUser({
            id: data.user.id,
            username: data.user.username,
            role: data.user.role, 
          });
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };

    checkSession();
  }, []);


  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid credentials");

      const userInfo = {
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
      };

      setUser(userInfo);
      return userInfo; 
    } catch (error) {
      throw error;
    }
  };

  // Logout function - only clears user state
  const logout = async () => {
    try {
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include", 
      });
      setUser(null); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
