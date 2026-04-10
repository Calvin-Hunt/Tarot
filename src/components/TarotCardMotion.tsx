import { motion } from 'framer-motion';
import { usePreferences } from '@/context/PreferencesContext';
import { getArcanaLabel, getCardDescription, getCardKeywords, getCardName } from '@/lib/content';
import { translatePositionLabel } from '@/lib/i18n';
import type { InterpretedCard } from '@/types/reading';

export function TarotCardMotion({
  card,
  index,
  isRevealed,
  onSelect,
}: {
  card: InterpretedCard;
  index: number;
  isRevealed: boolean;
  onSelect?: () => void;
}) {
  const { language } = usePreferences();
  const isReversed = card.orientation === 'reversed';
  const hasImage = Boolean(card.card.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 110, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 105, damping: 15 }}
      whileHover={isRevealed ? { y: -10, boxShadow: '0 0 40px rgba(212,176,106,0.22)' } : { y: -4 }}
      className="group [perspective:1400px]"
    >
      <button
        type="button"
        onClick={isRevealed ? onSelect : undefined}
        className={`block w-full text-left ${isRevealed ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <motion.div
          animate={{ rotateY: isRevealed ? 180 : 0, rotateZ: isRevealed && isReversed ? 180 : 0 }}
          transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative min-h-[320px] [transform-style:preserve-3d]"
        >
          <div className="panel-shell gold-frame absolute inset-0 overflow-hidden rounded-[30px] border border-gold/20 bg-[linear-gradient(180deg,rgba(18,22,48,0.96),rgba(4,7,18,0.98))] p-5 [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,176,106,0.08),transparent_38%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:auto,28px_28px,28px_28px]" />
            <div className="absolute inset-5 rounded-[22px] border border-gold/30" />
            <div className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.5em] text-gold/65">{translatePositionLabel(language, card.position.key, card.position.label)}</div>
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <div className="mt-2 flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-white/[0.04] text-3xl text-gold shadow-halo">
                *
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.45em] text-slate-300">Tarot Arcana</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-slate-400">
                {isRevealed ? 'Reveal Complete' : 'Awaiting Reveal'}
              </p>
            </div>
          </div>

          <div className="panel-shell gold-frame interactive-glow absolute inset-0 overflow-hidden rounded-[30px] border border-gold/20 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,176,106,0.18),transparent_30%),linear-gradient(180deg,rgba(17,25,58,0.32),rgba(5,8,18,0.94))]" />
            <div className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.5em] text-gold/65">{translatePositionLabel(language, card.position.key, card.position.label)}</div>
            <div className="absolute right-6 top-6 text-[11px] uppercase tracking-[0.35em] text-slate-300">
              {isReversed ? 'Reversed' : 'Upright'}
            </div>
            <div className="relative flex h-full flex-col justify-between pt-10">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{getArcanaLabel(language, card.card.arcana)}</p>
                <h3 className="mt-6 font-display text-3xl text-[#fff1cf]">{getCardName(language, card.card)}</h3>
                <div className="mt-6 flex justify-center">
                  {hasImage ? (
                    <div className="overflow-hidden rounded-[22px] border border-gold/30 bg-black/30 shadow-halo">
                      <img
                        src={card.card.image}
                        alt={getCardName(language, card.card)}
                        loading="lazy"
                        className="h-44 w-28 object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-white/[0.04] text-3xl text-gold group-hover:scale-105">
                      *
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3 text-sm leading-6 text-slate-300">
                <p>{getCardDescription(language, card.card)}</p>
                <div className="flex flex-wrap gap-2">
                  {getCardKeywords(language, card.baseKeywords).map((keyword) => (
                    <span key={`${card.card.id}-${keyword}`} className="rounded-full border border-gold/20 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold/80">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
