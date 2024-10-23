import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World from Node');
});

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});