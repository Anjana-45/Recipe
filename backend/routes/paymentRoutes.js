const express = require("express");
const router = express.Router();
const { processPremiumPayment, confirmPremiumPayment } = require("../controllers/paymentController");
const {authenticateUser} = require("../middleware/authMiddleware"); 


router.post("/premium", authenticateUser, processPremiumPayment);


router.get("/confirm", confirmPremiumPayment);

module.exports = router;
