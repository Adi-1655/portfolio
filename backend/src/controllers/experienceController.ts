import { Request, Response } from 'express';
import Experience from '../models/Experience';

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
export const getExperiences = async (req: Request, res: Response) => {
    try {
        const experiences = await Experience.find({}).sort({ order: 1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private
export const createExperience = async (req: Request, res: Response) => {
    try {
        const exp = new Experience(req.body);
        const createdExp = await exp.save();
        res.status(201).json(createdExp);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private
export const updateExperience = async (req: Request, res: Response) => {
    try {
        const exp = await Experience.findById(req.params.id);
        if (exp) {
            Object.assign(exp, req.body);
            const updatedExp = await exp.save();
            res.json(updatedExp);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private
export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const exp = await Experience.findById(req.params.id);
        if (exp) {
            await exp.deleteOne();
            res.json({ message: 'Removed' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
