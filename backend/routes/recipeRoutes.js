const express = require("express");
const router = express.Router();
const path = require("path");
const Recipe = require("../models/Recipe");
const User=require("../models/User")
const { single } = require("../config/multerConfig");

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  approveRecipe,
  rejectRecipe,
  restoreRecipe,
  getPendingRecipes,
  moveToPending,
  getUserRecipes
} = require("../controllers/recipeController");

const { authenticateUser, checkAdmin,protect } = require("../middleware/authMiddleware");

// Add recipe route with file upload
router.post(
  "/add", 
  authenticateUser, 
  (req, res, next) => {
    console.log('Request headers:', req.headers);
    console.log('Request body before multer:', req.body);
    
    single('image')(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ 
          message: 'File upload error', 
          error: err.message 
        });
      }
      
      console.log('File after multer:', req.file);
      console.log('Body after multer:', req.body);
      next();
    });
  },
  createRecipe 
);

// GET recipes by user email
// router.get("/user/:email", authenticateUser, async (req, res) => {
//   const { email } = req.params;
//   try {
//     const recipes = await Recipe.find({ email });
//     res.json(recipes);
//   } catch (error) {
//     console.error("Error fetching user's recipes:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/",getAllRecipes);
router.get("/user/:email", protect, async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const recipes = await Recipe.find({ user: user._id });
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching user's recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all recipes (admin or public)
router.get("/", protect, async (req, res) => {
  try {
    let recipes;

    if (req.user && req.user.isAdmin) {
      // Admin sees all recipes, regardless of status
      recipes = await Recipe.find();
    } else {
      // Normal users / guests see only approved recipes
      recipes = await Recipe.find({ status: "approved" });
    }

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user",authenticateUser, getRecipeById);

// Update recipe route with file upload
router.put(
  "/update/:id",
  authenticateUser,
  checkAdmin,
  (req, res, next) => {
    single('image')(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ 
          message: 'File upload error', 
          error: err.message 
        });
      }
      next();
    });
  },
  updateRecipe
);
router.get("/user/points", authenticateUser, getUserRecipes);
router.delete("/delete/:id", authenticateUser,checkAdmin, deleteRecipe);

// Admin routes
router.get("/pending", authenticateUser, checkAdmin, getPendingRecipes);
router.put("/approve/:id", authenticateUser, checkAdmin, approveRecipe);
router.put("/reject/:id", authenticateUser, checkAdmin, rejectRecipe);
router.put("/recipes/restore/:id",authenticateUser, checkAdmin, restoreRecipe);
router.put("/moveToPending/:id", authenticateUser,checkAdmin, moveToPending)

module.exports = router;
