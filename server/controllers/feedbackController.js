import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      name: name.trim(),
      email: email ? email.trim() : '',
      message: message.trim(),
      rating: ratingNum,
      userId: req.userId,
      createdAt: new Date()
    });

    await feedback.save();

    res.status(201).json({
      message: 'Feedback created successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create feedback' });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const { rating } = req.query;
    
    let query = {};
    if (rating) {
      const ratingNum = Number(rating);
      if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
        query.rating = ratingNum;
      }
    }

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 });

    res.json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch feedbacks' });
  }
};

