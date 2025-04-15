import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [newMed, setNewMed] = useState({
    name: "",
    manufacturer: "",
    price: "",
    stock: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [editMed, setEditMed] = useState({});

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      fetchMedicines();
    }
  }, [user]);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/medicines", {
        withCredentials: true,
      });
      setMedicines(res.data);
    } catch (error) {
      console.error("Failed to fetch medicines", error);
    }
  };

  const handleAdd = async () => {
    if (!newMed.name || !newMed.manufacturer || !newMed.price || !newMed.stock || !newMed.image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newMed.name);
    formData.append("manufacturer", newMed.manufacturer);
    formData.append("price", newMed.price);
    formData.append("stock", newMed.stock);
    formData.append("image", newMed.image);

    try {
      await axios.post("http://localhost:8000/admin/medicines", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewMed({ name: "", manufacturer: "", price: "", stock: "", image: null });
      fetchMedicines();
    } catch (error) {
      console.error("Failed to add medicine", error);
      alert("Error adding medicine. Please try again.");
    }
  };

  const startEdit = (med) => {
    setEditId(med._id);
    setEditMed({
      name: med.name || "",
      manufacturer: med.manufacturer || "",
      price: med.price || 0,
      stock: med.stock || 0
    });
  };

  const handleEdit = async () => {
    console.log("Saving medicine:", editId, editMed);
    try {
      const response = await axios.put(`http://localhost:8000/admin/medicines/${editId}`, editMed, {
        withCredentials: true,
      });
      console.log("Update response:", response.data);
      setEditId(null);
      fetchMedicines();
      alert("Medicine updated successfully!");
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert(`Error updating medicine: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/medicines/${id}`, {
        withCredentials: true,
      });
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Inventory Management</h2>

      {/* Add New Medicine Form */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
        />
        <input
          placeholder="Manufacturer"
          value={newMed.manufacturer}
          onChange={(e) => setNewMed({ ...newMed, manufacturer: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMed.price}
          onChange={(e) => setNewMed({ ...newMed, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newMed.stock}
          onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewMed({ ...newMed, image: e.target.files[0] })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <hr />
      <h4>Medicine Inventory</h4>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id}>
              <td>
                <img
                  src={med.image ? `http://localhost:8000/uploads/${med.image}` : "/placeholder.svg"}
                  alt={med.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  onError={(e) => {
                    console.error(`Error loading image for ${med.name}:`, e);
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </td>
              {editId === med._id ? (
                <>
                  <td>
                    <input
                      value={editMed.name}
                      onChange={(e) => setEditMed({ ...editMed, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={editMed.manufacturer}
                      onChange={(e) => setEditMed({ ...editMed, manufacturer: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editMed.price}
                      onChange={(e) => setEditMed({ ...editMed, price: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editMed.stock}
                      onChange={(e) => setEditMed({ ...editMed, stock: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{med.name}</td>
                  <td>{med.manufacturer}</td>
                  <td>{med.price}</td>
                  <td>{med.stock}</td>
                  <td>
                    <button onClick={() => startEdit(med)}>Edit</button>
                    <button onClick={() => handleDelete(med._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
