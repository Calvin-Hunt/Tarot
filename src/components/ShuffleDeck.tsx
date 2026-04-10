import { motion } from 'framer-motion';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { t, translateSpreadName } from '@/lib/i18n';
import { getSpreadById } from '@/lib/spreads';

export function ShuffleDeck() {
  const { isShuffling, beginShuffle, selectedSpreadId } = useReading();
  const { language } = usePreferences();
  const spreadName = translateSpreadName(language, selectedSpreadId, getSpreadById(selectedSpreadId).name);

  return (
    <div className="panel-shell gold-frame p-6">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="flex justify-center">
          <div className="relative h-72 w-52 [perspective:1000px]">
            {[0, 1, 2].map((layer) => (
              <motion.div
                key={layer}
                animate={
                  isShuffling
                    ? {
                        x: [0, -26 + layer * 18, 18 - layer * 10, 0],
                        y: [0, -12 + layer * 8, 10 - layer * 5, 0],
                        rotateZ: [0, -10 + layer * 4, 8 - layer * 3, 0],
                      }
                    : { x: layer * 8, y: layer * 10, rotateZ: layer * 3 - 4 }
                }
                transition={{
                  repeat: isShuffling ? Number.POSITIVE_INFINITY : 0,
                  duration: 1.15,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-[28px] border border-gold/30 bg-[linear-gradient(180deg,rgba(15,19,44,0.96),rgba(5,8,18,0.98))] shadow-card"
              >
                <div className="absolute inset-4 rounded-[22px] border border-gold/30" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <p className="font-display text-4xl text-gold">*</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.5em] text-slate-300">Arcana</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'shuffle.title')}</p>
          <h3 className="mt-4 font-display text-4xl text-[#fff1cf]">{t(language, 'shuffle.heading')}</h3>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            {t(language, 'shuffle.description', { spread: spreadName })}
          </p>
          <button
            type="button"
            disabled={isShuffling}
            onClick={() => {
              void beginShuffle();
            }}
            className="mt-8 rounded-full border border-gold/45 bg-gold/10 px-8 py-4 text-sm uppercase tracking-[0.35em] text-[#fff1cf] transition hover:bg-gold/20 hover:shadow-halo disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isShuffling ? t(language, 'shuffle.loading') : t(language, 'shuffle.begin')}
          </button>
        </div>
      </div>
    </div>
  );
}
