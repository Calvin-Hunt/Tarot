import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultQuestionCategory } from '@/data/questionGuides';
import { tarotDeck } from '@/data/tarot';
import { defaultZodiac, zodiacProfiles } from '@/data/zodiac';
import { loginAccount, fetchFavorites, fetchProfile, fetchRemoteReadings, registerAccount, saveRemoteReading, toggleFavoriteRequest } from '@/lib/api';
import { playChime } from '@/lib/audio';
import { createReadingSession, interpretDrawnCards } from '@/lib/interpretation';
import { drawCards } from '@/lib/shuffle';
import {
  loadAuthToken,
  loadQuestionCategoryId,
  loadReadingHistory,
  saveAuthToken,
  saveQuestionCategoryId,
  saveReadingHistory,
} from '@/lib/storage';
import type { QuestionCategoryId, ReadingContextState, ReadingSession, SpreadId } from '@/types/reading';
import type { AppUser, UserFavorite } from '@/types/user';
import type { ZodiacProfile } from '@/types/zodiac';
import { usePreferences } from '@/context/PreferencesContext';

interface AuthInput {
  email: string;
  password: string;
  displayName?: string;
}

interface ReadingContextValue extends ReadingContextState {
  setSelectedSpreadId: (spreadId: SpreadId) => void;
  setSelectedZodiacById: (zodiacId: string) => void;
  setSelectedQuestionCategoryId: (questionCategoryId: QuestionCategoryId) => void;
  beginShuffle: () => Promise<void>;
  restoreReading: (session: ReadingSession) => void;
  login: (input: AuthInput) => Promise<void>;
  register: (input: Required<AuthInput>) => Promise<void>;
  logout: () => void;
  toggleFavorite: (cardId: string) => Promise<void>;
  isFavorite: (cardId: string) => boolean;
}

const ReadingContext = createContext<ReadingContextValue | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const { soundEnabled } = usePreferences();
  const [selectedSpreadId, setSelectedSpreadId] = useState<SpreadId>('three-card');
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacProfile>(defaultZodiac);
  const [selectedQuestionCategoryId, setSelectedQuestionCategoryIdState] = useState<QuestionCategoryId>(
    loadQuestionCategoryId() ?? defaultQuestionCategory.id,
  );
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentReading, setCurrentReading] = useState<ReadingSession | null>(null);
  const [history, setHistory] = useState<ReadingSession[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(loadAuthToken());
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);

  useEffect(() => {
    setHistory(loadReadingHistory());
  }, []);

  useEffect(() => {
    saveReadingHistory(history);
  }, [history]);

  useEffect(() => {
    saveQuestionCategoryId(selectedQuestionCategoryId);
  }, [selectedQuestionCategoryId]);

  useEffect(() => {
    saveAuthToken(authToken);
  }, [authToken]);

  useEffect(() => {
    if (!authToken) {
      setCurrentUser(null);
      setFavorites([]);
      return;
    }

    void (async () => {
      try {
        const [{ user }, readingsPayload, favoritesPayload] = await Promise.all([
          fetchProfile(authToken),
          fetchRemoteReadings(authToken),
          fetchFavorites(authToken),
        ]);
        setCurrentUser(user);
        setHistory(readingsPayload.readings);
        setFavorites(favoritesPayload.favorites);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
        setFavorites([]);
      }
    })();
  }, [authToken]);

  const beginShuffle = useCallback(async () => {
    if (isShuffling) {
      return;
    }

    setIsShuffling(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1450));
    const drawn = drawCards(tarotDeck, selectedSpreadId);
    const interpreted = interpretDrawnCards(drawn, selectedZodiac);
    const session = createReadingSession(selectedSpreadId, selectedZodiac, interpreted);
    session.questionCategoryId = selectedQuestionCategoryId;
    setCurrentReading(session);
    setHistory((previous) => [session, ...previous].slice(0, 12));

    if (authToken) {
      try {
        await saveRemoteReading(authToken, session);
      } catch {
        // Keep local state even if remote sync fails.
      }
    }

    playChime(soundEnabled);
    setIsShuffling(false);
  }, [authToken, isShuffling, selectedQuestionCategoryId, selectedSpreadId, selectedZodiac, soundEnabled]);

  const login = useCallback(async (input: AuthInput) => {
    const payload = await loginAccount({ email: input.email, password: input.password });
    setAuthToken(payload.token);
    setCurrentUser(payload.user);
  }, []);

  const register = useCallback(async (input: Required<AuthInput>) => {
    const payload = await registerAccount({
      email: input.email,
      password: input.password,
      displayName: input.displayName,
    });
    setAuthToken(payload.token);
    setCurrentUser(payload.user);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setCurrentUser(null);
    setFavorites([]);
  }, []);

  const toggleFavorite = useCallback(async (cardId: string) => {
    if (!authToken) {
      return;
    }

    const response = await toggleFavoriteRequest(authToken, cardId);
    setFavorites((previous) => {
      if (response.removed) {
        return previous.filter((item) => item.cardId !== cardId);
      }
      return response.favorite ? [response.favorite, ...previous.filter((item) => item.cardId !== cardId)] : previous;
    });
  }, [authToken]);

  const setSelectedZodiacById = useCallback(
    (zodiacId: string) => {
      setSelectedZodiac(zodiacProfiles.find((item) => item.id === zodiacId) ?? defaultZodiac);
    },
    [],
  );

  const restoreReading = useCallback((session: ReadingSession) => {
    setCurrentReading(session);
  }, []);

  const isFavorite = useCallback(
    (cardId: string) => favorites.some((favorite) => favorite.cardId === cardId),
    [favorites],
  );

  const value = useMemo<ReadingContextValue>(
    () => ({
      selectedSpreadId,
      selectedZodiac,
      selectedQuestionCategoryId,
      isShuffling,
      currentReading,
      history,
      currentUser,
      authToken,
      favorites,
      setSelectedSpreadId,
      setSelectedZodiacById,
      setSelectedQuestionCategoryId: setSelectedQuestionCategoryIdState,
      beginShuffle,
      restoreReading,
      login,
      register,
      logout,
      toggleFavorite,
      isFavorite,
    }),
    [
      beginShuffle,
      selectedSpreadId,
      selectedZodiac,
      selectedQuestionCategoryId,
      isShuffling,
      currentReading,
      history,
      currentUser,
      authToken,
      favorites,
      isFavorite,
      login,
      logout,
      register,
      restoreReading,
      setSelectedZodiacById,
      toggleFavorite,
    ],
  );

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>;
}

export function useReading() {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within ReadingProvider');
  }
  return context;
}
