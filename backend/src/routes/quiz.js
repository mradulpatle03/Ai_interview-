// routes/quiz.js
const express = require('express');
const router = express.Router();
const Question = require('../models/QuestionBank');

router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    
    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: 10 } } 
    ]);

    
    const quizQuestions = questions.map(q => ({
      _id: q._id,
      text: q.text,
      options: q.options.map(opt => ({ text: opt.text })),
      category: q.category,
      difficulty: q.difficulty
    }));

    res.json(quizQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { answers } = req.body; 

    let correct = 0;

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      const correctOption = question.options.find(opt => opt.isCorrect);
      if (correctOption.text === ans.selectedOption) correct++;
    }

    const total = answers.length;
    const accuracy = ((correct / total) * 100).toFixed(2);

    res.json({ total, correct, accuracy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
