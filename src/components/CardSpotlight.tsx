import { AnimatePresence, motion } from 'framer-motion';
import { usePreferences } from '@/context/PreferencesContext';
import { getArcanaLabel, getCardDescription, getCardKeywords, getCardMeaning, getCardName, getTarotElementLabel, getTarotSuitLabel } from '@/lib/content';
import { t } from '@/lib/i18n';
import type { TarotCard } from '@/types/tarot';

interface CardSpotlightProps {
  card: TarotCard | null;
  onClose: () => void;
}

export function CardSpotlight({ card, onClose }: CardSpotlightProps) {
  const { language } = usePreferences();
  return (
    <AnimatePresence>
      {card ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050d]/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="panel-shell gold-frame relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[32px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200 transition hover:border-gold/40 hover:text-white"
            >
              {t(language, 'spotlight.close')}
            </button>

            <div className="grid max-h-[92vh] overflow-auto lg:grid-cols-[0.44fr_0.56fr]">
              <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(212,176,106,0.12),transparent_30%),linear-gradient(180deg,rgba(8,11,24,0.96),rgba(3,5,13,0.98))] p-6 lg:border-b-0 lg:border-r">
                {card.image ? (
                  <div className="overflow-hidden rounded-[24px] border border-gold/25 bg-black/40 shadow-halo">
                    <img src={card.image} alt={getCardName(language, card)} className="h-full max-h-[72vh] w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex min-h-[32rem] items-center justify-center rounded-[24px] border border-gold/20 bg-white/[0.03] text-6xl text-gold">
                    *
                  </div>
                )}
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'spotlight.title')}</p>
                  <h3 className="mt-4 font-display text-5xl text-[#fff1cf]">{getCardName(language, card)}</h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">
                    {getArcanaLabel(language, card.arcana)}
                    {card.suit ? ` / ${getTarotSuitLabel(language, card.suit)}` : ''}
                  </p>
                </div>

                <div className="rounded-[22px] border border-gold/20 bg-gold/5 p-5">
                  <p className="text-xs uppercase tracking-[0.4em] text-gold/75">{t(language, 'spotlight.essence')}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{getCardDescription(language, card)}</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <section className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold/70">{t(language, 'spotlight.upright')}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {getCardKeywords(language, card.keywords_upright).map((keyword) => (
                        <span key={`up-${keyword}`} className="rounded-full border border-gold/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-gold/80">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{getCardMeaning(language, card.meaning_upright)}</p>
                  </section>

                  <section className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold/70">{t(language, 'spotlight.reversed')}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {getCardKeywords(language, card.keywords_reversed).map((keyword) => (
                        <span key={`rev-${keyword}`} className="rounded-full border border-gold/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-gold/80">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{getCardMeaning(language, card.meaning_reversed)}</p>
                  </section>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t(language, 'spotlight.number')}</p>
                    <p className="mt-3 font-display text-3xl text-[#fff1cf]">{card.number}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t(language, 'spotlight.element')}</p>
                    <p className="mt-3 font-display text-3xl text-[#fff1cf]">{getTarotElementLabel(language, card.element_association)}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t(language, 'spotlight.zodiac')}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{card.zodiac_association.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
