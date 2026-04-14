const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Create a reservation 
const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if effectiveness exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: '❌ Event not found' });
    }

    // Check if the user has made a prior reservation
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      event: eventId
    });
    if (existingBooking) {
      return res.status(400).json({ message: '❌ Already booked' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pocket user reservations
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event', 'title date time location price');

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 // Cancel reservation
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: '❌ Booking not found' });
    }

     // Verify that you are the booking owner
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: '❌ Not authorized' });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: '✅ Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking };