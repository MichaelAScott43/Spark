import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { runDebrief } from '../services/aiService.js';
import { Task } from '../models/Task.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { tone = 'Direct' } = req.body;
    const tasks = await Task.find({ userId: req.user.id });
    const completedTasks = tasks.filter((t) => t.completed).map((t) => t.text);
    const incompleteTasks = tasks.filter((t) => !t.completed).map((t) => t.text);

    const debrief = await runDebrief({ completedTasks, incompleteTasks, tone });
    return res.json({ debrief });
  } catch (error) {
    return res.status(500).json({ message: 'Debrief failed.', error: error.message });
  }
});

export default router;
