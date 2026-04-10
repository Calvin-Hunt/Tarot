import type { LanguageCode, QuestionCategoryId, SpreadId, ThemeId } from '@/types/reading';
import type { LocalizedTextValue } from '@/types/i18n';

type TranslationKey =
  | 'mode.mystic'
  | 'mode.minimal'
  | 'sound.on'
  | 'sound.off'
  | 'guest'
  | 'hero.subtitle'
  | 'hero.eyebrow'
  | 'hero.titleLead'
  | 'hero.titleAccent'
  | 'hero.description'
  | 'hero.start'
  | 'hero.library'
  | 'studio.eyebrow'
  | 'studio.title'
  | 'studio.description'
  | 'zodiac.title'
  | 'zodiac.heading'
  | 'zodiac.description'
  | 'question.title'
  | 'question.heading'
  | 'theme.title'
  | 'theme.heading'
  | 'share.title'
  | 'share.heading'
  | 'share.button'
  | 'share.export'
  | 'share.exported'
  | 'share.shared'
  | 'share.copied'
  | 'share.zodiacLens'
  | 'account.title'
  | 'account.heading'
  | 'account.local'
  | 'account.logout'
  | 'account.synced'
  | 'account.login'
  | 'account.register'
  | 'account.displayName'
  | 'account.email'
  | 'account.password'
  | 'account.enter'
  | 'account.create'
  | 'history.title'
  | 'history.heading'
  | 'history.synced'
  | 'history.local'
  | 'history.empty'
  | 'shuffle.title'
  | 'shuffle.heading'
  | 'shuffle.description'
  | 'shuffle.begin'
  | 'shuffle.loading'
  | 'reading.title'
  | 'reading.emptyHeading'
  | 'reading.emptyDesc'
  | 'reading.drawn'
  | 'reading.allRevealed'
  | 'reading.revealing'
  | 'result.core'
  | 'result.position'
  | 'result.overlay'
  | 'result.save'
  | 'result.saved'
  | 'library.title'
  | 'library.heading'
  | 'library.description'
  | 'spotlight.title'
  | 'spotlight.close'
  | 'spotlight.arcanaMajor'
  | 'spotlight.arcanaMinor'
  | 'spotlight.essence'
  | 'spotlight.upright'
  | 'spotlight.reversed'
  | 'spotlight.number'
  | 'spotlight.element'
  | 'spotlight.zodiac'
  | 'moon.description'
  | 'pulse.line1'
  | 'pulse.line2'
  | 'language.en'
  | 'language.zh';

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    'mode.mystic': 'Mystic Mode',
    'mode.minimal': 'Minimal Mode',
    'sound.on': 'Sound On',
    'sound.off': 'Sound Off',
    'guest': 'Guest Ritual',
    'hero.subtitle': 'Web Tarot and Zodiac Ritual System',
    'hero.eyebrow': 'Mystic Ritual Interface',
    'hero.titleLead': 'Light the question with',
    'hero.titleAccent': 'a ritualized tarot draw.',
    'hero.description':
      'Tarot cards, zodiac bias and cinematic interface language are combined into a complete web reading flow. This is not a demo page. It is a maintainable product foundation with clear data, state, reading logic and polished interaction.',
    'hero.start': 'Start Reading',
    'hero.library': 'View Library',
    'studio.eyebrow': 'Ritual Studio',
    'studio.title': 'Spreads, zodiac, account state and exports now live in one flow.',
    'studio.description':
      'This studio supports local backend sync, saved cards, multiple spread templates, question category guidance, configurable visual themes and exportable result cards.',
    'zodiac.title': 'Zodiac Lens',
    'zodiac.heading': 'Choose your zodiac emphasis',
    'zodiac.description': 'Zodiac only adjusts the tone of the interpretation. It never replaces the tarot meaning itself.',
    'question.title': 'Question Lens',
    'question.heading': 'Choose the reading category',
    'theme.title': 'Theme System',
    'theme.heading': 'Constellation Themes',
    'share.title': 'Share Output',
    'share.heading': 'Exportable result card',
    'share.button': 'Share',
    'share.export': 'Export PNG',
    'share.exported': 'PNG exported',
    'share.shared': 'Shared',
    'share.copied': 'Share text copied',
    'share.zodiacLens': 'zodiac lens',
    'account.title': 'Account Ritual',
    'account.heading': 'Local API Sign In',
    'account.local': 'Local API Sign In',
    'account.logout': 'Logout',
    'account.synced': 'Your reading archive and saved cards now sync to the configured backend service.',
    'account.login': 'Login',
    'account.register': 'Register',
    'account.displayName': 'Display name',
    'account.email': 'Email',
    'account.password': 'Password',
    'account.enter': 'Enter Archive',
    'account.create': 'Create Account',
    'history.title': 'Recent Draws',
    'history.heading': 'Reading Archive',
    'history.synced': 'Synced with backend archive',
    'history.local': 'Stored locally until you sign in',
    'history.empty': 'No readings yet. Complete a shuffle and your archive will begin to fill here.',
    'shuffle.title': 'Shuffle Ritual',
    'shuffle.heading': 'Shuffle and call the current spread',
    'shuffle.description':
      'Current spread: {spread}. Shuffling uses a Fisher-Yates random shuffle, cards do not repeat inside the same spread, and upright or reversed orientation is randomized independently.',
    'shuffle.begin': 'Begin Shuffle',
    'shuffle.loading': 'Shuffling...',
    'reading.title': 'Reading Result',
    'reading.emptyHeading': 'No active reading yet',
    'reading.emptyDesc':
      'Choose a spread and zodiac lens, then finish the shuffle ritual. The result panel separates tarot meaning, positional interpretation and the {zodiac} overlay.',
    'reading.drawn': 'Drawn Spread',
    'reading.allRevealed': 'All cards revealed',
    'reading.revealing': 'Revealing {current} / {total}',
    'result.core': 'Core Meaning',
    'result.position': 'Positional Reading',
    'result.overlay': '{zodiac} Overlay',
    'result.save': 'Save',
    'result.saved': 'Saved',
    'library.title': 'Tarot Library',
    'library.heading': 'Major Arcana Preview',
    'library.description':
      'Click any card to open a dedicated high-resolution spotlight view. Deck image URLs live in the data layer, so the visual system can be swapped later without changing components.',
    'spotlight.title': 'Card Spotlight',
    'spotlight.close': 'Close',
    'spotlight.arcanaMajor': 'Major Arcana',
    'spotlight.arcanaMinor': 'Minor Arcana',
    'spotlight.essence': 'Short Essence',
    'spotlight.upright': 'Upright',
    'spotlight.reversed': 'Reversed',
    'spotlight.number': 'Number',
    'spotlight.element': 'Element',
    'spotlight.zodiac': 'Zodiac Link',
    'moon.description': 'A good night for slow, precise questions that let feeling and direction settle into the same rhythm.',
    'pulse.line1': 'Daily astrology placeholder: tonight favors observation over reaction. Let the emotional weather reveal itself before forcing an answer.',
    'pulse.line2': 'Before drawing, narrow the reading to one honest concern instead of a cluster of mixed anxieties.',
    'language.en': 'EN',
    'language.zh': '中文',
  },
  zh: {
    'mode.mystic': '神秘模式',
    'mode.minimal': '极简模式',
    'sound.on': '音效开启',
    'sound.off': '音效关闭',
    'guest': '访客仪式',
    'hero.subtitle': '网页版塔罗牌与星座仪式系统',
    'hero.eyebrow': '神秘仪式界面',
    'hero.titleLead': '为你的问题点亮',
    'hero.titleAccent': '一场有仪式感的塔罗抽牌。',
    'hero.description':
      '把塔罗、星座倾向和电影感交互语言整合成完整的网页解读流程。这不是课堂 demo，而是一套可以继续维护和扩展的正式产品骨架。',
    'hero.start': '开始抽牌',
    'hero.library': '查看牌库',
    'studio.eyebrow': '仪式工作台',
    'studio.title': '牌阵、星座、账号状态与结果导出已整合为一条完整流程。',
    'studio.description': '当前工作台支持后端同步、卡牌收藏、多种牌阵模板、问题分类引导、可配置主题和结果导出。',
    'zodiac.title': '星座视角',
    'zodiac.heading': '选择你的星座增强',
    'zodiac.description': '星座只会调整解读语气，不会替代塔罗本身的牌义。',
    'question.title': '问题分类',
    'question.heading': '选择本次解读的问题方向',
    'theme.title': '主题系统',
    'theme.heading': '星象主题',
    'share.title': '分享导出',
    'share.heading': '可导出的结果卡片',
    'share.button': '分享',
    'share.export': '导出 PNG',
    'share.exported': 'PNG 已导出',
    'share.shared': '已分享',
    'share.copied': '分享文案已复制',
    'share.zodiacLens': '星座视角',
    'account.title': '账号仪式',
    'account.heading': '接入本地或线上 API',
    'account.local': '接入账号系统',
    'account.logout': '退出登录',
    'account.synced': '你的解读历史和收藏卡牌会同步到当前配置的后端服务。',
    'account.login': '登录',
    'account.register': '注册',
    'account.displayName': '显示名称',
    'account.email': '邮箱',
    'account.password': '密码',
    'account.enter': '进入档案',
    'account.create': '创建账号',
    'history.title': '最近抽牌',
    'history.heading': '解读档案',
    'history.synced': '已与后端档案同步',
    'history.local': '登录前仅保存在本地',
    'history.empty': '还没有抽牌记录。完成一次洗牌后，这里会开始累积你的解读档案。',
    'shuffle.title': '洗牌仪式',
    'shuffle.heading': '洗牌并召唤当前牌阵',
    'shuffle.description': '当前牌阵：{spread}。洗牌使用 Fisher-Yates 真随机打乱，同一牌阵内不会重复抽牌，且正位与逆位独立随机。',
    'shuffle.begin': '开始洗牌',
    'shuffle.loading': '洗牌中...',
    'reading.title': '解读结果',
    'reading.emptyHeading': '当前还没有激活解读',
    'reading.emptyDesc': '先选择牌阵和星座视角，再完成洗牌。结果面板会分开展示塔罗牌义、位置解读，以及 {zodiac} 的增强说明。',
    'reading.drawn': '已抽牌阵',
    'reading.allRevealed': '全部卡牌已揭示',
    'reading.revealing': '正在揭示 {current} / {total}',
    'result.core': '基础牌义',
    'result.position': '位置解读',
    'result.overlay': '{zodiac} 增强',
    'result.save': '收藏',
    'result.saved': '已收藏',
    'library.title': '塔罗牌库',
    'library.heading': '大阿尔卡那预览',
    'library.description': '点击任意卡牌即可打开高清聚焦视图。牌图 URL 已经放在数据层，后续替换整套视觉资源时不需要重写组件。',
    'spotlight.title': '卡牌聚焦',
    'spotlight.close': '关闭',
    'spotlight.arcanaMajor': '大阿尔卡那',
    'spotlight.arcanaMinor': '小阿尔卡那',
    'spotlight.essence': '卡牌气质',
    'spotlight.upright': '正位',
    'spotlight.reversed': '逆位',
    'spotlight.number': '编号',
    'spotlight.element': '元素',
    'spotlight.zodiac': '星象关联',
    'moon.description': '今夜适合提出缓慢而精确的问题，让情绪与方向回到同一节律。',
    'pulse.line1': '今日星象提示：今晚更适合观察而不是立刻反应，先让内在天气显形，再去寻找答案。',
    'pulse.line2': '开始抽牌前，把问题收束成一个诚实的核心，而不是一团混杂的焦虑。',
    'language.en': 'EN',
    'language.zh': '中文',
  },
};

