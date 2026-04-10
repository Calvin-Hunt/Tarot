import { getSpreadById } from '@/lib/spreads';
import type { DrawnCard, SpreadId } from '@/types/reading';
import type { TarotCard, TarotOrientation } from '@/types/tarot';

export function fisherYatesShuffle<T>(items: T[]): T[] {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
}

export function randomOrientation(): TarotOrientation {
  return Math.random() > 0.5 ? 'upright' : 'reversed';
}

export function drawCards(deck: TarotCard[], spreadId: SpreadId): DrawnCard[] {
  const spread = getSpreadById(spreadId);
  const shuffled = fisherYatesShuffle(deck);

  return spread.positions.map((position, index) => ({
    card: shuffled[index],
    orientation: randomOrientation(),
    position,
  }));
}
