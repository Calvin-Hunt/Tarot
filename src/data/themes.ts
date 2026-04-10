import type { ThemeId } from '@/types/reading';

export interface AppTheme {
  id: ThemeId;
  name: string;
  description: string;
  surfaceClass: string;
  glowClass: string;
  accentClass: string;
  starColor: string;
}

export const appThemes: AppTheme[] = [
  {
    id: 'mystic-nocturne',
    name: 'Mystic Nocturne',
    description: 'Deep indigo, antique gold and high-contrast cosmic glow.',
    surfaceClass: 'bg-[radial-gradient(circle_at_top,rgba(46,60,112,0.28),transparent_28%),linear-gradient(180deg,#050711_0%,#080b18_35%,#060815_100%)]',
    glowClass: 'bg-gold/10',
    accentClass: 'bg-indigo-500/10',
    starColor: 'rgba(255,255,255,0.9)',
  },
  {
    id: 'solar-velvet',
    name: 'Solar Velvet',
    description: 'More ember warmth with crimson and bronze highlights.',
    surfaceClass: 'bg-[radial-gradient(circle_at_top,rgba(135,62,38,0.25),transparent_30%),linear-gradient(180deg,#13090a_0%,#140b15_45%,#0c0610_100%)]',
    glowClass: 'bg-amber-500/10',
    accentClass: 'bg-rose-500/10',
    starColor: 'rgba(255,240,220,0.9)',
  },
  {
    id: 'lunar-ivory',
    name: 'Lunar Ivory',
    description: 'A restrained, lighter ritual theme with moonlit contrast.',
    surfaceClass: 'bg-[radial-gradient(circle_at_top,rgba(226,223,216,0.18),transparent_26%),linear-gradient(180deg,#17161d_0%,#1d1b24_45%,#121118_100%)]',
    glowClass: 'bg-slate-200/10',
    accentClass: 'bg-sky-200/10',
    starColor: 'rgba(245,245,245,0.82)',
  },
];

export const defaultTheme = appThemes[0];
