import { Link } from "react-router-dom";
export default function BestSellerCard({ medicine }) {
  // Log the medicine object to verify the image path
  console.log("BestSeller medicine data:", medicine);
  
  return (
    <div style={styles.card}>
      <Link to={`/medicine/${medicine._id || medicine.id}`} style={styles.link}>
        <img 
          src={`../../backend/uploads/${medicine?.image}`} 
          alt={medicine.name} 
          style={styles.image}
        />
        <h3 style={styles.text}>{medicine.name}</h3>
        <p style={styles.text}><b>Mkt:</b> {medicine.manufacturer}</p>
        <p><b>Best price:</b> <span style={{ color: "red" }}>Rs. {medicine.price}</span></p>
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
  link: {
    textDecoration: "none",
    color: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
