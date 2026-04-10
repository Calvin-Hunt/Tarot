import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CardSpotlight } from '@/components/CardSpotlight';
import { ResultCard } from '@/components/ResultCard';
import { TarotCardMotion } from '@/components/TarotCardMotion';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { getZodiacName } from '@/lib/content';
import { t, translateZodiacName } from '@/lib/i18n';

export function ReadingPanel() {
  const { currentReading, selectedZodiac } = useReading();
  const { language } = usePreferences();
  const [spotlightCardId, setSpotlightCardId] = useState<string | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    setSpotlightCardId(null);
    setRevealedCount(0);

    if (!currentReading) {
      return;
    }

    const timers = currentReading.cards.map((_, index) =>
      window.setTimeout(() => {
        setRevealedCount(index + 1);
      }, 520 + index * 620),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [currentReading]);

  if (!currentReading) {
    return (
      <div className="panel-shell gold-frame p-8 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'reading.title')}</p>
        <h3 className="mt-4 font-display text-3xl text-[#fff1cf]">{t(language, 'reading.emptyHeading')}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          {t(language, 'reading.emptyDesc', { zodiac: translateZodiacName(language, selectedZodiac.id, getZodiacName(language, selectedZodiac)) })}
        </p>
      </div>
    );
  }

  const revealFinished = revealedCount >= currentReading.cards.length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel-shell gold-frame p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'reading.drawn')}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {revealFinished
              ? t(language, 'reading.allRevealed')
              : t(language, 'reading.revealing', {
                  current: Math.min(revealedCount + 1, currentReading.cards.length),
                  total: currentReading.cards.length,
                })}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentReading.cards.map((card, index) => (
            <TarotCardMotion
              key={`${currentReading.id}-${card.position.key}`}
              card={card}
              index={index}
              isRevealed={index < revealedCount}
              onSelect={() => setSpotlightCardId(card.card.id)}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: revealFinished ? 1 : 0.45, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid gap-5"
      >
        {currentReading.cards.map((card, index) => (
          <ResultCard
            key={`${card.card.id}-${card.position.key}-${index}`}
            card={card}
            zodiacName={translateZodiacName(language, selectedZodiac.id, getZodiacName(language, selectedZodiac))}
          />
        ))}
      </motion.div>

      <CardSpotlight
        card={currentReading.cards.find((item) => item.card.id === spotlightCardId)?.card ?? null}
        onClose={() => setSpotlightCardId(null)}
      />
    </div>
  );
}
