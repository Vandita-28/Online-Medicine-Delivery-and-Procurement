import { Link } from "react-router-dom";

export default function MedicineCard({ medicine }) {
  // Log the medicine object to verify the image path
  console.log("Medicine data:", medicine);
  
  // Construct the image URL
  const imageUrl = medicine.image 
    ? `http://localhost:8000/uploads/${medicine.image}` 
    : "/placeholder.svg";
  
  return (
    <div style={styles.card}>
      <Link to={`/medicine/${medicine._id || medicine.id}`} style={{ textDecoration: "none", color: "black" }}>
        <img 
          src={imageUrl} 
          alt={medicine.name} 
          style={styles.image} 
          onError={(e) => {
            console.error(`Error loading image for ${medicine.name}:`, e);
            e.target.src = "/placeholder.svg";
          }}
        />
        <h3 style={styles.text}>{medicine.name}</h3>
        <p style={styles.text}><b>Manufacturer:</b> {medicine.manufacturer}</p>
        <p><b>Best Price:</b> <span style={{ color: "red", fontSize: "1.2rem" }}>Rs. {medicine.price}</span></p>
        <p><s>MRP Rs. {medicine.mrp}</s></p>
        <button style={styles.button}>SHOW DETAILS</button>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    width: "220px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    marginRight: "10px",
    flexShrink: 0,
    overflow: "hidden",
    wordWrap: "break-word",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
  },
  text: {
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "8px",
  },
};
