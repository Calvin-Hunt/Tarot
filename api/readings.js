import { insertReading, listReadingsByUser, resolveSession } from '../backend/db.mjs';
import { sendJson } from './_lib/json.js';
import { validateReadingPayload } from './_lib/validators.js';

export default async function handler(req, res) {
  const session = await resolveSession(req.headers.authorization);
  if (!session) {
    return sendJson(res, 401, { error: 'unauthorized' });
  }

  if (req.method === 'GET') {
    const readings = await listReadingsByUser(session.user.id);
    return sendJson(res, 200, { readings });
  }

  if (req.method === 'POST') {
    const validation = validateReadingPayload(req.body);
    if (!validation.ok) {
      return sendJson(res, 400, { error: validation.error });
    }

    const reading = await insertReading(session.user.id, validation.value);
    return sendJson(res, 200, { reading });
  }

  return sendJson(res, 405, { error: 'method not allowed' });
}