const spreadNames: Record<LanguageCode, Partial<Record<SpreadId, string>>> = {
  en: {},
  zh: {
    single: '单张牌',
    'three-card': '过去 / 现在 / 未来',
    'celtic-cross-lite': '凯尔特十字简化版',
    'relationship-mirror': '关系镜像',
    'decision-path': '抉择路径',
    'lunar-cycle': '月相周期',
  },
};

const themeNames: Record<LanguageCode, Partial<Record<ThemeId, string>>> = {
  en: {},
  zh: {
    'mystic-nocturne': '神秘夜曲',
    'solar-velvet': '日焰天鹅绒',
    'lunar-ivory': '月白象牙',
  },
};

const questionNames: Record<LanguageCode, Partial<Record<QuestionCategoryId, string>>> = {
  en: {},
  zh: {
    general: '总体澄清',
    love: '情感关系',
    career: '事业方向',
    healing: '疗愈修复',
    shadow: '阴影工作',
    creativity: '创作能量',
  },
};

const zodiacNames: Record<LanguageCode, Record<string, string>> = {
  en: {},
  zh: {
    aries: '白羊座',
    taurus: '金牛座',
    gemini: '双子座',
    cancer: '巨蟹座',
    leo: '狮子座',
    virgo: '处女座',
    libra: '天秤座',
    scorpio: '天蝎座',
    sagittarius: '射手座',
    capricorn: '摩羯座',
    aquarius: '水瓶座',
    pisces: '双鱼座',
  },
};

