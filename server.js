const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ====== MongoDB Connection ======
mongoose.connect("mongodb://127.0.0.1:27017/foodexpress")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// ====== Order Schema ======
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  payment: String,
  total: Number
});

const Order = mongoose.model("Order", orderSchema);

// ====== Middleware ======
app.use(express.static("public")); // serve CSS, JS, images
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ====== ROUTES ======

// Serve login page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve home page at /home
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  console.log("LOGIN REQUEST RECEIVED:", req.body);

  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    res.redirect("/home"); // redirect to home after login
  } else {
    res.send("Invalid Email or Password");
  }
});

// PLACE ORDER ROUTE
app.post("/place-order", async (req, res) => {
  try {
    console.log("ORDER RECEIVED:", req.body);

    const newOrder = new Order({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      payment: req.body.payment,
      total: Number(req.body.total)
    });

    await newOrder.save();

    console.log("Order Saved Successfully");
    res.send("Order placed successfully!");
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.send("Error placing order");
  }
});

// GET ALL ORDERS (API)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.log("FETCH ORDERS ERROR:", error);
    res.send("Error fetching orders");
  }
});

// ====== START SERVER ======
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});