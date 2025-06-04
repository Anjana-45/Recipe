const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  premiumSince: { type: Date },
  points: { type: Number, default: 0 },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);


