import express from 'express';
import { randomUUID } from 'crypto';
import { authRequired } from '../middleware/auth.js';
import { generateChatResponse } from '../services/aiService.js';
import { store, byUser } from '../data/store.js';

const router = express.Router();
router.use(authRequired);

router.post('/', async (req, res) => {
  try {
    const { message = '', persona = 'tj' } = req.body;
    if (!message.trim()) return res.status(400).json({ message: 'message is required.' });

    const result = await generateChatResponse({ message, persona });
    const entry = {
      id: randomUUID(),
      userId: req.user.id,
      createdAt: new Date().toISOString(),
      persona: result.persona,
      message,
      response: result.response,
      insights: result.insights
    };

    store.conversations.push(entry);
    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ message: 'Chat failed.', error: error.message });
  }
});

router.get('/history', (req, res) => {
  const history = byUser(store.conversations, req.user.id).slice(-30).reverse();
  res.json(history);
});

export default router;
