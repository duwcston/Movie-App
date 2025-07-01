import express from 'express';

const router = express.Router();

// Controllers
import {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    reviewMovie,
    deleteComment,
    getNewMovies,
    getTopMovies,
    getRandomMovies
} from '../controllers/movieController.js';

// Middleware
import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

// Public Routes
router.get('/all-movies', getAllMovies);
router.get('/movie/:id', getMovie);
router.get('/new-movies', getNewMovies);
router.get('/top-movies', getTopMovies);
router.get('/random-movie', getRandomMovies);

// Private Routes
router.post('/:id/review', authenticated, checkId, reviewMovie);

// Admin Routes
router.post('/create-movie', authenticated, authorizeAdmin, createMovie);
router.put('/update-movie/:id', authenticated, authorizeAdmin, updateMovie);
router.delete('/delete-movie/:id', authenticated, authorizeAdmin, deleteMovie);
router.delete('/delete-comment', authenticated, authorizeAdmin, deleteComment);

export default router;