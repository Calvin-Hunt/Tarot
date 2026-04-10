import type { LocalizedListValue, LocalizedTextValue } from '@/types/i18n';
import type { LanguageCode } from '@/types/reading';
import type { TarotCard, TarotElement, TarotSuit } from '@/types/tarot';
import type { ZodiacElement, ZodiacModality, ZodiacProfile } from '@/types/zodiac';

const tarotSuitLabels: Record<Exclude<TarotSuit, null>, Record<LanguageCode, string>> = {
  wands: { en: 'Wands', zh: '权杖' },
  cups: { en: 'Cups', zh: '圣杯' },
  swords: { en: 'Swords', zh: '宝剑' },
  pentacles: { en: 'Pentacles', zh: '星币' },
};

const tarotElementLabels: Record<TarotElement, Record<LanguageCode, string>> = {
  fire: { en: 'Fire', zh: '火' },
  water: { en: 'Water', zh: '水' },
  air: { en: 'Air', zh: '风' },
  earth: { en: 'Earth', zh: '土' },
  spirit: { en: 'Spirit', zh: '灵' },
};

const zodiacElementLabels: Record<ZodiacElement, Record<LanguageCode, string>> = {
  fire: { en: 'Fire', zh: '火象' },
  earth: { en: 'Earth', zh: '土象' },
  air: { en: 'Air', zh: '风象' },
  water: { en: 'Water', zh: '水象' },
};

const zodiacModalityLabels: Record<ZodiacModality, Record<LanguageCode, string>> = {
  cardinal: { en: 'Cardinal', zh: '基本宫' },
  fixed: { en: 'Fixed', zh: '固定宫' },
  mutable: { en: 'Mutable', zh: '变动宫' },
};

const arcanaLabels = {
  major: { en: 'Major Arcana', zh: '大阿尔卡那' },
  minor: { en: 'Minor Arcana', zh: '小阿尔卡那' },
};

export function getLocalizedText(language: LanguageCode, value: LocalizedTextValue): string {
  if (typeof value === 'string') {
    return value;
  }
  return value[language] ?? value.en;
}

export function getLocalizedList(language: LanguageCode, value: LocalizedListValue): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return value[language] ?? value.en;
}

export function getCardName(language: LanguageCode, card: TarotCard): string {
  return getLocalizedText(language, card.name);
}

export function getCardDescription(language: LanguageCode, card: TarotCard): string {
  return getLocalizedText(language, card.description_short);
}

export function getCardMeaning(language: LanguageCode, value: LocalizedTextValue): string {
  return getLocalizedText(language, value);
}

export function getCardKeywords(language: LanguageCode, value: LocalizedListValue): string[] {
  return getLocalizedList(language, value);
}

export function getZodiacName(language: LanguageCode, zodiac: ZodiacProfile): string {
  return getLocalizedText(language, zodiac.name);
}

export function getZodiacTone(language: LanguageCode, zodiac: ZodiacProfile): string {
  return getLocalizedText(language, zodiac.reading_bias.tone);
}

export function getZodiacElementLabel(language: LanguageCode, value: ZodiacElement): string {
  return zodiacElementLabels[value][language];
}

export function getZodiacModalityLabel(language: LanguageCode, value: ZodiacModality): string {
  return zodiacModalityLabels[value][language];
}

export function getTarotSuitLabel(language: LanguageCode, suit: TarotSuit): string {
  return suit ? tarotSuitLabels[suit][language] : '';
}

export function getTarotElementLabel(language: LanguageCode, element: TarotElement): string {
  return tarotElementLabels[element][language];
}

export function getArcanaLabel(language: LanguageCode, arcana: TarotCard['arcana']): string {
  return arcanaLabels[arcana][language];
}
