const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },

  front: { type: String, required: true },
  back: { type: String },

  reviewCount: { type: Number, default: 0 },
  easiness: { type: Number, default: 2.5 }, 
  interval: { type: Number, default: 1 }, 
  lastReviewed: { type: Date },
  nextReview: { type: Date, default: Date.now },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
