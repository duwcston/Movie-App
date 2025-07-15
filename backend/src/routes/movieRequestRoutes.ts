import express from 'express';

const router = express.Router();

// Controllers
import {
    createRequest,
    getAllRequests,
    deleteRequest
} from '../controllers/movieRequestController.js';

// Middleware
import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js';

router.post('/create-request', authenticated, createRequest);
router.get('/all-requests', authenticated, authorizeAdmin, getAllRequests);
router.delete('/delete-request/:id', authenticated, authorizeAdmin, deleteRequest);

export default router;