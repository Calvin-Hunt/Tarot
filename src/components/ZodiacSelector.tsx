import { zodiacProfiles } from '@/data/zodiac';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { getZodiacElementLabel, getZodiacModalityLabel, getZodiacName, getZodiacTone } from '@/lib/content';

export function ZodiacSelector() {
  const { selectedZodiac, setSelectedZodiacById } = useReading();
  const { language } = usePreferences();

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {zodiacProfiles.map((zodiac) => {
        const active = zodiac.id === selectedZodiac.id;
        return (
          <button
            key={zodiac.id}
            type="button"
            onClick={() => setSelectedZodiacById(zodiac.id)}
            className={`rounded-[22px] border p-4 text-left transition ${active ? 'border-gold/45 bg-gold/10' : 'border-white/10 bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.05]'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-2xl text-gold">{zodiac.symbol}</div>
              <div>
                <p className="font-display text-xl text-[#fff1cf]">{getZodiacName(language, zodiac)}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{getZodiacElementLabel(language, zodiac.element)} / {getZodiacModalityLabel(language, zodiac.modality)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{getZodiacTone(language, zodiac)}</p>
          </button>
        );
      })}
    </div>
  );
}