const positionLabels: Record<LanguageCode, Record<string, string>> = {
  en: {
    guidance: 'Guidance',
    past: 'Past',
    present: 'Present',
    future: 'Future',
    heart: 'Core',
    challenge: 'Challenge',
    foundation: 'Foundation',
    crown: 'Crown',
    'near-future': 'Near Future',
    self: 'You',
    other: 'Other',
    bridge: 'Bridge',
    fracture: 'Friction',
    potential: 'Potential',
    current: 'Current Path',
    'option-a': 'Option A',
    'option-b': 'Option B',
    wisdom: 'Wisdom',
    'new-moon': 'New Moon',
    waxing: 'Waxing',
    'full-moon': 'Full Moon',
    waning: 'Waning',
  },
  zh: {
    guidance: '指引',
    past: '过去',
    present: '现在',
    future: '未来',
    heart: '核心',
    challenge: '挑战',
    foundation: '基础',
    crown: '意识层',
    'near-future': '近期发展',
    self: '你',
    other: '对方',
    bridge: '连接',
    fracture: '摩擦',
    potential: '潜能',
    current: '当前路径',
    'option-a': '选项 A',
    'option-b': '选项 B',
    wisdom: '智慧',
    'new-moon': '新月',
    waxing: '盈月阶段',
    'full-moon': '满月',
    waning: '亏月阶段',
  },
};

