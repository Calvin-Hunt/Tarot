import type { DrawnCard, InterpretedCard, ReadingSession, SpreadId } from '@/types/reading';
import type { ZodiacProfile } from '@/types/zodiac';
import { getCardDescription, getCardKeywords, getCardMeaning, getCardName, getLocalizedList, getLocalizedText, getZodiacName } from '@/lib/content';
import { translatePositionIntention, translatePositionLabel } from '@/lib/i18n';

export function buildZodiacOverlay(card: DrawnCard, zodiac: ZodiacProfile) {
  const emphasisEn = getLocalizedList('en', zodiac.reading_bias.emphasis).join(', ');
  const emphasisZh = getLocalizedList('zh', zodiac.reading_bias.emphasis).join('、');
  return {
    en: `${getZodiacName('en', zodiac)} adds a ${getLocalizedText('en', zodiac.reading_bias.title).toLowerCase()} tone here. In this ${card.orientation} ${getCardName('en', card.card)}, pay closer attention to ${emphasisEn}. ${getLocalizedText('en', zodiac.reading_bias.advice)}`,
    zh: `${getZodiacName('zh', zodiac)}会在这里叠加${getLocalizedText('zh', zodiac.reading_bias.title)}的语气。面对这张${card.orientation === 'upright' ? '正位' : '逆位'}${getCardName('zh', card.card)}时，请格外留意${emphasisZh}。${getLocalizedText('zh', zodiac.reading_bias.advice)}`,
  };
}

export function interpretDrawnCards(cards: DrawnCard[], zodiac: ZodiacProfile): InterpretedCard[] {
  return cards.map((drawnCard) => {
    const isUpright = drawnCard.orientation === 'upright';
    const baseMeaning = isUpright ? drawnCard.card.meaning_upright : drawnCard.card.meaning_reversed;
    const baseKeywords = isUpright ? drawnCard.card.keywords_upright : drawnCard.card.keywords_reversed;
    return {
      ...drawnCard,
      baseKeywords,
      baseMeaning,
      positionMeaning: {
        en: `${translatePositionIntention('en', drawnCard.position.key, drawnCard.position.intention)} In this ${translatePositionLabel('en', drawnCard.position.key, drawnCard.position.label)} slot, ${getCardName('en', drawnCard.card)} amplifies ${getCardDescription('en', drawnCard.card).toLowerCase()}`,
        zh: `${translatePositionIntention('zh', drawnCard.position.key, drawnCard.position.intention)} 在「${translatePositionLabel('zh', drawnCard.position.key, drawnCard.position.label)}」这个位置上，${getCardName('zh', drawnCard.card)}会强化${getCardDescription('zh', drawnCard.card)}。`,
      },
      zodiacOverlay: buildZodiacOverlay(drawnCard, zodiac),
    };
  });
}

export function createReadingSession(spreadId: SpreadId, zodiac: ZodiacProfile, cards: InterpretedCard[]): ReadingSession {
  return {
    id: `reading-${Date.now()}`,
    createdAt: new Date().toISOString(),
    spreadId,
    zodiacId: zodiac.id,
    cards,
  };
}
