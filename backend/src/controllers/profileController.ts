import { Request, Response } from 'express';
import Profile from '../models/Profile';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findOne({});
        res.json(profile || {});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update or create profile
// @route   POST /api/profile
// @access  Private
// We use a single POST route to either create the first profile or update the existing one.
export const updateProfile = async (req: Request, res: Response) => {
    try {
        let profile = await Profile.findOne({});
        if (profile) {
            Object.assign(profile, req.body);
            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            profile = new Profile(req.body);
            const createdProfile = await profile.save();
            res.status(201).json(createdProfile);
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};
