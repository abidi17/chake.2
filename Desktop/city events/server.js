const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.json({ message: '🎉 City Events API is running!' });
});

// Routes
 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/events', require('./routes/events'));
 app.use('/api/bookings', require('./routes/bookings'));
 app.use('/api/ratings', require('./routes/ratings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});