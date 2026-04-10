import type { TarotCard, TarotOrientation } from '@/types/tarot';
import type { AppUser, UserFavorite } from '@/types/user';
import type { ZodiacProfile } from '@/types/zodiac';
import type { LocalizedListValue, LocalizedTextValue } from '@/types/i18n';

export type SpreadId =
  | 'single'
  | 'three-card'
  | 'celtic-cross-lite'
  | 'relationship-mirror'
  | 'decision-path'
  | 'lunar-cycle';

export type QuestionCategoryId =
  | 'general'
  | 'love'
  | 'career'
  | 'healing'
  | 'shadow'
  | 'creativity';

export type ThemeId = 'mystic-nocturne' | 'solar-velvet' | 'lunar-ivory';
export type LanguageCode = 'en' | 'zh';
export type ThemeMode = 'mystic' | 'minimal';

export interface SpreadPosition {
  key: string;
  label: string;
  intention: string;
}

export interface SpreadDefinition {
  id: SpreadId;
  name: string;
  description: string;
  cardCount: number;
  ritualPrompt: string;
  positions: SpreadPosition[];
}

export interface QuestionCategory {
  id: QuestionCategoryId;
  title: string;
  description: string;
  prompts: string[];
}

export interface DrawnCard {
  card: TarotCard;
  orientation: TarotOrientation;
  position: SpreadPosition;
}

export interface InterpretedCard extends DrawnCard {
  baseKeywords: LocalizedListValue;
  baseMeaning: LocalizedTextValue;
  positionMeaning: LocalizedTextValue;
  zodiacOverlay?: LocalizedTextValue;
}

export interface ReadingSession {
  id: string;
  createdAt: string;
  spreadId: SpreadId;
  zodiacId: string;
  questionCategoryId?: QuestionCategoryId;
  cards: InterpretedCard[];
}

export interface ReadingContextState {
  selectedSpreadId: SpreadId;
  selectedZodiac: ZodiacProfile;
  selectedQuestionCategoryId: QuestionCategoryId;
  isShuffling: boolean;
  currentReading: ReadingSession | null;
  history: ReadingSession[];
  currentUser: AppUser | null;
  authToken: string | null;
  favorites: UserFavorite[];
}

export interface PreferencesContextState {
  themeMode: ThemeMode;
  selectedThemeId: ThemeId;
  language: LanguageCode;
  soundEnabled: boolean;
}
