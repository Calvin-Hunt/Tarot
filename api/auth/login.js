import { createSession, findUserByEmail, hashPassword, sanitizeUser } from '../../backend/db.mjs';
import { sendJson } from '../_lib/json.js';
import { validateCredentials } from '../_lib/validators.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'method not allowed' });
  }

  const validation = validateCredentials(req.body);
  if (!validation.ok) {
    return sendJson(res, 400, { error: validation.error });
  }

  const { email, password } = validation.value;
  const user = await findUserByEmail(email);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return sendJson(res, 401, { error: 'invalid credentials' });
  }

  const session = await createSession(user.id);
  return sendJson(res, 200, { token: session.token, user: sanitizeUser(user) });
}
