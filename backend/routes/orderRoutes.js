const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");

// Place order
router.post("/user/order", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "customer") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const { name, phone, address, items } = req.body;
    
    if (!name || !phone || !address) {
      return res.status(400).json({ error: "All delivery details are required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = new OrderModel({
      userId,
      items,
      totalAmount,
      deliveryDetails: { name, phone, address },
      createdAt: new Date(),
    });

    await order.save();
    
    res.status(200).json({ message: "Order placed", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Something went wrong while placing the order" });
  }
});

module.exports = router; 