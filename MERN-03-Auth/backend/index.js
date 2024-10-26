import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World from Node');
});

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    connectDB();
    console.log('Server is running on port: ' + port);
});