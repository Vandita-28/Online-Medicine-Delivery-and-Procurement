import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserNavBar from "./components/UserNavBar";
import AdminNavBar from "./components/AdminNavBar";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Cart from "./pages/Cart";
import MedicineDetails from "./pages/MedicineDetails";
import Footer from "./components/Footer";
import Equipments from "./pages/Equipments";
import Order from "./pages/Order";
import AdminDashboard from "./pages/AdminDashboard";


const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <Router>
      {user && user.role === "admin" ? <AdminNavBar /> : <UserNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/equipment" element={<Equipments />} />
        <Route path="/order" element={<Order />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin-inventory" 
          element={
            <AdminRoute>
              <div style={{ padding: "2rem" }}>
                <h1>Manage Inventory</h1>
                <p>This page is under construction.</p>
              </div>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin-orders" 
          element={
            <AdminRoute>
              <div style={{ padding: "2rem" }}>
                <h1>Manage Orders</h1>
                <p>This page is under construction.</p>
              </div>
            </AdminRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


