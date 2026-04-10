import { motion, useScroll, useTransform } from 'framer-motion';
import { ModeSwitch } from '@/components/ModeSwitch';
import { usePreferences } from '@/context/PreferencesContext';
import { t } from '@/lib/i18n';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 90]);
  const { language } = usePreferences();

  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-24 pt-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.55em] text-gold/75">Tarot Celestial Studio</p>
            <p className="mt-2 text-sm text-slate-400">{t(language, 'hero.subtitle')}</p>
          </div>
          <ModeSwitch />
        </header>

        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div style={{ y }} className="relative z-10 max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.55em] text-gold/75">{t(language, 'hero.eyebrow')}</p>
            <h1 className="font-display text-5xl leading-[1.05] text-[#fff4dc] sm:text-7xl">
              {t(language, 'hero.titleLead')}
              <span className="block text-gradient-gold">{t(language, 'hero.titleAccent')}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {t(language, 'hero.description')}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#studio"
                className="rounded-full border border-gold/50 bg-gold/10 px-8 py-4 text-sm uppercase tracking-[0.35em] text-[#fff1cf] transition hover:bg-gold/20 hover:shadow-halo"
              >
                {t(language, 'hero.start')}
              </a>
              <a
                href="#library"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.35em] text-slate-200 transition hover:border-gold/30 hover:bg-white/10"
              >
                {t(language, 'hero.library')}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative mx-auto aspect-square w-full max-w-[460px]"
          >
            <div className="absolute inset-4 rounded-full border border-gold/20" />
            <div className="absolute inset-12 rounded-full border border-gold/15" />
            <div className="absolute inset-0 animate-rotateSlow rounded-full border border-gold/20" />
            <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(212,176,106,0.22),transparent_60%)] blur-3xl" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="panel-shell gold-frame interactive-glow relative flex h-[68%] w-[44%] rotate-[-8deg] items-center justify-center overflow-hidden rounded-[30px] border border-gold/25 p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,176,106,0.18),transparent_30%),linear-gradient(180deg,rgba(10,14,34,0.95),rgba(7,10,22,0.98))]" />
                <div className="absolute inset-5 rounded-[22px] border border-gold/35" />
                <div className="relative text-center">
                  <p className="text-xs uppercase tracking-[0.5em] text-gold/70">Arcana</p>
                  <p className="mt-6 font-display text-4xl text-[#fff1cf]">*</p>
                  <p className="mt-6 text-sm tracking-[0.35em] text-slate-200">THE ORACLE</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
