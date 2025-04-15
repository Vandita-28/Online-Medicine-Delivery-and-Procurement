import React from "react";
import MedicineCard from "../components/MedicineCard";
import bp from "../assets/images/bp.jpg";
import thermo from "../assets/images/thermo.jpg";
import nebu from "../assets/images/nebu.jpg";
import gluco from "../assets/images/gluco.jpg";
import oxi from "../assets/images/oxi.jpg";

export default function Equipments() {
  const equipmentList = [
    { id: 35, name: "Blood Pressure Monitor", manufacturer: "Omron", price: 1200, mrp: 1500, description: "Automatic BP monitor for home use with high accuracy.", image: bp },
    { id: 36, name: "Digital Thermometer", manufacturer: "Dr. Morepen", price: 250, mrp: 400, description: "Fast and accurate digital thermometer for fever measurement.", image: thermo },
    { id: 37, name: "Nebulizer Machine", manufacturer: "Philips", price: 2200, mrp: 2800, description: "High-quality nebulizer for asthma and respiratory conditions.", image: nebu },
    { id: 4, name: "Dr. Morepen GlucoOne Blood Glucose Monitor", manufacturer: "Morepen Laboratories Ltd", price: 400.0, mrp: 500.0, description: "A reliable device designed to help you monitor your blood glucose levels at home.", image: gluco },
    { id: 38, name: "Oximeter", manufacturer: "Karma Healthcare", price: 7500, mrp: 9000, description: "A portable device that measures oxygen levels (SpO2) and pulse rate for respiratory health monitoring.", image: oxi },
  ];

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Medical Equipment</h1>
      <p>Find high-quality medical equipment for your healthcare needs.</p>

      <div style={styles.grid}>
        {equipmentList.map((equipment) => (
          <MedicineCard key={equipment.id} medicine={equipment} />
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
