const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            ownedBy: req.user._id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ ownedBy: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, ownedBy: req.user._id });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, ownedBy: req.user._id });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};