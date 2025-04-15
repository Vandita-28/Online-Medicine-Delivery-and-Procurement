const imageUrl = item.image 
  ? `http://localhost:8000/uploads/${item.image}` 
  : "/placeholder.svg";

return (
  <div style={styles.container}>
    <img 
      src={imageUrl} 
      alt={item.name} 
      style={styles.image}
      onError={(e) => {
        console.error(`Error loading image for ${item.name}:`, e);
        e.target.src = "/placeholder.svg";
      }}
    />
  </div>
); 