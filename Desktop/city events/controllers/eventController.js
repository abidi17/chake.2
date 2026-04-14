const Event = require('../models/Event');

// Bring all events
const getEvents = async (req, res) => {
  try {
    const { city, category } = req.query;
    let filter = {};

    if (city) filter['location.city'] = city;
    if (category) filter.category = category;

    const events = await Event.find(filter)
      .populate('organizer', 'name email');

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bring one event
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ message: '❌ Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Creadted event
const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizer: req.user.id
    });

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ubdate event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: '❌ Event not found' });
    }

    // Verify that you are the owner of the event
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: '❌ Not authorized' });
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delet event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: '❌ Event not found' });
    }

    // Verify that you are the owner of the event
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: '❌ Not authorized' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: '✅ Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };