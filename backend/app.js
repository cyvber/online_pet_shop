require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const brandRoutes = require("./routes/brandRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Initialize the app
const app = express();

// Environment Variables
const mongo_url = process.env.MONGO_URL; // MongoDB connection string
const allowedOrigins = process.env.API_URL

// CORS Configuration
app.use(
  cors({
    origin: allowedOrigins, // Only allow specified origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
    credentials: true, // Enable credentials (if required)
  })
);

// Middleware
app.use(express.json());

// Database Connection
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Serve static files
app.use("/images", express.static(path.join(__dirname, "upload/images")));
app.use("/logos", express.static(path.join(__dirname, "upload/logos")));

// Use routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/orders", orderRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
