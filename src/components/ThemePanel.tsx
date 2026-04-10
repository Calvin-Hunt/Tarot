import { appThemes } from '@/data/themes';
import { usePreferences } from '@/context/PreferencesContext';
import { t, translateThemeName } from '@/lib/i18n';

export function ThemePanel() {
  const { selectedThemeId, setSelectedThemeId, language } = usePreferences();

  return (
    <div className="panel-shell gold-frame p-6">
      <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'theme.title')}</p>
      <h3 className="mt-3 font-display text-3xl text-[#fff1cf]">{t(language, 'theme.heading')}</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {appThemes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => setSelectedThemeId(theme.id)}
            className={`rounded-[22px] border p-4 text-left transition ${
              selectedThemeId === theme.id ? 'border-gold/40 bg-gold/10 shadow-halo' : 'border-white/10 bg-white/[0.03] hover:border-gold/25'
            }`}
          >
            <div className={`h-24 rounded-[18px] ${theme.surfaceClass}`} />
            <p className="mt-4 font-display text-2xl text-[#fff1cf]">{translateThemeName(language, theme.id, theme.name)}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{theme.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
