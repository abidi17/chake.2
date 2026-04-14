const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/events - all events (year)
router.get('/', getEvents);

// GET /api/events/:id - one event (year)
router.get('/:id', getEventById);

// POST /api/events - crate event (organizer/admin only)
router.post('/', protect, authorize('organizer', 'admin'), createEvent);

// PUT /api/events/:id - ubdate event (organizer/admin only)
router.put('/:id', protect, authorize('organizer', 'admin'), updateEvent);

// DELETE /api/events/:id -  delete event (organizer/admin only)
router.delete('/:id', protect, authorize('organizer', 'admin'), deleteEvent);

module.exports = router;