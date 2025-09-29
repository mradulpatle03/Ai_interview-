const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['DSA', 'SystemDesign', 'CSFundamentals'], 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    default: 'medium' 
  },
  type: { 
    type: String, 
    enum: ['technical'], 
    default: 'technical' 
  },

  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false } 
    }
  ],

  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
