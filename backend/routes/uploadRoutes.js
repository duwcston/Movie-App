import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
    fileFilter: fileFilter
});

const uploadSingle = upload.single('image');

router.post('/upload', (req, res) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No image uploaded' });
        }
        res.status(200).send({
            message: 'Image uploaded successfully',
            file: `${req.file.path}`
        });
    });
});

export default router;