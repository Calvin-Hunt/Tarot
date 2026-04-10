import { AccountPanel } from '@/components/AccountPanel';
import { HistoryPanel } from '@/components/HistoryPanel';
import { LibraryPreview } from '@/components/LibraryPreview';
import { QuestionGuidePanel } from '@/components/QuestionGuidePanel';
import { ReadingPanel } from '@/components/ReadingPanel';
import { SectionHeading } from '@/components/SectionHeading';
import { SharePanel } from '@/components/SharePanel';
import { ShuffleDeck } from '@/components/ShuffleDeck';
import { SpreadSelector } from '@/components/SpreadSelector';
import { ThemePanel } from '@/components/ThemePanel';
import { ZodiacSelector } from '@/components/ZodiacSelector';
import { usePreferences } from '@/context/PreferencesContext';
import { t } from '@/lib/i18n';

export function ReadingStudioPage() {
  const { language } = usePreferences();
  return (
    <section id="studio" className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={t(language, 'studio.eyebrow')}
          title={t(language, 'studio.title')}
          description={t(language, 'studio.description')}
        />
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <QuestionGuidePanel />
          <AccountPanel />
        </div>
        <SpreadSelector />
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="panel-shell gold-frame p-6">
            <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'zodiac.title')}</p>
            <h3 className="mt-4 font-display text-4xl text-[#fff1cf]">{t(language, 'zodiac.heading')}</h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              {t(language, 'zodiac.description')}
            </p>
            <div className="mt-8">
              <ZodiacSelector />
            </div>
          </div>
          <ThemePanel />
        </div>
        <ShuffleDeck />
        <ReadingPanel />
        <SharePanel />
        <HistoryPanel />
        <LibraryPreview />
      </div>
    </section>
  );
}
