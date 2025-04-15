import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function MedicineDetails() {
  const { id } = useParams(); 
  const [medicine, setMedicine] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch("http://localhost:8000/medicines", {
          credentials: "include",
        });
        const allMedicines = await response.json();
        // Try to find by _id first, then by id
        const found = allMedicines.find((m) => m._id === id) || 
                     allMedicines.find((m) => m.id === parseInt(id));
        
        if (found) {
          setMedicine(found);
        } else {
          console.log("Medicine not found with id:", id);
          setMedicine(null);
        }
      } catch (err) {
        console.error("Failed to fetch medicine:", err);
        setMedicine(null);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: medicine._id || medicine.id, // handle both _id and id
      name: medicine.name,
      manufacturer: medicine.manufacturer,
      price: medicine.price,
      image: medicine.image ? `http://localhost:8000/uploads/${medicine.image}` : "https://via.placeholder.com/150",
      quantity: 1,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (!medicine) {
    return <h2 style={{ textAlign: "center" }}>Medicine not found</h2>;
  }

  const imageUrl = medicine.image 
    ? `http://localhost:8000/uploads/${medicine.image}` 
    : "/placeholder.svg";

  return (
    <div style={styles.container}>
      {showNotification && (
        <div style={styles.notification}>Item added to cart successfully!</div>
      )}
      <div style={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={medicine.name} 
          style={styles.image}
          onError={(e) => {
            console.error(`Error loading image for ${medicine.name}:`, e);
            e.target.src = "/placeholder.svg";
          }}
        />
      </div>
      <div>
        <h1>{medicine.name}</h1>
        <p>
          <b>Manufacturer:</b> {medicine.manufacturer}
        </p>
        <p>
          <b>Best Price:</b>{" "}
          <span style={{ color: "red" }}>Rs. {medicine.price}</span>
        </p>
        <p>
          <s>MRP Rs. {medicine.mrp}</s>
        </p>
        <p>{medicine.description}</p>
        <button style={styles.button} onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "2rem",
  },
  imageContainer: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
  notification: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#28a745",
    color: "white",
    padding: "15px 25px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    animation: "slideIn 0.5s ease-out",
    zIndex: 1000,
  },
};