const positionIntentions: Record<LanguageCode, Record<string, string>> = {
  en: {
    guidance: 'The central message most ready to be seen.',
    past: 'The prior force or condition that brought the present into being.',
    present: 'The immediate energy currently defining the situation.',
    future: 'The direction or pattern already beginning to form.',
    heart: 'The living heart of the issue and the energy at its center.',
    challenge: 'The friction, tension or obstacle shaping the situation.',
    foundation: 'The hidden root, emotional base or unseen cause.',
    crown: 'Your conscious aim, hope or known mental framing.',
    'near-future': 'The most immediate development coming into motion.',
    self: 'Your current stance, need or emotional position in the connection.',
    other: 'The other side of the bond as it currently presents itself.',
    bridge: 'What connects, attracts or attempts to hold the bond together.',
    fracture: 'The pattern that destabilizes trust, clarity or rhythm.',
    potential: 'What may emerge if the current pattern continues with awareness.',
    current: 'What defines the present route if nothing changes.',
    'option-a': 'The likely tone and demand of the first viable direction.',
    'option-b': 'The likely tone and demand of the second viable direction.',
    wisdom: 'The deeper principle that should guide the final choice.',
    'new-moon': 'The seed, intention or inner pull beginning now.',
    waxing: 'What grows through effort, attention and repetition.',
    'full-moon': 'What reaches visibility, fullness or emotional climax.',
    waning: 'What should be released, softened or allowed to leave.',
  },
  zh: {
    guidance: '此刻最需要被看见的核心信息。',
    past: '把现在带到眼前的过去力量与条件。',
    present: '当下正在定义局势的即时能量。',
    future: '已经开始成形的下一步方向与模式。',
    heart: '问题真正的核心，以及它中心处的活性能量。',
    challenge: '塑造局势的摩擦、张力与障碍。',
    foundation: '隐藏的根源、情绪基础或未被看见的原因。',
    crown: '你当前清楚意识到的目标、希望或认知框架。',
    'near-future': '最先进入现实推进的近期变化。',
    self: '你在这段关系里的立场、需要与情绪位置。',
    other: '关系另一端此刻呈现出的状态。',
    bridge: '连接彼此、吸引彼此或维系关系的能量。',
    fracture: '削弱信任、清晰度和节奏的模式。',
    potential: '如果带着觉察继续走下去，关系可能发展出的方向。',
    current: '如果不做改变，当前这条路径将如何继续。',
    'option-a': '第一个可行方向会带来的氛围与要求。',
    'option-b': '第二个可行方向会带来的氛围与要求。',
    wisdom: '最终做决定时最应遵循的深层原则。',
    'new-moon': '正在萌发的种子、意图或内在牵引。',
    waxing: '通过投入、关注与重复而逐渐成长的部分。',
    'full-moon': '走向显现、饱满或情绪高潮的部分。',
    waning: '应该被释放、放软或允许离开的内容。',
  },
};

export function t(language: LanguageCode, key: TranslationKey, params?: Record<string, string | number>): string {
  let result = translations[language][key] ?? translations.en[key] ?? key;
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      result = result.replace(`{${paramKey}}`, String(value));
    });
  }
  return result;
}

export function translateSpreadName(language: LanguageCode, spreadId: SpreadId, fallback: string): string {
  return spreadNames[language][spreadId] ?? fallback;
}

export function translateThemeName(language: LanguageCode, themeId: ThemeId, fallback: string): string {
  return themeNames[language][themeId] ?? fallback;
}

export function translateQuestionName(language: LanguageCode, questionId: QuestionCategoryId, fallback: string): string {
  return questionNames[language][questionId] ?? fallback;
}

export function translateZodiacName(language: LanguageCode, zodiacId: string, fallback: LocalizedTextValue | string): string {
  if (zodiacNames[language][zodiacId]) {
    return zodiacNames[language][zodiacId];
  }
  if (typeof fallback === 'string') {
    return fallback;
  }
  return fallback[language] ?? fallback.en;
}

export function translatePositionLabel(language: LanguageCode, positionKey: string, fallback: string): string {
  return positionLabels[language][positionKey] ?? fallback;
}

export function translatePositionIntention(language: LanguageCode, positionKey: string, fallback: string): string {
  return positionIntentions[language][positionKey] ?? fallback;
}
