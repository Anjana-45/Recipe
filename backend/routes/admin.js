const express = require("express");
const { authenticateUser, checkAdmin } = require("../middleware/authMiddleware");
const Recipe = require("../models/Recipe");
const User = require("../models/User"); 
const router = express.Router();

// ✅ Get All Recipes (admin only)
router.get("/recipes", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "email");
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    res.status(500).json({ message: "Error fetching all recipes" });
  }
});

// ✅ Get Pending Recipes (admin only)
router.get("/recipes/pending", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const pendingRecipes = await Recipe.find({ status: "pending" }).populate("user", "email");
    res.json(pendingRecipes);
  } catch (error) {
    console.error("Error fetching pending recipes:", error);
    res.status(500).json({ message: "Error fetching pending recipes" });
  }
});

// ✅ Get Rejected Recipes (admin only)
router.get("/recipes/rejected", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const rejectedRecipes = await Recipe.find({ status: "rejected" }).populate("user", "email");
    res.json(rejectedRecipes);
  } catch (error) {
    console.error("Error fetching rejected recipes:", error);
    res.status(500).json({ message: "Error fetching rejected recipes" });
  }
});

// ✅ Approve Recipe (admin only)
router.patch("/recipes/approve/:id", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.status = "approved";
    await recipe.save();

    res.json({ message: "✅ Recipe approved!", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error approving recipe" });
  }
});

// ✅ Reject Recipe (admin only)
router.delete("/recipes/reject/:id", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", isApproved: false },
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json({ message: "❌ Recipe rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting recipe" });
  }
});

// ✅ Restore Rejected Recipe to Pending (admin only)
router.put("/recipes/restore/:id", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { status: "pending", isApproved: false },
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json({ message: "🔄 Recipe restored to pending", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error restoring recipe" });
  }
});

// ✅ Get All Users (admin only)
router.get("/users", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Delete a User by ID (admin only)
router.delete("/users/:id", authenticateUser, checkAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
