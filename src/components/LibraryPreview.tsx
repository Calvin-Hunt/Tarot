import { useState } from 'react';
import { CardSpotlight } from '@/components/CardSpotlight';
import { usePreferences } from '@/context/PreferencesContext';
import { majorArcanaCards } from '@/data/tarot';
import { getCardDescription, getCardName } from '@/lib/content';
import { t } from '@/lib/i18n';

export function LibraryPreview() {
  const [spotlightCardId, setSpotlightCardId] = useState<string | null>(null);
  const { language } = usePreferences();

  return (
    <>
      <div id="library" className="panel-shell gold-frame p-6">
        <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'library.title')}</p>
        <h3 className="mt-4 font-display text-4xl text-[#fff1cf]">{t(language, 'library.heading')}</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          {t(language, 'library.description')}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {majorArcanaCards.slice(0, 8).map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setSpotlightCardId(card.id)}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-gold/30 hover:bg-white/[0.05] hover:shadow-halo"
            >
              {card.image ? (
                <div className="mb-4 overflow-hidden rounded-[18px] border border-gold/20 bg-black/30">
                  <img src={card.image} alt={getCardName(language, card)} loading="lazy" className="h-56 w-full object-cover object-top transition duration-500 hover:scale-[1.03]" />
                </div>
              ) : null}
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">No.{card.number}</p>
              <p className="mt-2 font-display text-2xl text-[#fff1cf]">{getCardName(language, card)}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{getCardDescription(language, card)}</p>
            </button>
          ))}
        </div>
      </div>

      <CardSpotlight card={majorArcanaCards.find((card) => card.id === spotlightCardId) ?? null} onClose={() => setSpotlightCardId(null)} />
    </>
  );
}
