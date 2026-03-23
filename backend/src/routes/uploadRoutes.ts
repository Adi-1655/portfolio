import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images and PDFs only!'));
    }
}

const upload = multer({
    storage,
    /* fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }, */ // Let's allow any file or just PDFs, let's allow pdfs
});

const uploadHandler = upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]);

router.post('/', protect, uploadHandler, (req, res) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files && files['resume']) {
        return res.send(`/${files['resume'][0].filename}`);
    }

    if (files && files['image']) {
        return res.send(`/${files['image'][0].filename}`);
    }

    return res.status(400).json({ message: 'No file uploaded' });
});

export default router;
