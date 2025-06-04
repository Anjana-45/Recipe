const express = require("express");
const router = express.Router();


const { authenticateUser } = require("../middleware/authMiddleware");

const { register, login } = require("../controllers/authController");


router.get("/me", authenticateUser, (req, res) => {
  res.json({
    email: req.user.email,
    name: req.user.name,
    isAdmin: req.user.isAdmin,
  });
});


router.post("/register", register);
router.post("/login", login);


module.exports = router;
