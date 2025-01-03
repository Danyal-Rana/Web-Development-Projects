import express from 'express';
import { register, login, logout, getUser, updateProfile, updatePassword } from '../controllers/userController.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getUser);
router.put('/update/me', isAuthenticated, updateProfile);
router.put('/update/password', isAuthenticated, updatePassword);

export default router;