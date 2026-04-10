import { createSession, createUser, findUserByEmail, hashPassword, sanitizeUser } from '../../backend/db.mjs';
import { sendJson } from '../_lib/json.js';
import { validateCredentials } from '../_lib/validators.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'method not allowed' });
  }

  const validation = validateCredentials(req.body, { requireDisplayName: true });
  if (!validation.ok) {
    return sendJson(res, 400, { error: validation.error });
  }

  const { email, password, displayName } = validation.value;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return sendJson(res, 409, { error: 'email already exists' });
  }

  const user = await createUser({
    email,
    displayName,
    passwordHash: hashPassword(password),
  });
  const session = await createSession(user.id);
  return sendJson(res, 200, { token: session.token, user: sanitizeUser(user) });
}
