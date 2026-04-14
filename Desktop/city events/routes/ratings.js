const express = require('express');
const router = express.Router();
const {
  createRating,
  getEventRatings
} = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/ratings - Add a rating
router.post('/', protect, createRating);

// GET /api/ratings/:eventId - Pocket effectiveness evaluations
router.get('/:eventId', getEventRatings);

module.exports = router;