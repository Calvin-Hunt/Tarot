import type { InterpretedCard } from '@/types/reading';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { getArcanaLabel, getCardKeywords, getCardMeaning, getCardName, getTarotSuitLabel } from '@/lib/content';
import { t, translatePositionLabel } from '@/lib/i18n';

export function ResultCard({ card, zodiacName }: { card: InterpretedCard; zodiacName: string }) {
  const { currentUser, toggleFavorite, isFavorite } = useReading();
  const { language } = usePreferences();
  const favorite = isFavorite(card.card.id);

  return (
    <article className="panel-shell gold-frame overflow-hidden rounded-[28px]">
      <div className="grid gap-0 lg:grid-cols-[0.36fr_0.64fr]">
        <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(212,176,106,0.12),rgba(255,255,255,0.02))] p-6 lg:border-b-0 lg:border-r">
          {card.card.image ? (
            <div className="mb-5 overflow-hidden rounded-[20px] border border-gold/25 bg-black/30">
              <img src={card.card.image} alt={getCardName(language, card.card)} loading="lazy" className="h-72 w-full object-cover object-top" />
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-gold/75">{translatePositionLabel(language, card.position.key, card.position.label)}</p>
              <h3 className="mt-4 font-display text-3xl text-[#fff1cf]">{getCardName(language, card.card)}</h3>
            </div>
            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  void toggleFavorite(card.card.id);
                }}
                className={`rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                  favorite
                    ? 'border-gold/45 bg-gold/10 text-[#fff1cf]'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-gold/30'
                }`}
              >
                {favorite ? t(language, 'result.saved') : t(language, 'result.save')}
              </button>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-slate-300">
            {getArcanaLabel(language, card.card.arcana)}
            {card.card.suit ? ` / ${getTarotSuitLabel(language, card.card.suit)}` : ''}
            {' / '}
            {card.orientation === 'upright' ? 'Upright' : 'Reversed'}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {getCardKeywords(language, card.baseKeywords).map((keyword) => (
              <span key={keyword} className="rounded-full border border-gold/25 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold/85">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/70">{t(language, 'result.core')}</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">{getCardMeaning(language, card.baseMeaning)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/70">{t(language, 'result.position')}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{getCardMeaning(language, card.positionMeaning)}</p>
          </div>
          <div className="rounded-[22px] border border-gold/20 bg-gold/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-gold/75">{t(language, 'result.overlay', { zodiac: zodiacName })}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{card.zodiacOverlay ? getCardMeaning(language, card.zodiacOverlay) : ''}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
