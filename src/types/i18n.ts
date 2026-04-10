import type { LanguageCode } from '@/types/reading';

export type LocalizedText = Record<LanguageCode, string>;
export type LocalizedList = Record<LanguageCode, string[]>;
export type LocalizedTextValue = string | LocalizedText;
export type LocalizedListValue = string[] | LocalizedList;
