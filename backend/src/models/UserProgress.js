const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  totalQuestionsAnswered: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  flashcardsReviewed: { type: Number, default: 0 },

  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
