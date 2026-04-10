import { useState } from 'react';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { t } from '@/lib/i18n';

export function AccountPanel() {
  const { currentUser, login, register, logout } = useReading();
  const { language } = usePreferences();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      setError(null);
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password, displayName });
      }
      setPassword('');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to authenticate');
    }
  };

  return (
    <div id="account-panel" className="panel-shell gold-frame p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'account.title')}</p>
          <h3 className="mt-3 font-display text-3xl text-[#fff1cf]">{currentUser ? currentUser.displayName : t(language, 'account.heading')}</h3>
        </div>
        {currentUser ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-gold/30"
          >
            {t(language, 'account.logout')}
          </button>
        ) : null}
      </div>

      {currentUser ? (
        <p className="mt-4 text-sm leading-7 text-slate-300">
          {t(language, 'account.synced')}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] ${mode === 'login' ? 'border-gold/40 bg-gold/10 text-[#fff1cf]' : 'border-white/10 bg-white/5 text-slate-300'}`}
            >
              {t(language, 'account.login')}
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] ${mode === 'register' ? 'border-gold/40 bg-gold/10 text-[#fff1cf]' : 'border-white/10 bg-white/5 text-slate-300'}`}
            >
              {t(language, 'account.register')}
            </button>
          </div>
          {mode === 'register' ? (
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder={t(language, 'account.displayName')}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-gold/35"
            />
          ) : null}
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t(language, 'account.email')}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-gold/35"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t(language, 'account.password')}
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-gold/35"
          />
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <button
            type="button"
            onClick={() => {
              void submit();
            }}
            className="rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm uppercase tracking-[0.3em] text-[#fff1cf] transition hover:bg-gold/20"
          >
            {mode === 'login' ? t(language, 'account.enter') : t(language, 'account.create')}
          </button>
        </div>
      )}
    </div>
  );
}
