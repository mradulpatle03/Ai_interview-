const mongoose = require("mongoose");

const jobDescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String },
  company: { type: String },

  rawText: { type: String, required: true },
  parsedData: {
    skills: [String],
    responsibilities: [String],
    cultureKeywords: [String],
    level: { type: String, enum: ["junior", "mid", "senior"] }
  },

  status: { type: String, enum: ["queued", "parsing", "ready", "failed"], default: "queued" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("JobDescription", jobDescriptionSchema);
