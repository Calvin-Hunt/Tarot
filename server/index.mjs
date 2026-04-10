import cors from 'cors';
import express from 'express';
import {
  createSession,
  createUser,
  ensureDb,
  findUserByEmail,
  getStorageMode,
  hashPassword,
  insertReading,
  listFavoritesByUser,
  listReadingsByUser,
  resolveSession,
  sanitizeUser,
  toggleFavorite,
} from '../backend/db.mjs';
import { validateCardId, validateCredentials, validateReadingPayload } from '../api/_lib/validators.js';

const app = express();
const port = process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/register', async (req, res) => {
  const validation = validateCredentials(req.body, { requireDisplayName: true });
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const { email, password, displayName } = validation.value;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: 'email already exists' });
  }

  const user = await createUser({
    email,
    displayName,
    passwordHash: hashPassword(password),
  });
  const session = await createSession(user.id);
  return res.json({ token: session.token, user: sanitizeUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const validation = validateCredentials(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const { email, password } = validation.value;
  const user = await findUserByEmail(email);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const session = await createSession(user.id);
  return res.json({ token: session.token, user: sanitizeUser(user) });
});

app.get('/api/auth/me', async (req, res) => {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  return res.json({ user: sanitizeUser(session.user) });
});

app.get('/api/readings', async (req, res) => {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const readings = await listReadingsByUser(session.user.id);
  return res.json({ readings });
});

app.post('/api/readings', async (req, res) => {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const validation = validateReadingPayload(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const reading = await insertReading(session.user.id, validation.value);
  return res.json({ reading });
});

app.get('/api/favorites', async (req, res) => {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const favorites = await listFavoritesByUser(session.user.id);
  return res.json({ favorites });
});

app.post('/api/favorites', async (req, res) => {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const validation = validateCardId(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const result = await toggleFavorite(session.user.id, validation.value);
  return res.json(result);
});

ensureDb().then(() => {
  app.listen(port, () => {
    console.log(`Tarot Celestial API listening on http://localhost:${port} using ${getStorageMode()} storage`);
  });
});
