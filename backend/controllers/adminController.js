const Recipe = require('../models/Recipe');

// Get all rejected recipes
const getRejectedRecipes = async (req, res) => {
  try {
    const rejectedRecipes = await Recipe.find({ status: 'rejected' });
    res.json(rejectedRecipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching rejected recipes' });
  }
};

// Restore rejected recipe to pending status
const restoreRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { status: 'pending', isApproved: false },
      { new: true }
    );
    res.json({ message: 'Recipe restored to pending', recipe: updatedRecipe });
  } catch (err) {
    res.status(500).json({ message: 'Server error restoring recipe' });
  }
};

module.exports = {
  getRejectedRecipes,
  restoreRecipe
};
