import type { LocalizedListValue, LocalizedTextValue } from '@/types/i18n';

export type ArcanaType = 'major' | 'minor';
export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles' | null;
export type TarotOrientation = 'upright' | 'reversed';
export type TarotElement = 'fire' | 'water' | 'air' | 'earth' | 'spirit';

export interface TarotCard {
  id: string;
  name: LocalizedTextValue;
  arcana: ArcanaType;
  suit: TarotSuit;
  number: number;
  image: string;
  keywords_upright: LocalizedListValue;
  keywords_reversed: LocalizedListValue;
  meaning_upright: LocalizedTextValue;
  meaning_reversed: LocalizedTextValue;
  element_association: TarotElement;
  zodiac_association: string[];
  description_short: LocalizedTextValue;
}
