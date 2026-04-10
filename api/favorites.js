import { listFavoritesByUser, resolveSession, toggleFavorite } from '../backend/db.mjs';
import { sendJson } from './_lib/json.js';
import { validateCardId } from './_lib/validators.js';

export default async function handler(req, res) {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return sendJson(res, 401, { error: 'unauthorized' });
  }

  if (req.method === 'GET') {
    const favorites = await listFavoritesByUser(session.user.id);
    return sendJson(res, 200, { favorites });
  }

  if (req.method === 'POST') {
    const validation = validateCardId(req.body);
    if (!validation.ok) {
      return sendJson(res, 400, { error: validation.error });
    }

    const result = await toggleFavorite(session.user.id, validation.value);
    return sendJson(res, 200, result);
  }

  return sendJson(res, 405, { error: 'method not allowed' });
}
