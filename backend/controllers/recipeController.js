const Recipe = require("../models/Recipe");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// Create a new recipe
// const createRecipe = async (req, res) => {
//   try {
//     const { title, ingredients, procedure, category, } = req.body;

//     // Validate required fields
//     if (!title || !ingredients || !procedure || !category) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // Parse ingredients from JSON string
//     let parsedIngredients;
//     try {
//       parsedIngredients = JSON.parse(ingredients);
//       if (!Array.isArray(parsedIngredients)) {
//         throw new Error("Ingredients must be an array");
//       }
//     } catch (error) {
//       return res.status(400).json({ message: "Invalid ingredients format" });
//     }

//     // Validate category
//     if (!["veg", "non-veg"].includes(category)) {
//       return res.status(400).json({ message: "Invalid category" });
//     }

//     // Check for image file
//     if (!req.file) {
//       return res.status(400).json({ message: "Recipe image is required" });
//     }

//     const imagePath = `/uploads/images/${req.file.filename}`;

//     const isAdmin = req.user?.isAdmin;
//     const status = isAdmin ? "approved" : "pending";

//     const recipeData = {
//       title,
//       ingredients: parsedIngredients,
//       procedure,
//       category,
//       status,
//       view: "common",
//       createdBy: isAdmin ? "admin" : "user",
//       submittedBy: req.user.email,
//       image: imagePath,
//       isApproved: isAdmin
//     };

//     if (!isAdmin) {
//       recipeData.user = req.user.id;  // Corrected from _id to id
//     }

//     const recipe = new Recipe(recipeData);
//     await recipe.save();

