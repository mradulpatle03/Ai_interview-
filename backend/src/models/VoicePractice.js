const mongoose = require("mongoose");

const voicePracticeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },

  transcript: { type: String },
  audioUrl: { type: String },
  
  feedback: {
    score: { type: Number, min: 0, max: 10 },
    suggestions: [String],
    keywordsMissing: [String],
    fluencyScore: { type: Number }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("VoicePractice", voicePracticeSchema);
