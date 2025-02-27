const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const blogRoutes = require("./routes/blogRoutes"); // Import blogRoutes

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/uploads", express.static("uploads")); // Serve images correctly
