import express from 'express';

// Controllers
import { createUser, logoutCurrentUser, loginUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile } from '../controllers/userController.js';

// Middleware
import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/').post(createUser).get(authenticated, authorizeAdmin, getAllUsers);

router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

router.route('/profile').get(authenticated, getCurrentUserProfile).put(authenticated, updateCurrentUserProfile);


export default router;