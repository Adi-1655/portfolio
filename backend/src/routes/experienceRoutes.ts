import express from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getExperiences)
    .post(protect, createExperience);

router.route('/:id')
    .put(protect, updateExperience)
    .delete(protect, deleteExperience);

export default router;
