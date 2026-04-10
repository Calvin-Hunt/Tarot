import { usePreferences } from '@/context/PreferencesContext';
import { appThemes } from '@/data/themes';
import { HomePage } from '@/pages/HomePage';
import { ReadingStudioPage } from '@/pages/ReadingStudioPage';

export default function App() {
  const { themeMode, selectedThemeId } = usePreferences();
  const theme = appThemes.find((entry) => entry.id === selectedThemeId) ?? appThemes[0];

  return (
    <div className={`relative min-h-screen overflow-hidden ${theme.surfaceClass} ${themeMode === 'minimal' ? 'saturate-[0.8]' : ''}`}>
      <div className="absolute inset-0 bg-cosmic-grid bg-[length:120px_120px] opacity-[0.08]" />
      <div className={`absolute left-[-8%] top-[12%] h-72 w-72 rounded-full blur-3xl ${theme.glowClass}`} />
      <div className={`absolute right-[-4%] top-[26%] h-96 w-96 rounded-full blur-3xl ${theme.accentClass}`} />
      <main className="relative z-10">
        <HomePage />
        <ReadingStudioPage />
      </main>
      <footer className="relative z-10 px-6 pb-10 pt-2 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-[24px] border border-gold/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-5 shadow-card backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-gold/20" />
            <span className="text-gold/70">*</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-gold/70 to-gold/20" />
          </div>
          <p className="text-center text-xs tracking-[0.28em] text-[#e8d5a8]">© 2026 Ariel & Calvin&apos;s Asset . 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
}
