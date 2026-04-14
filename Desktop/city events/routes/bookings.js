const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/bookings - Create a reservation
router.post('/', protect, createBooking);

// GET /api/bookings/my - Get my reservations
router.get('/my', protect, getMyBookings);

// DELETE /api/bookings/:id - Cancel reservation
router.delete('/:id', protect, cancelBooking);

module.exports = router;