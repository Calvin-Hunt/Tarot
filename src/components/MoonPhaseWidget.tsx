import { usePreferences } from '@/context/PreferencesContext';
import { t } from '@/lib/i18n';

const phases = [
  { glyph: '●', name: 'New Moon' },
  { glyph: '◔', name: 'Waxing Crescent' },
  { glyph: '◑', name: 'First Quarter' },
  { glyph: '◕', name: 'Waxing Gibbous' },
  { glyph: '○', name: 'Full Moon' },
  { glyph: '◕', name: 'Waning Gibbous' },
  { glyph: '◐', name: 'Last Quarter' },
  { glyph: '◓', name: 'Waning Crescent' },
];

export function MoonPhaseWidget() {
  const { language } = usePreferences();
  const phase = phases[new Date().getDate() % phases.length];

  return (
    <div className="panel-shell gold-frame p-5">
      <p className="text-[11px] uppercase tracking-[0.45em] text-gold/70">Moon Phase</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-white/[0.03] text-3xl text-gold shadow-halo">
          {phase.glyph}
        </div>
        <div>
          <p className="font-display text-2xl text-[#fff3d8]">{phase.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t(language, 'moon.description')}</p>
        </div>
      </div>
    </div>
  );
}
