const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/kitchen"; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
