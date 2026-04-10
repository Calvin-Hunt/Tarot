import type { LocalizedListValue, LocalizedTextValue } from '@/types/i18n';

export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';
export type ZodiacModality = 'cardinal' | 'fixed' | 'mutable';

export interface ZodiacProfile {
  id: string;
  name: LocalizedTextValue;
  symbol: string;
  element: ZodiacElement;
  modality: ZodiacModality;
  date_range: LocalizedTextValue;
  keywords: LocalizedListValue;
  reading_bias: {
    title: LocalizedTextValue;
    tone: LocalizedTextValue;
    emphasis: LocalizedListValue;
    advice: LocalizedTextValue;
  };
  ui_theme_hint: string;
}
