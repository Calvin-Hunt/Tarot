import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, 'public', 'cards');

const majorCards = [
  ['major-fool', 'The Fool', '愚者', '0', '✦'],
  ['major-magician', 'The Magician', '魔术师', 'I', '✶'],
  ['major-high-priestess', 'The High Priestess', '女祭司', 'II', '☽'],
  ['major-empress', 'The Empress', '皇后', 'III', '❀'],
  ['major-emperor', 'The Emperor', '皇帝', 'IV', '⚚'],
  ['major-hierophant', 'The Hierophant', '教皇', 'V', '✧'],
  ['major-lovers', 'The Lovers', '恋人', 'VI', '♡'],
  ['major-chariot', 'The Chariot', '战车', 'VII', '☄'],
  ['major-strength', 'Strength', '力量', 'VIII', '♌'],
  ['major-hermit', 'The Hermit', '隐者', 'IX', '✺'],
  ['major-wheel-of-fortune', 'Wheel of Fortune', '命运之轮', 'X', '◌'],
  ['major-justice', 'Justice', '正义', 'XI', '⚖'],
  ['major-hanged-man', 'The Hanged Man', '倒吊人', 'XII', '△'],
  ['major-death', 'Death', '死神', 'XIII', '☠'],
  ['major-temperance', 'Temperance', '节制', 'XIV', '☿'],
  ['major-devil', 'The Devil', '恶魔', 'XV', '⛧'],
  ['major-tower', 'The Tower', '高塔', 'XVI', '⚡'],
  ['major-star', 'The Star', '星星', 'XVII', '✷'],
  ['major-moon', 'The Moon', '月亮', 'XVIII', '☾'],
  ['major-sun', 'The Sun', '太阳', 'XIX', '☼'],
  ['major-judgement', 'Judgement', '审判', 'XX', '✹'],
  ['major-world', 'The World', '世界', 'XXI', '◎'],
];

const suits = [
  { id: 'wands', en: 'Wands', zh: '权杖', symbol: '✦', accent: '#c78b3b' },
  { id: 'cups', en: 'Cups', zh: '圣杯', symbol: '◔', accent: '#6aa7d4' },
  { id: 'swords', en: 'Swords', zh: '宝剑', symbol: '✧', accent: '#a8c4d6' },
  { id: 'pentacles', en: 'Pentacles', zh: '星币', symbol: '✶', accent: '#9ec77f' },
];

const ranks = [
  ['ace', 'Ace', '王牌'],
  ['two', 'Two', '二'],
  ['three', 'Three', '三'],
  ['four', 'Four', '四'],
  ['five', 'Five', '五'],
  ['six', 'Six', '六'],
  ['seven', 'Seven', '七'],
  ['eight', 'Eight', '八'],
  ['nine', 'Nine', '九'],
  ['ten', 'Ten', '十'],
  ['page', 'Page', '侍从'],
  ['knight', 'Knight', '骑士'],
  ['queen', 'Queen', '皇后'],
  ['king', 'King', '国王'],
];

function escapeText(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function createSvg({ titleEn, titleZh, subtitle, accent, symbol, numeral }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1200" viewBox="0 0 720 1200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#141b3e"/>
      <stop offset="100%" stop-color="#050814"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="22%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="720" height="1200" rx="42" fill="url(#bg)"/>
  <rect x="18" y="18" width="684" height="1164" rx="34" fill="none" stroke="#d4b06a" stroke-opacity="0.45" stroke-width="2"/>
  <rect x="42" y="42" width="636" height="1116" rx="28" fill="none" stroke="#d4b06a" stroke-opacity="0.28" stroke-width="2"/>
  <circle cx="360" cy="284" r="240" fill="url(#glow)"/>
  <g stroke="#d4b06a" stroke-opacity="0.18" fill="none">
    <circle cx="360" cy="480" r="176"/>
    <circle cx="360" cy="480" r="128"/>
    <circle cx="360" cy="480" r="78"/>
  </g>
  <g fill="none" stroke="#d4b06a" stroke-opacity="0.2">
    <path d="M360 170 L360 790"/>
    <path d="M110 480 L610 480"/>
    <path d="M190 310 L530 650"/>
    <path d="M530 310 L190 650"/>
  </g>
  <text x="360" y="154" fill="#f7e9be" font-size="36" text-anchor="middle" font-family="Georgia, serif" letter-spacing="7">${escapeText(subtitle)}</text>
  <text x="360" y="452" fill="${accent}" font-size="132" text-anchor="middle" font-family="Georgia, serif">${escapeText(symbol)}</text>
  <text x="360" y="566" fill="#fff3d8" font-size="58" text-anchor="middle" font-family="Georgia, serif">${escapeText(numeral)}</text>
  <text x="360" y="900" fill="#fff4dc" font-size="42" text-anchor="middle" font-family="Georgia, serif">${escapeText(titleEn)}</text>
  <text x="360" y="958" fill="#d9c7a0" font-size="32" text-anchor="middle" font-family="'Microsoft YaHei', 'Noto Sans SC', sans-serif">${escapeText(titleZh)}</text>
  <g fill="#d4b06a" fill-opacity="0.6">
    <circle cx="360" cy="84" r="4"/>
    <circle cx="360" cy="1116" r="4"/>
    <circle cx="84" cy="600" r="4"/>
    <circle cx="636" cy="600" r="4"/>
  </g>
</svg>`;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  for (const [id, titleEn, titleZh, numeral, symbol] of majorCards) {
    const svg = createSvg({
      titleEn,
      titleZh,
      subtitle: 'MAJOR ARCANA',
      accent: '#d4b06a',
      symbol,
      numeral,
    });
    await fs.writeFile(path.join(outputDir, `${id}.svg`), svg, 'utf8');
  }

  for (const suit of suits) {
    for (const [rankId, rankEn, rankZh] of ranks) {
      const id = `minor-${suit.id}-${rankId}`;
      const svg = createSvg({
        titleEn: `${rankEn} of ${suit.en}`,
        titleZh: `${suit.zh}${rankZh}`,
        subtitle: suit.en.toUpperCase(),
        accent: suit.accent,
        symbol: suit.symbol,
        numeral: rankEn.toUpperCase(),
      });
      await fs.writeFile(path.join(outputDir, `${id}.svg`), svg, 'utf8');
    }
  }

  console.log(`Generated tarot card assets in ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
