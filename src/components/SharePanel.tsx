import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { getCardKeywords, getCardName } from '@/lib/content';
import { t, translatePositionLabel, translateSpreadName, translateZodiacName } from '@/lib/i18n';
import { getSpreadById } from '@/lib/spreads';

export function SharePanel() {
  const { currentReading, selectedZodiac } = useReading();
  const { language } = usePreferences();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  if (!currentReading) {
    return null;
  }

  const exportImage = async () => {
    if (!cardRef.current) {
      return;
    }

    const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `tarot-reading-${currentReading.id}.png`;
    link.href = dataUrl;
    link.click();
    setStatus(t(language, 'share.exported'));
  };

  const shareText = `${translateSpreadName(language, currentReading.spreadId, getSpreadById(currentReading.spreadId).name)} / ${translateZodiacName(language, selectedZodiac.id, selectedZodiac.name)} / ${currentReading.cards
    .map((card) => getCardName(language, card.card))
    .join(', ')}`;

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Tarot Celestial Reading',
        text: shareText,
      });
      setStatus(t(language, 'share.shared'));
      return;
    }

    await navigator.clipboard.writeText(shareText);
    setStatus(t(language, 'share.copied'));
  };

  return (
    <div className="panel-shell gold-frame p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'share.title')}</p>
          <h3 className="mt-3 font-display text-3xl text-[#fff1cf]">{t(language, 'share.heading')}</h3>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              void share();
            }}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-gold/30"
          >
            {t(language, 'share.button')}
          </button>
          <button
            type="button"
            onClick={() => {
              void exportImage();
            }}
            className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#fff1cf] transition hover:bg-gold/20"
          >
            {t(language, 'share.export')}
          </button>
        </div>
      </div>
      {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
      <div className="mt-6 flex justify-center">
        <div ref={cardRef} className="w-full max-w-md rounded-[28px] border border-gold/25 bg-[linear-gradient(180deg,#0e132c,#080b18)] p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Tarot Celestial Studio</p>
          <h4 className="mt-4 font-display text-3xl text-[#fff1cf]">{translateSpreadName(language, currentReading.spreadId, getSpreadById(currentReading.spreadId).name)}</h4>
          <p className="mt-2 text-sm text-slate-300">{translateZodiacName(language, selectedZodiac.id, selectedZodiac.name)} {t(language, 'share.zodiacLens')}</p>
          <div className="mt-6 space-y-3">
            {currentReading.cards.slice(0, 3).map((card) => (
              <div key={card.card.id + card.position.key} className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gold/70">{translatePositionLabel(language, card.position.key, card.position.label)}</p>
                <p className="mt-2 font-display text-2xl text-[#fff1cf]">{getCardName(language, card.card)}</p>
                <p className="mt-2 text-sm text-slate-300">{getCardKeywords(language, card.baseKeywords).join(' / ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
