import express from 'express';
import { randomUUID } from 'crypto';
import { authRequired } from '../middleware/auth.js';
import { buildDecisionBrief } from '../services/decisionService.js';
import { store, byUser } from '../data/store.js';

const router = express.Router();
router.use(authRequired);

router.post('/analyze-text', (req, res) => {
  const { text = '' } = req.body;
  if (!text.trim()) return res.status(400).json({ message: 'text is required.' });

  const analysis = {
    id: randomUUID(),
    userId: req.user.id,
    createdAt: new Date().toISOString(),
    inputType: 'text',
    sourcePreview: text.slice(0, 240),
    result: buildDecisionBrief(text)
  };

  store.analyses.push(analysis);
  return res.json(analysis);
});

router.get('/analyses', (req, res) => {
  const analyses = byUser(store.analyses, req.user.id).slice(-30).reverse();
  res.json(analyses);
});

export default router;
