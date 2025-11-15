require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const statsRoutes = require('./routes/stats');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// API routes
app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/stats', statsRoutes);

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Feedback API (Mongo) listening on port ${PORT}`);
});
