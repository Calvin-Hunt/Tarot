import { sendJson } from './_lib/json.js';

export default function handler(_req, res) {
  sendJson(res, 200, { ok: true });
}
