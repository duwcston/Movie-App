import path from "path";
import express, { Request } from "express";
import multer from "multer";
import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Configure multer for S3 storage
const s3Storage = multerS3({
  s3: s3Client,
  bucket: process.env.S3_BUCKET_NAME!,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${extname}`;
    cb(null, fileName);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  contentDisposition: 'inline', // Display in browser instead of downloading
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed!"));
  }
};

const upload = multer({ 
    storage: s3Storage,     
    limits: { fileSize: 1024 * 1024 }, // 1 MB limit
    fileFilter 
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      const fileLocation = (req.file as any).location;
      const fileKey = (req.file as any).key;
      
      if (fileKey) {
        res.status(200).send({
          message: "Image uploaded successfully",
          image: fileKey,
          key: fileKey,
        });
      } else {
        console.error("No file key returned from S3");
        res.status(500).send({ message: "Failed to get S3 file key" });
      }
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const key = req.query.key as string;
    if (!key) {
      return res.status(400).json({ message: "Key parameter is required" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (response.Body) {
      // Set appropriate headers
      res.setHeader('Content-Type', response.ContentType || 'image/jpeg');
      res.setHeader('Content-Length', response.ContentLength || 0);
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

      // Stream the image data
      const stream = response.Body as NodeJS.ReadableStream;
      stream.pipe(res);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error: any) {
    console.error("Error streaming image:", error);
    if (error.name === 'NoSuchKey') {
      res.status(404).json({ message: "Image not found" });
    } else {
      res.status(500).json({ message: "Failed to retrieve image" });
    }
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const key = req.query.key as string;
    if (!key) {
      return res.status(400).json({ message: "Key parameter is required" });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    await s3Client.send(command);

    res.status(200).json({
      message: "Image deleted successfully",
      key: key,
    });
  } catch (error: any) {
    console.error("Error deleting image:", error);
    if (error.name === 'NoSuchKey') {
      res.status(404).json({ message: "Image not found" });
    } else {
      res.status(500).json({ message: "Failed to delete image" });
    }
  }
});

export default router;