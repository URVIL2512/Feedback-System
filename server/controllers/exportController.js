import Feedback from '../models/Feedback.js';

export const exportToCSV = async (req, res) => {
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

    const csvHeader = 'Name,Email,Message,Rating,Created At\n';
    
    const csvRows = feedbacks.map(feedback => {
      const name = `"${(feedback.name || '').replace(/"/g, '""')}"`;
      const email = `"${(feedback.email || '').replace(/"/g, '""')}"`;
      const message = `"${(feedback.message || '').replace(/"/g, '""')}"`;
      const rating = feedback.rating || '';
      const createdAt = feedback.createdAt ? new Date(feedback.createdAt).toISOString() : '';
      
      return `${name},${email},${message},${rating},${createdAt}`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=feedbacks-${Date.now()}.csv`);
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to export feedbacks' });
  }
};

