import express from 'express';
import { sendMessage, getAllMessages, deleteMessage } from '../controllers/messageController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const messageRouter = express.Router();

messageRouter.post('/send', sendMessage);
messageRouter.get('/getall', getAllMessages);
messageRouter.delete('/delete/:id', isAuthenticated, deleteMessage);

export default messageRouter;