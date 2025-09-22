const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /api/user/profile -> get current user profile
router.get("/profile", protect, getProfile);

// PUT /api/user/profile -> update current user profile
router.put("/profile", protect, updateProfile);

module.exports = router;
