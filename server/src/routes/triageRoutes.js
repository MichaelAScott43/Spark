import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { runTriage } from '../services/aiService.js';
import { Session } from '../models/Session.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { rawInput, tone = 'Direct' } = req.body;
    if (!rawInput?.trim()) return res.status(400).json({ message: 'rawInput is required.' });

    const aiOutput = await runTriage({ rawInput, tone });
    await Session.create({ userId: req.user.id, rawInput, aiOutput, tone });

    return res.json(aiOutput);
  } catch (error) {
    return res.status(500).json({ message: 'Triage failed.', error: error.message });
  }
});

export default router;
