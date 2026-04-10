import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { t } from '@/lib/i18n';

export function ModeSwitch() {
  const { currentUser } = useReading();
  const { themeMode, toggleThemeMode, soundEnabled, toggleSoundEnabled, language, toggleLanguage } = usePreferences();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={toggleThemeMode}
        className="rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-slate-200 transition hover:border-gold/60 hover:bg-white/10"
      >
        {themeMode === 'mystic' ? t(language, 'mode.mystic') : t(language, 'mode.minimal')}
      </button>
      <button
        type="button"
        onClick={toggleSoundEnabled}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-slate-300 transition hover:border-gold/40 hover:text-white"
      >
        {soundEnabled ? t(language, 'sound.on') : t(language, 'sound.off')}
      </button>
      <button
        type="button"
        onClick={toggleLanguage}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-slate-300 transition hover:border-gold/40 hover:text-white"
      >
        {language === 'en' ? t(language, 'language.zh') : t(language, 'language.en')}
      </button>
      <a
        href="#account-panel"
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] text-slate-300 transition hover:border-gold/40 hover:text-white"
      >
        {currentUser ? currentUser.displayName : t(language, 'guest')}
      </a>
    </div>
  );
}
