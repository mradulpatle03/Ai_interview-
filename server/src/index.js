// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// basic route
app.get('/', (req, res) => res.send('AI Interview Prep API running'));

// mount routes
app.use('/api/auth', authRoutes);

// connect to MongoDB and start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
