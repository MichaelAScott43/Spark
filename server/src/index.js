import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import triageRoutes from './routes/triageRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import debriefRoutes from './routes/debriefRoutes.js';

dotenv.config({ path: '../.env' });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/triage', triageRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/debrief', debriefRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect DB', error);
    process.exit(1);
  });
