const Rating = require('../models/Rating');
const Event = require('../models/Event');

//   Add a rating
const createRating = async (req, res) => {
  try {
    const { eventId, stars, comment } = req.body;

   // Check if the feature is active
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: '❌ Event not found' });
    }

    // Check if you have already rated
    const existingRating = await Rating.findOne({
      user: req.user.id,
      event: eventId
    });
    if (existingRating) {
      return res.status(400).json({ message: '❌ Already rated' });
    }

    const rating = await Rating.create({
      user: req.user.id,
      event: eventId,
      stars,
      comment
    });

    res.status(201).json({ success: true, data: rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Pocket effectiveness evaluations
const getEventRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ event: req.params.eventId })
      .populate('user', 'name');

    // Calculate the rate
    const average = ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.stars, 0) / ratings.length
      : 0;

    res.status(200).json({
      success: true,
      average: average.toFixed(1),
      total: ratings.length,
      data: ratings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRating, getEventRatings };