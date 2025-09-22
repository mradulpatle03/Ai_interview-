const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.js');
const userRoutes = require("./routes/userRoutes");

const app = express();

// ----- Global Middlewares -----
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ----- Health Check -----
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: Date.now() })
);

// ----- API Routes -----
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

module.exports = app;