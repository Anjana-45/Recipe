const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require("../controllers/wishController");

// Add recipe to wishlist
router.post("/add", authenticateUser, addToWishlist);

// Remove recipe from wishlist
router.delete("/remove", authenticateUser, removeFromWishlist);

// Get user's wishlist
router.get("/", authenticateUser,  getWishlist);

module.exports = router;
