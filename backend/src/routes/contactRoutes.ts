import { Router } from 'express';
import { submitContactForm, getMessages, deleteMessage } from '../controllers/contactController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public route to submit a message
router.post('/', submitContactForm);

// Protected routes to view and delete messages
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

export default router;
