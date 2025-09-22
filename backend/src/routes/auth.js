const express = require("express");
const {
  signup,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Signup & login
router.post("/signup", signup);
router.post("/login", login);

// Logout (optional protection)
router.post("/logout", protect, logout);

// Password reset
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;
