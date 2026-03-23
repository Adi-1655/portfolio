import { Request, Response } from 'express';
import Certification from '../models/Certification';

export const getCertifications = async (req: Request, res: Response) => {
    try {
        const certifications = await Certification.find().sort({ order: 1 });
        res.json(certifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching certifications' });
    }
};

export const createCertification = async (req: Request, res: Response) => {
    try {
        const { title, issuer, date, fileUrl, order } = req.body;
        const newCert = new Certification({ title, issuer, date, fileUrl, order });
        const savedCert = await newCert.save();
        res.status(201).json(savedCert);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating certification' });
    }
};

export const updateCertification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, issuer, date, fileUrl, order } = req.body;
        const updatedCert = await Certification.findByIdAndUpdate(
            id,
            { title, issuer, date, fileUrl, order },
            { new: true }
        );

        if (!updatedCert) {
            return res.status(404).json({ message: 'Certification not found' });
        }
        res.json(updatedCert);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating certification' });
    }
};

export const deleteCertification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCert = await Certification.findByIdAndDelete(id);

        if (!deletedCert) {
            return res.status(404).json({ message: 'Certification not found' });
        }
        res.json({ message: 'Certification deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting certification' });
    }
};
