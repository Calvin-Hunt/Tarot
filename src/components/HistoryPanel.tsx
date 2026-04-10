import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { getCardName } from '@/lib/content';
import { getSpreadById } from '@/lib/spreads';
import { t, translateSpreadName } from '@/lib/i18n';

export function HistoryPanel() {
  const { history, restoreReading, currentUser } = useReading();
  const { language } = usePreferences();

  return (
    <div className="panel-shell gold-frame p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'history.title')}</p>
          <h3 className="mt-3 font-display text-3xl text-[#fff1cf]">{t(language, 'history.heading')}</h3>
        </div>
        <p className="text-sm text-slate-400">{currentUser ? t(language, 'history.synced') : t(language, 'history.local')}</p>
      </div>

      {history.length === 0 ? (
        <p className="mt-6 text-sm leading-7 text-slate-300">{t(language, 'history.empty')}</p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {history.map((session) => (
            <button
              key={session.id}
              type="button"
              onClick={() => restoreReading(session)}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-gold/30 hover:bg-white/[0.05]"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">{translateSpreadName(language, session.spreadId, getSpreadById(session.spreadId).name)}</p>
              <p className="mt-3 font-display text-xl text-[#fff1cf]">{new Date(session.createdAt).toLocaleString()}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{session.cards.map((entry) => getCardName(language, entry.card)).join(' / ')}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
