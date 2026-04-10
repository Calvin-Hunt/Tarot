import type { ReadingSession, ThemeId, QuestionCategoryId, LanguageCode, ThemeMode } from '@/types/reading';

const STORAGE_KEYS = {
  history: 'tarot-celestial-history',
  authToken: 'tarot-celestial-auth-token',
  themeId: 'tarot-celestial-theme-id',
  themeMode: 'tarot-celestial-theme-mode',
  questionCategoryId: 'tarot-celestial-question-category-id',
  language: 'tarot-celestial-language',
  soundEnabled: 'tarot-celestial-sound-enabled',
} as const;

function safeGet(key: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(key);
}

function safeSet(key: string, value: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(key, value);
}

export function loadReadingHistory(): ReadingSession[] {
  try {
    const raw = safeGet(STORAGE_KEYS.history);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ReadingSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReadingHistory(history: ReadingSession[]): void {
  safeSet(STORAGE_KEYS.history, JSON.stringify(history.slice(0, 12)));
}

export function loadAuthToken(): string | null {
  return safeGet(STORAGE_KEYS.authToken);
}

export function saveAuthToken(token: string | null): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (!token) {
    window.localStorage.removeItem(STORAGE_KEYS.authToken);
    return;
  }
  safeSet(STORAGE_KEYS.authToken, token);
}

export function loadThemeId(): ThemeId | null {
  return safeGet(STORAGE_KEYS.themeId) as ThemeId | null;
}

export function saveThemeId(themeId: ThemeId): void {
  safeSet(STORAGE_KEYS.themeId, themeId);
}

export function loadThemeMode(): ThemeMode | null {
  return safeGet(STORAGE_KEYS.themeMode) as ThemeMode | null;
}

export function saveThemeMode(themeMode: ThemeMode): void {
  safeSet(STORAGE_KEYS.themeMode, themeMode);
}

export function loadQuestionCategoryId(): QuestionCategoryId | null {
  return safeGet(STORAGE_KEYS.questionCategoryId) as QuestionCategoryId | null;
}

export function saveQuestionCategoryId(questionCategoryId: QuestionCategoryId): void {
  safeSet(STORAGE_KEYS.questionCategoryId, questionCategoryId);
}

export function loadLanguageCode(): LanguageCode | null {
  return safeGet(STORAGE_KEYS.language) as LanguageCode | null;
}

export function saveLanguageCode(language: LanguageCode): void {
  safeSet(STORAGE_KEYS.language, language);
}

export function loadSoundEnabled(): boolean {
  const raw = safeGet(STORAGE_KEYS.soundEnabled);
  return raw === null ? true : raw === 'true';
}

export function saveSoundEnabled(enabled: boolean): void {
  safeSet(STORAGE_KEYS.soundEnabled, String(enabled));
}
