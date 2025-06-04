// routes/passwordRoutes.js
const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/PasswordController");

// Route to send reset password email
router.post("/forgot-password", passwordController.forgotPassword);

// Route to reset the password using token and user ID
router.post("/reset-password/:id/:token", passwordController.resetPassword);

module.exports = router;
