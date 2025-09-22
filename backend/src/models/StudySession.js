const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },

  questionsReviewed: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: { type: Number, default: 0 },
  
  categoryBreakdown: {
    technical: { type: Number, default: 0 },
    behavioral: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("StudySession", studySessionSchema);
