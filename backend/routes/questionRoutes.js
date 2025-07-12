// backend/routes/questionRoutes.js
import express from 'express';
import { createQuestion } from '../controllers/questionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ask', protect, createQuestion);

export default router;
