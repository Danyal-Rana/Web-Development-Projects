import express from 'express';
import { sendMessage, getAllMessages } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.post('/send', sendMessage);
messageRouter.get('/getall', getAllMessages);

export default messageRouter;