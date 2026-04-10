import { spreadDefinitions } from '@/lib/spreads';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { translateSpreadName } from '@/lib/i18n';

export function SpreadSelector() {
  const { selectedSpreadId, setSelectedSpreadId } = useReading();
  const { language } = usePreferences();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {spreadDefinitions.map((spread) => {
        const active = spread.id === selectedSpreadId;
        return (
          <button
            key={spread.id}
            type="button"
            onClick={() => setSelectedSpreadId(spread.id)}
            className={`panel-shell rounded-[24px] p-5 text-left transition ${active ? 'border-gold/45 bg-gold/10 shadow-halo' : 'border-white/10 hover:border-gold/25 hover:bg-white/[0.06]'}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-2xl text-[#fff1cf]">{translateSpreadName(language, spread.id, spread.name)}</p>
              <span className="rounded-full border border-gold/25 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-gold/75">
                {spread.cardCount} Cards
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{spread.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-400">{spread.ritualPrompt}</p>
          </button>
        );
      })}
    </div>
  );
}
