const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const imageFetchRoute = require("./routes/fileFetch");
const fileuploadRoute = require("./routes/fileUploads");
const passwordRoutes = require("./routes/passwordRoutes");
const adminRoutes = require("./routes/admin");
const paymentRoutes = require("./routes/paymentRoutes");
const wishlistRoutes = require("./routes/wishRoutes");
const mailRoutes=require("./routes/authRoutes")

const app = express();


connectDB();


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/wishlist", wishlistRoutes);



// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from images directory
app.use("/uploads/images", express.static(path.join(__dirname, "uploads", "images")));

app.use("/api/admin", adminRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploadimage", fileuploadRoute);
app.use("/api/getImages", imageFetchRoute);
app.use("/api/password", passwordRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", mailRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
