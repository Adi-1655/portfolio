import { Request, Response } from 'express';
import Message from '../models/Message';

export const submitContactForm = async (req: Request, res: Response) => {
    try {
        const { name, email, message, honeypot } = req.body;

        // Basic honeypot check
        if (honeypot) {
            return res.status(400).json({ error: 'Spam detected' });
        }

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 }); // Newest first
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.findById(req.params.id);

        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
