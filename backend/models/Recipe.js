const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    category: { type: String, required: true, enum: ["veg", "non-veg"]},
    procedure: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    view: {
      type: String,
      enum: ["common", "premium"],
      default: "common", 
    },
    image: { type: String },
    
    submittedBy: { type: String },
    isApproved: { type: Boolean, default: false }, 
    createdBy: { type: String, default: "user" },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
