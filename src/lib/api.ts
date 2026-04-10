import type { ReadingSession } from '@/types/reading';
import type { AppUser, UserFavorite } from '@/types/user';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';
const REQUEST_TIMEOUT_MS = 12000;

export class ApiError extends Error {
  status: number;

  code: 'unauthorized' | 'conflict' | 'timeout' | 'network' | 'unknown';

  constructor(message: string, status = 0, code: ApiError['code'] = 'unknown') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

function resolveApiErrorCode(status: number): ApiError['code'] {
  if (status === 401) {
    return 'unauthorized';
  }
  if (status === 409) {
    return 'conflict';
  }
  return 'unknown';
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
      signal: controller.signal,
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new ApiError(payload?.error ?? 'Request failed', response.status, resolveApiErrorCode(response.status));
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out', 0, 'timeout');
    }

    throw new ApiError('Network request failed', 0, 'network');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function registerAccount(input: { email: string; password: string; displayName: string }) {
  return request<{ token: string; user: AppUser }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function loginAccount(input: { email: string; password: string }) {
  return request<{ token: string; user: AppUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function fetchProfile(token: string) {
  return request<{ user: AppUser }>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchRemoteReadings(token: string) {
  return request<{ readings: ReadingSession[] }>('/readings', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function saveRemoteReading(token: string, reading: ReadingSession) {
  return request<{ reading: ReadingSession }>('/readings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(reading),
  });
}

export async function fetchFavorites(token: string) {
  return request<{ favorites: UserFavorite[] }>('/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function toggleFavoriteRequest(token: string, cardId: string) {
  return request<{ removed?: boolean; favorite?: UserFavorite }>('/favorites', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ cardId }),
  });
}
