import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultTheme } from '@/data/themes';
import {
  loadLanguageCode,
  loadSoundEnabled,
  loadThemeId,
  loadThemeMode,
  saveLanguageCode,
  saveSoundEnabled,
  saveThemeId,
  saveThemeMode,
} from '@/lib/storage';
import type { LanguageCode, PreferencesContextState, ThemeId, ThemeMode } from '@/types/reading';

interface PreferencesContextValue extends PreferencesContextState {
  setLanguage: (language: LanguageCode) => void;
  setSelectedThemeId: (themeId: ThemeId) => void;
  toggleLanguage: () => void;
  toggleThemeMode: () => void;
  toggleSoundEnabled: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(loadThemeMode() ?? 'mystic');
  const [selectedThemeId, setSelectedThemeIdState] = useState<ThemeId>(loadThemeId() ?? defaultTheme.id);
  const [language, setLanguageState] = useState<LanguageCode>(loadLanguageCode() ?? 'en');
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(loadSoundEnabled());

  useEffect(() => {
    saveThemeMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    saveThemeId(selectedThemeId);
  }, [selectedThemeId]);

  useEffect(() => {
    saveLanguageCode(language);
  }, [language]);

  useEffect(() => {
    saveSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      themeMode,
      selectedThemeId,
      language,
      soundEnabled,
      setLanguage: setLanguageState,
      setSelectedThemeId: setSelectedThemeIdState,
      toggleLanguage: () => setLanguageState((previous) => (previous === 'en' ? 'zh' : 'en')),
      toggleThemeMode: () => setThemeMode((previous) => (previous === 'mystic' ? 'minimal' : 'mystic')),
      toggleSoundEnabled: () => setSoundEnabledState((previous) => !previous),
    }),
    [language, selectedThemeId, soundEnabled, themeMode],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
}
