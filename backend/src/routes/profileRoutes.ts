import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getProfile)
    .post(protect, updateProfile); // POST acts as create or update

export default router;
