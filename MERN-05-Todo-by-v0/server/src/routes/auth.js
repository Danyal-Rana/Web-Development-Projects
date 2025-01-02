import express from 'express';
import { signup, login, verifyToken } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', auth, verifyToken);

export default router;