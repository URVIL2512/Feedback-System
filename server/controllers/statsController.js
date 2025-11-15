import Feedback from '../models/Feedback.js';

export const getStats = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    const totalFeedbacks = feedbacks.length;

    const averageRating = totalFeedbacks > 0
      ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks
      : 0;

    const positiveCount = feedbacks.filter(feedback => feedback.rating >= 4).length;
    const negativeCount = feedbacks.filter(feedback => feedback.rating <= 2).length;

    res.json({
      totalFeedbacks,
      averageRating: Math.round(averageRating * 100) / 100,
      positiveCount,
      negativeCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch statistics' });
  }
};

