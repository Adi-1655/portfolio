import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (email: string) => {
    return jwt.sign({ email }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = (req: Request, res: Response) => {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        res.json({
            email,
            token: generateToken(email),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
export const getAdminProfile = (req: any, res: Response) => {
    res.json({
        email: req.user,
    });
};
