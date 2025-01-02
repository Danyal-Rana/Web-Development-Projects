import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ user: { id: user._id, username: user.username }, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ user: { id: user._id, username: user.username }, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const user = req.user;
        res.json({ user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};