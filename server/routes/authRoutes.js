import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { store } from '../data/store.js';

const router = express.Router();

const sign = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'dev-secret-change-me',
    { expiresIn: '7d' }
  );

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Email and password (min 6 chars) are required.' });
  }

  const normalizedEmail = email.toLowerCase();
  if (store.users.find((u) => u.email === normalizedEmail)) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: randomUUID(), email: normalizedEmail, passwordHash };
  store.users.push(user);

  return res.status(201).json({
    token: sign(user),
    user: { id: user.id, email: user.email }
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find((u) => u.email === email?.toLowerCase());

  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json({ token: sign(user), user: { id: user.id, email: user.email } });
});

export default router;
