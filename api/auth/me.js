import { resolveSession, sanitizeUser } from '../../backend/db.mjs';
import { sendJson } from '../_lib/json.js';

export default async function handler(req, res) {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return sendJson(res, 401, { error: 'unauthorized' });
  }

  return sendJson(res, 200, { user: sanitizeUser(session.user) });
}
