// src/pages/Medicines.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicineCard from "../components/MedicineCard";

export default function Medicines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/medicines", {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched medicines:", data);
        setMedicines(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleAddToCart = (medicineId) => {
    navigate(`/cart?medicine=${medicineId}`);
  };

  // Group medicines by category
  const categories = medicines.reduce((acc, medicine) => {
    const category = medicine.category || "General Medicine";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(medicine);
    return acc;
  }, {});

  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading medicines...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>;
  }

  if (medicines.length === 0) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>No medicines available.</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Medicines</h1>
      {Object.entries(categories).map(([category, categoryMedicines], index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          <h2 style={{ textDecoration: "underline" }}>{category}</h2>
          <div style={styles.scrollContainer}>
            <div style={styles.horizontalScroll}>
              {categoryMedicines.map((medicine) => (
                <MedicineCard 
                  key={medicine._id || medicine.id} 
                  medicine={medicine} 
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  scrollContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingBottom: "10px",
  },
  horizontalScroll: {
    display: "flex",
    gap: "1rem",
    paddingBottom: "10px",
  },
};
