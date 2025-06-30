import express from 'express';

// Controllers
import { createGenre, updateGenre, deleteGenre, listGenres, readGenre } from '../controllers/genreController.js';

// Middleware
import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(authenticated, authorizeAdmin, createGenre)
router.route('/:id').put(authenticated, authorizeAdmin, updateGenre);
router.route('/:id').delete(authenticated, authorizeAdmin, deleteGenre);
router.route('/genres').get(listGenres);
router.route('/:id').get(readGenre);

export default router;