import { usePreferences } from '@/context/PreferencesContext';
import { t } from '@/lib/i18n';

export function AstrologyPulse() {
  const { language } = usePreferences();
  return (
    <div className="panel-shell gold-frame p-5">
      <p className="text-[11px] uppercase tracking-[0.45em] text-gold/70">Celestial Pulse</p>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
        <p>{t(language, 'pulse.line1')}</p>
        <p>{t(language, 'pulse.line2')}</p>
      </div>
    </div>
  );
}