//     return res.status(201).json({
//       message: "Recipe created successfully",
//       recipe: {
//         ...recipe._doc,
//         image: `${req.protocol}://${req.get("host")}${imagePath}`,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating recipe:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, procedure, category, isPremium } = req.body;

    if (!title || !ingredients || !procedure || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let parsedIngredients;
    try {
      parsedIngredients = JSON.parse(ingredients);
      if (!Array.isArray(parsedIngredients)) {
        throw new Error("Ingredients must be an array");
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid ingredients format" });
    }

    if (!["veg", "non-veg"].includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Recipe image is required" });
    }

    const imagePath = `/uploads/images/${req.file.filename}`;
    const isAdmin = req.user?.isAdmin;
    const premiumValue = isPremium === 'true' || isPremium === true;

    const recipeData = {
      title,
      ingredients: parsedIngredients,
      procedure,
      category,
      status: isAdmin ? "approved" : "pending",
      view: isAdmin ? (premiumValue ? "premium" : "common") : "common",
      createdBy: isAdmin ? "admin" : "user",
      submittedBy: req.user.email,
      image: imagePath,
      isApproved: isAdmin,
      isPremium: premiumValue
    };

    if (!isAdmin) {
      recipeData.user = req.user.id;
    }

    const recipe = new Recipe(recipeData);
    await recipe.save();

    return res.status(201).json({
      message: "Recipe created successfully",
      recipe: {
        ...recipe._doc,
        image: `${req.protocol}://${req.get("host")}${imagePath}`,
      },
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get all approved recipes
// const getAllRecipes = async (req, res) => {
//   try {
//     const recipes = await Recipe.find({ status: "approved" }).populate("user", "name email");
//     const formatted = recipes.map((recipe) => ({
//       ...recipe._doc,
//       image: recipe.image ? `${req.protocol}://${req.get("host")}${recipe.image}` : null,
//     }));
//     return res.json(formatted);
//   } catch (error) {
//     console.error("❌ Error fetching recipes:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

const getAllRecipes = async (req, res) => {
  try {
    let query = {};

    // ✅ Safely check if user is admin
    if (!req.user || !req.user.isAdmin) {
      query = { status: "approved" };
    }

    const recipes = await Recipe.find(query);

    const formatted = recipes.map((recipe) => ({
      ...recipe._doc,
      image: recipe.image
        ? `${req.protocol}://${req.get("host")}${recipe.image}`
        : null,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};




// const getRecipeById = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const recipes = await Recipe.find({ user: userId });
//     return res.status(200).json({ recipes }); // ✅ wrap in object
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if recipe is premium and user is not premium/admin
    if (recipe.view === "premium" && !req.user?.isPremium && !req.user?.isAdmin) {
      return res.status(403).json({ 
        message: "This is a premium recipe. Please upgrade to access.",
        isPremium: true 
      });
    }

    // Format image URL
    let imageUrl = null;
    if (recipe.image) {
      // Check if the image path already includes the full URL
      if (recipe.image.startsWith('http')) {
        imageUrl = recipe.image;
      } else {
        // Add the server URL to the image path
        imageUrl = `${req.protocol}://${req.get("host")}${recipe.image}`;
      }
    }

    const formattedRecipe = {
      ...recipe._doc,
      image: imageUrl,
      isPremium: recipe.view === "premium"
    };

    res.status(200).json(formattedRecipe);
  } catch (error) {
    console.error("❌ Error fetching recipe:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get all pending recipes
const getPendingRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ status: "pending" }).populate("user", "name email");
    const formatted = recipes.map((recipe) => ({
      ...recipe._doc,
      image: recipe.image ? `${req.protocol}://${req.get("host")}${recipe.image}` : null,
    }));
    res.json(formatted);
  } catch (error) {
    console.error("❌ Error fetching pending recipes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve a recipe
const approveRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    console.log("approve", recipe);


    const user = await User.findById(recipe.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    recipe.status = "approved";
    await recipe.save();

    user.points += 5;
    await user.save();

    const rewardMessage =
      user.points >= 100
        ? `Congratulations! You've earned 5 points. You've reached 100 points and earned a Flipkart gift voucher worth ₹2000!`
        : `Recipe approved successfully. You've earned 5 points.`;

    // ✅ Get all recipes after approval
    const allRecipes = await Recipe.find().sort({ createdAt: -1 });

    return res.json({
      message: rewardMessage,
      points: user.points,
      recipes: allRecipes.map((r) => ({
        ...r._doc,
        image: r.image ? `${req.protocol}://${req.get("host")}${r.image}` : null,
      })),
    });
  } catch (error) {
    console.error("❌ Error approving recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


// Reject a recipe
// const rejectRecipe = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) return res.status(404).json({ message: "Recipe not found" });

//     if (recipe.image) {
//       const imagePath = path.join(__dirname, "..", recipe.image);
//       fs.unlink(imagePath, (err) => {
//         if (err) console.error("Error deleting image:", err);
//       });
//     }

//     await Recipe.findByIdAndDelete(req.params.id);
//     return res.json({ message: "Recipe rejected and deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error rejecting recipe:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };
const rejectRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.status = "rejected";
    await recipe.save();

    return res.json({ message: "Recipe rejected successfully" });
  } catch (error) {
    console.error("❌ Error rejecting recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const restoreRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.status !== "rejected") {
      return res.status(400).json({ message: "Only rejected recipes can be restored" });
    }

    recipe.status = "pending";
    await recipe.save();

    return res.json({ message: "Recipe restored to pending successfully" });
  } catch (error) {
    console.error("❌ Error restoring recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Update recipe
const updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, procedure, category, isPremium } = req.body;

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Only admins can update recipes" });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Parse ingredients if it's a string
    let parsedIngredients = ingredients;
    if (typeof ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(ingredients);
      } catch (error) {
        parsedIngredients = ingredients.split(',').map(i => i.trim());
      }
    }

    // Update recipe fields
    if (title) recipe.title = title;
    if (parsedIngredients) recipe.ingredients = parsedIngredients;
    if (procedure) recipe.procedure = procedure;
    if (category) recipe.category = category;
    if (typeof isPremium === 'boolean') recipe.isPremium = isPremium;

    // Handle image update if new image is provided
    if (req.file) {
      // Delete old image if it exists
      if (recipe.image) {
        const oldImagePath = path.join(__dirname, '..', recipe.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      recipe.image = `/uploads/images/${req.file.filename}`;
    }

    await recipe.save();

    return res.json({
      message: "Recipe updated successfully",
      recipe: {
        ...recipe._doc,
        image: recipe.image ? `${req.protocol}://${req.get("host")}${recipe.image}` : null,
      },
    });
  } catch (error) {
    console.error("❌ Error updating recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = req.user.id;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Authorization check: either the creator or an admin
    if (recipe.user?.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    // Delete associated image if it exists
    if (recipe.image) {
      const imagePath = path.join(__dirname, "..", recipe.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });
    }

    await Recipe.findByIdAndDelete(recipe._id);

    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting recipe:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Move recipe to pending
const moveToPending = async (req, res) => {
  try {
    // Find recipe by ID
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Update status to pending
    recipe.status = "pending";
    await recipe.save();

    return res.json({
      message: "Recipe moved to pending successfully",
      recipe: {
        ...recipe._doc,
        image: recipe.image ? `${req.protocol}://${req.get("host")}${recipe.image}` : null,
      },
    });
  } catch (error) {
    console.error("❌ Error moving recipe to pending:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// const getUserRecipes = async (req, res) => {
//   try {
//     console.log("points",req.user);
    
//     const userId = req.user.id; // should come from token
//     const recipes = await Recipe.find({ user: userId });

//     if (!recipes || recipes.length === 0) {
//       return res.status(200).json({ recipes: [] });
//     }

// return res.status(200).json({ ok: true, recipes });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };


const getUserRecipes = async (req, res) => {
  try {
    const userId = req.user.id; // set from authenticateUser middleware

    const recipes = await Recipe.find({ user: userId });

    return res.status(200).json({ recipes }); // no need for `ok: ok`
  } catch (error) {
    console.error("Error in getUserRecipes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getPendingRecipes,
  approveRecipe,
  rejectRecipe,
  restoreRecipe,
  updateRecipe,
  deleteRecipe,
  moveToPending,
  getUserRecipes
};
