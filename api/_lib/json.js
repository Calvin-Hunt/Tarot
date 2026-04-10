export function sendJson(res, status, body) {
  res.status(status).json(body);
}
