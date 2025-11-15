import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createFeedback, getFeedbacks, deleteFeedback } from '../controllers/feedbackController.js';
import { exportToCSV } from '../controllers/exportController.js';

const router = express.Router();

router.post('/', authMiddleware, createFeedback);
router.get('/', authMiddleware, getFeedbacks);
router.get('/export', authMiddleware, exportToCSV);
router.delete('/:id', authMiddleware, deleteFeedback);

export default router;

