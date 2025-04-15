import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BestSellerCard from "../components/BestSellerCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [allMedicines, setAllMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:8000/medicines", {
          credentials: "include",
        });
        const data = await response.json();
        setAllMedicines(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching medicines:", err);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = () => {
    setError("");

    const match = allMedicines.find((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (match) {
      navigate(`/medicine/${match._id || match.id}`);
    } else {
      setError("Medicine not found!");
    }
  };

  // Get top 5 medicines
  const bestSellers = allMedicines.slice(0, 5);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to MediStore</h1>
      <p>Your one-stop destination for all your medical needs.</p>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search for medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <h2>Best Sellers</h2>
      <div style={styles.grid}>
        {bestSellers.map((medicine) => (
          <BestSellerCard
            key={medicine._id || medicine.id}
            medicine={medicine}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginTop: "20px",
  },
};
