import express from 'express';
import multer from 'multer';
import { randomUUID } from 'crypto';
import { authRequired } from '../middleware/auth.js';
import { buildDecisionBrief } from '../services/decisionService.js';
import { store } from '../data/store.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

router.use(authRequired);

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'file is required.' });

  const text = req.file.buffer.toString('utf8').slice(0, 5000);
  const analysis = {
    id: randomUUID(),
    userId: req.user.id,
    createdAt: new Date().toISOString(),
    inputType: 'file',
    filename: req.file.originalname,
    result: buildDecisionBrief(text)
  };

  store.analyses.push(analysis);
  return res.json(analysis);
});

export default router;
