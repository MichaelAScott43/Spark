import express from 'express';
import { Task } from '../models/Task.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { text, category = 'today' } = req.body;
    const task = await Task.create({ userId: req.user.id, text, category, completed: false });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create task.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load tasks.', error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found.' });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update task.', error: error.message });
  }
});

export default router;
