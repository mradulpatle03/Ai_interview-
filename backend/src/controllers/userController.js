// controllers/userController.js
const User = require("../models/User");

// --------- GET PROFILE ---------
const getProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user._id).select("-passwordHash -resetToken -resetTokenExpiry");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------- UPDATE PROFILE ---------
const updateProfile = async (req, res) => {
  try {
    const { name, experienceLevel, preferences } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update allowed fields
    if (name) user.name = name;
    if (experienceLevel) user.experienceLevel = experienceLevel;
    if (preferences) user.preferences = preferences;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        experienceLevel: user.experienceLevel,
        preferences: user.preferences,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile };
