// const User = require("../models/User");
// const Recipe = require("../models/Recipe");

// // Add a recipe to the user's wishlist
// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user._id; // Get logged-in user ID from the request
//     const { recipeId } = req.body; // Recipe ID to add to wishlist

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Check if the recipe already exists in the wishlist
//     if (user.wishlist.includes(recipeId)) {
//       return res.status(400).json({ message: "Recipe already in your wishlist" });
//     }

//     user.wishlist.push(recipeId);
//     await user.save();

//     return res.status(200).json({ message: "Recipe added to wishlist", wishlist: user.wishlist });
//   } catch (error) {
//     console.error("Error adding to wishlist:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Remove a recipe from the user's wishlist
// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { recipeId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Remove recipe from wishlist
//     user.wishlist = user.wishlist.filter((id) => id.toString() !== recipeId);
//     await user.save();

//     return res.status(200).json({ message: "Recipe removed from wishlist", wishlist: user.wishlist });
//   } catch (error) {
//     console.error("Error removing from wishlist:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Get the user's wishlist
// // const getWishlist = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
    
// //     const user = await User.findById(userId).populate("wishlist");
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     return res.status(200).json({ wishlist: user.wishlist });
// //   } catch (error) {
// //     console.error("Error fetching wishlist:", error);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };
// const getWishlistByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await User.findOne({ email }).populate("wishlist");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({ wishlist: user.wishlist });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// module.exports = { addToWishlist, removeFromWishlist, getWishlist };






const User = require("../models/User");
const Recipe = require("../models/Recipe");

// Add a recipe to the user's wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.body;

    // Optional: verify recipe exists
    const recipeExists = await Recipe.findById(recipeId);
    if (!recipeExists) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.wishlist.some(id => id.toString() === recipeId)) {
      return res.status(400).json({ message: "Recipe already in your wishlist" });
    }

    user.wishlist.push(recipeId);
    await user.save();

    await user.populate("wishlist").execPopulate();

    return res.status(200).json({ message: "Recipe added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Remove a recipe from the user's wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== recipeId);
    await user.save();

    return res.status(200).json({ message: "Recipe removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get wishlist by user email
const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // from authenticateUser middleware

    const user = await User.findById(userId).populate("wishlist");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Export correct methods
module.exports = { addToWishlist, removeFromWishlist, getWishlist };
