const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");
//user model to get email:PS
const User = require('../models/User');
//require nodemailer : PS
const nodemailer = require('nodemailer');
require('dotenv').config();
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


    // Send order confirmation email to user FEATURE: PS
    //need email for nodemailer: PS 
    const userEmail = await User.findById(userId).select('email');
    // Create the order summary
    let orderSummary = 'Thank you for your order!\n\nHere are your order details:\n\n';

    order.items.forEach((item, index) => {
      orderSummary += `${index + 1}. ${item.name} - Qty: ${item.quantity}, Price: ₹${item.price}\n`;
    });
    orderSummary += `\nTotal Amount: ₹${order.totalAmount}\n`;
    orderSummary += `\nDelivery To:\n${order.deliveryDetails.name}\n${order.deliveryDetails.phone}\n${order.deliveryDetails.address}`;
    
    // generating an email using nodemailer: PS
    // confims order placed to user: PS
    //this pass is an app pass: PS
    // create an app password for your email account and use it here: PS
    // transporter auth part needs to be an admin email: PS
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // app password generated from your email account
      }
    });

    // edit the from email -> admin email: PS
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Order Placed Successfully',
      text: orderSummary,
    };
    //send mail code: PS
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error sending email:', error);
      }
      console.log('Email sent:', info.response);
    });
    // feature ends, can be made modular: PS
    
    
    res.status(200).json({ message: "Order placed", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Something went wrong while placing the order" });
  }
});

module.exports = router; 