import { Request, Response } from 'express';
import Skill from '../models/Skill';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req: Request, res: Response) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a skill category
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req: Request, res: Response) => {
    try {
        const { title, skills, order } = req.body;
        const newSkill = new Skill({ title, skills, order });
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req: Request, res: Response) => {
    try {
        const { title, skills, order } = req.body;
        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            { title, skills, order },
            { new: true }
        );
        if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.json(updatedSkill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req: Request, res: Response) => {
    try {
        const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
        if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.json({ message: 'Skill removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
