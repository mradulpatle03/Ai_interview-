const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "JobDescription" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  content: { type: String, required: true },
  answer: { type: String }, 
  category: { type: String, enum: ["technical", "behavioral", "hr", "other"], default: "technical" },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
  type: { type: String, enum: ["mcq", "open", "flashcard"], default: "open" },
  tags: [String],

  aiGenerated: { type: Boolean, default: true },
  source: { type: String }, 

  stats: {
    timesAnswered: { type: Number, default: 0 },
    correct: { type: Number, default: 0 }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questionSchema);
