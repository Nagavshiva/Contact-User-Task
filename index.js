const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db")

// routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();
connectToDb();

const app = express();

// middleware 
app.use(express.json()); // parses incoming requests with JSON payloads 
app.use(express.urlencoded({ extended: true })); // parses incoming requests with URL-encoded payloads 

// routes
app.use("/auth",authRoutes);
app.use("/contacts", contactRoutes);

// Start the server 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) }); 
