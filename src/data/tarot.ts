import type { TarotCard, TarotElement, TarotSuit } from '@/types/tarot';

const commonsFileBase = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
const commonsImageWidth = 480;

const majorArcanaCommonsFiles: Record<string, string> = {
  'major-fool': 'RWS Tarot 00 Fool.jpg',
  'major-magician': 'RWS Tarot 01 Magician.jpg',
  'major-high-priestess': 'RWS Tarot 02 High Priestess.jpg',
  'major-empress': 'RWS Tarot 03 Empress.jpg',
  'major-emperor': 'RWS Tarot 04 Emperor.jpg',
  'major-hierophant': 'RWS Tarot 05 Hierophant.jpg',
  'major-lovers': 'RWS Tarot 06 Lovers.jpg',
  'major-chariot': 'RWS Tarot 07 Chariot.jpg',
  'major-strength': 'RWS Tarot 08 Strength.jpg',
  'major-hermit': 'RWS Tarot 09 Hermit.jpg',
  'major-wheel-of-fortune': 'RWS Tarot 10 Wheel of Fortune.jpg',
  'major-justice': 'RWS Tarot 11 Justice.jpg',
  'major-hanged-man': 'RWS Tarot 12 Hanged Man.jpg',
  'major-death': 'RWS Tarot 13 Death.jpg',
  'major-temperance': 'RWS Tarot 14 Temperance.jpg',
  'major-devil': 'RWS Tarot 15 Devil.jpg',
  'major-tower': 'RWS Tarot 16 Tower.jpg',
  'major-star': 'RWS Tarot 17 Star.jpg',
  'major-moon': 'RWS Tarot 18 Moon.jpg',
  'major-sun': 'RWS Tarot 19 Sun.jpg',
  'major-judgement': 'RWS Tarot 20 Judgement.jpg',
  'major-world': 'RWS Tarot 21 World.jpg',
};

const rankNumberMap: Record<string, string> = {
  ace: '01',
  two: '02',
  three: '03',
  four: '04',
  five: '05',
  six: '06',
  seven: '07',
  eight: '08',
  nine: '09',
  ten: '10',
  page: '11',
  knight: '12',
  queen: '13',
  king: '14',
};

function commonsCardImage(filename: string): string {
  return `${commonsFileBase}${encodeURIComponent(filename)}?width=${commonsImageWidth}`;
}

function minorArcanaCommonsFile(cardId: string): string | null {
  const [, suit, rank] = cardId.split('-');
  const rankNumber = rankNumberMap[rank];

  if (!suit || !rankNumber) {
    return null;
  }

  if (suit === 'wands' && rank === 'nine') {
    return 'Tarot Nine of Wands.jpg';
  }

  const suitPrefixes: Record<string, string> = {
    cups: 'Cups',
    swords: 'Swords',
    pentacles: 'Pents',
    wands: 'Wands',
  };

  const prefix = suitPrefixes[suit];

  return prefix ? `${prefix}${rankNumber}.jpg` : null;
}

function localCardImage(cardId: string): string {
  const commonsFile = majorArcanaCommonsFiles[cardId] ?? minorArcanaCommonsFile(cardId);

  return commonsFile ? commonsCardImage(commonsFile) : `/cards/${cardId}.svg`;
}

type MajorArcanaSeed = {
  id: string;
  name: { en: string; zh: string };
  number: number;
  element: TarotElement;
  upright: { en: string[]; zh: string[] };
  reversed: { en: string[]; zh: string[] };
  meaningUp: { en: string; zh: string };
  meaningReversed: { en: string; zh: string };
  zodiac: string[];
  short: { en: string; zh: string };
};

const majorArcanaSeeds: MajorArcanaSeed[] = [
  { id: 'fool', name: { en: 'The Fool', zh: '愚者' }, number: 0, element: 'air', upright: { en: ['beginning', 'trust', 'openness', 'risk'], zh: ['开端', '信任', '敞开', '冒险'] }, reversed: { en: ['recklessness', 'avoidance', 'naivety', 'scatter'], zh: ['莽撞', '逃避', '天真失衡', '分散'] }, meaningUp: { en: 'The Fool marks the threshold of a new experience and asks for trust in the unknown.', zh: '愚者象征一段新旅程的门槛，提醒你带着信任走向未知。' }, meaningReversed: { en: 'Reversed, The Fool warns against impulsive movement without enough grounding or awareness.', zh: '逆位的愚者提醒你，不要在缺乏判断和落地感时仓促行动。' }, zodiac: ['uranus'], short: { en: 'A threshold card for fresh starts, innocence and living possibility.', zh: '一张关于全新开始、纯真和可能性的门槛之牌。' } },
  { id: 'magician', name: { en: 'The Magician', zh: '魔术师' }, number: 1, element: 'air', upright: { en: ['focus', 'will', 'resource', 'manifestation'], zh: ['专注', '意志', '资源', '显化'] }, reversed: { en: ['manipulation', 'misdirection', 'friction', 'wasted potential'], zh: ['操控', '误导', '阻滞', '潜能浪费'] }, meaningUp: { en: 'The Magician indicates that the required tools are already present and ready to be directed with skill.', zh: '魔术师说明你需要的工具已经在手，关键在于如何有意识地运用。' }, meaningReversed: { en: 'Reversed, this card points to scattered power, unclear intent or performance without substance.', zh: '逆位时，它指出力量分散、动机不清，或只是表面上的施展。' }, zodiac: ['mercury'], short: { en: 'The channel between idea and material expression.', zh: '连接想法与现实表达的通道。' } },
  { id: 'high-priestess', name: { en: 'The High Priestess', zh: '女祭司' }, number: 2, element: 'water', upright: { en: ['intuition', 'silence', 'mystery', 'inner knowing'], zh: ['直觉', '沉静', '神秘', '内在知晓'] }, reversed: { en: ['withdrawal', 'blocked intuition', 'suppression', 'uncertainty'], zh: ['封闭', '直觉受阻', '压抑', '不确定'] }, meaningUp: { en: 'The High Priestess turns attention inward and suggests that what is hidden is still active and meaningful.', zh: '女祭司让注意力回到内在，说明隐而未现之事依然在发挥作用。' }, meaningReversed: { en: 'Reversed, this card often reflects a refusal to trust inner truth or a feeling you have not yet named.', zh: '逆位时，这张牌常常表示你没有真正信任自己的内在感受。' }, zodiac: ['moon'], short: { en: 'The keeper of stillness, instinct and hidden knowledge.', zh: '守护静默、直觉与隐秘知识的牌。' } },
  { id: 'empress', name: { en: 'The Empress', zh: '皇后' }, number: 3, element: 'earth', upright: { en: ['nurture', 'abundance', 'sensuality', 'growth'], zh: ['滋养', '丰盛', '感受力', '成长'] }, reversed: { en: ['overgiving', 'stagnation', 'smothering', 'depletion'], zh: ['过度付出', '停滞', '窒息式照料', '耗竭'] }, meaningUp: { en: 'The Empress supports growth, nourishment and the conditions that help something thrive.', zh: '皇后支持成长、滋养与丰沛，她让一件事拥有真正繁盛的条件。' }, meaningReversed: { en: 'Reversed, she warns against overextension, indulgence or creating from depletion instead of fullness.', zh: '逆位时，她提醒你不要在匮乏和耗损中继续勉强输出。' }, zodiac: ['venus'], short: { en: 'Creative fertility, comfort and embodied abundance.', zh: '关于创造、舒适与具身丰盛的牌。' } },
  { id: 'emperor', name: { en: 'The Emperor', zh: '皇帝' }, number: 4, element: 'fire', upright: { en: ['structure', 'authority', 'boundaries', 'order'], zh: ['结构', '权威', '边界', '秩序'] }, reversed: { en: ['rigidity', 'control', 'domination', 'inflexibility'], zh: ['僵化', '控制', '支配', '缺乏弹性'] }, meaningUp: { en: 'The Emperor establishes form, leadership and the framework needed to make a vision hold.', zh: '皇帝建立结构、边界与执行秩序，使愿景真正落地。' }, meaningReversed: { en: 'Reversed, structure becomes control, order becomes fear and stability turns into hard resistance.', zh: '逆位时，结构会滑向控制，稳定会滑向恐惧和僵硬。' }, zodiac: ['aries'], short: { en: 'A sovereign card for structure, discipline and command.', zh: '关于结构、纪律与掌控力的主权之牌。' } },
  { id: 'hierophant', name: { en: 'The Hierophant', zh: '教皇' }, number: 5, element: 'earth', upright: { en: ['teaching', 'tradition', 'ritual', 'transmission'], zh: ['教导', '传统', '仪式', '传承'] }, reversed: { en: ['dogma', 'empty rules', 'rebellion', 'alienation'], zh: ['教条', '空规则', '反叛', '疏离'] }, meaningUp: { en: 'The Hierophant represents a tested system, lineage or teaching that provides orientation.', zh: '教皇代表可供依循的体系、传统或被验证过的智慧。' }, meaningReversed: { en: 'Reversed, it questions whether the form still holds truth or if obedience has replaced meaning.', zh: '逆位时，它追问形式是否仍然承载真实，而非只剩下服从。' }, zodiac: ['taurus'], short: { en: 'The ritual gatekeeper of knowledge, order and inherited wisdom.', zh: '守门于知识、秩序与传统智慧的仪式之牌。' } },
  { id: 'lovers', name: { en: 'The Lovers', zh: '恋人' }, number: 6, element: 'air', upright: { en: ['choice', 'union', 'alignment', 'devotion'], zh: ['选择', '联结', '一致', '投入'] }, reversed: { en: ['division', 'misalignment', 'ambivalence', 'avoidance'], zh: ['分离', '不一致', '摇摆', '回避'] }, meaningUp: { en: 'The Lovers speaks to truthful choice and the alignment of desire, value and intimacy.', zh: '恋人讲的是诚实的选择，以及欲望、价值和关系之间的统一。' }, meaningReversed: { en: 'Reversed, the split may not be external at all but rooted in internal contradiction.', zh: '逆位时，真正的分裂往往源自内在价值与欲望的不一致。' }, zodiac: ['gemini'], short: { en: 'A card of attraction, values and the cost of true choice.', zh: '关于吸引、价值与真实选择代价的牌。' } },
  { id: 'chariot', name: { en: 'The Chariot', zh: '战车' }, number: 7, element: 'water', upright: { en: ['drive', 'direction', 'mastery', 'victory'], zh: ['驱动力', '方向', '掌控', '胜利'] }, reversed: { en: ['conflict', 'overforce', 'drift', 'loss of control'], zh: ['冲突', '用力过猛', '漂移', '失控'] }, meaningUp: { en: 'The Chariot gathers divided forces and drives them toward one determined direction.', zh: '战车把分散的力量收拢起来，朝着一个明确方向推进。' }, meaningReversed: { en: 'Reversed, the will is strong but not integrated, creating force without clear alignment.', zh: '逆位时，意志虽强，但内部并未整合，于是只剩蛮力。' }, zodiac: ['cancer'], short: { en: 'Movement through discipline, nerve and directed energy.', zh: '凭借纪律、意志与方向感前进的牌。' } },
  { id: 'strength', name: { en: 'Strength', zh: '力量' }, number: 8, element: 'fire', upright: { en: ['courage', 'tender power', 'endurance', 'heart'], zh: ['勇气', '柔性力量', '耐力', '真心'] }, reversed: { en: ['fragility', 'self-doubt', 'exhaustion', 'misused force'], zh: ['脆弱', '自我怀疑', '疲惫', '力量误用'] }, meaningUp: { en: 'Strength shows mastery through calm, steady compassion rather than domination.', zh: '力量强调以稳定、温柔而坚定的方式完成掌控，而非压制。' }, meaningReversed: { en: 'Reversed, it often marks fatigue, hidden fear or the misuse of force where gentleness is needed.', zh: '逆位时，它常指出疲惫、隐秘的恐惧，或该柔和时却过于用力。' }, zodiac: ['leo'], short: { en: 'Soft power, grounded courage and self-possession.', zh: '柔韧的力量、沉着的勇气与自我掌握。' } },
  { id: 'hermit', name: { en: 'The Hermit', zh: '隐者' }, number: 9, element: 'earth', upright: { en: ['withdrawal', 'wisdom', 'search', 'inner light'], zh: ['独处', '智慧', '探寻', '内在之光'] }, reversed: { en: ['isolation', 'avoidance', 'overanalysis', 'distance'], zh: ['孤立', '逃避', '过度分析', '疏离'] }, meaningUp: { en: 'The Hermit creates sacred distance so truth can become visible without noise.', zh: '隐者通过拉开距离，让你在安静里看见真正的答案。' }, meaningReversed: { en: 'Reversed, solitude may harden into disconnection or excessive inward looping.', zh: '逆位时，独处可能已经变成封闭和原地打转。' }, zodiac: ['virgo'], short: { en: 'A lamp in the dark for introspection and quiet truth.', zh: '为内省与静默真相点亮的一盏灯。' } },
  { id: 'wheel-of-fortune', name: { en: 'Wheel of Fortune', zh: '命运之轮' }, number: 10, element: 'fire', upright: { en: ['turning point', 'cycle', 'timing', 'destiny'], zh: ['转折', '循环', '时机', '命运'] }, reversed: { en: ['stagnation', 'bad timing', 'resistance', 'repeat loop'], zh: ['停滞', '时机不顺', '抗拒', '重复循环'] }, meaningUp: { en: 'Wheel of Fortune announces movement in the cycle and a shift in timing or fate.', zh: '命运之轮意味着周期正在转动，时机与走向都在发生变化。' }, meaningReversed: { en: 'Reversed, it can feel as if the wheel is delayed, resisted or looping through the same lesson.', zh: '逆位时，你像被卡在旧循环里，同样的课题迟迟没有过去。' }, zodiac: ['jupiter'], short: { en: 'The living mechanism of change, timing and return.', zh: '关于变化、时机与回返的动态之轮。' } },
  { id: 'justice', name: { en: 'Justice', zh: '正义' }, number: 11, element: 'air', upright: { en: ['truth', 'balance', 'decision', 'accountability'], zh: ['真实', '平衡', '裁决', '承担'] }, reversed: { en: ['bias', 'evasion', 'imbalance', 'distortion'], zh: ['偏颇', '逃避', '失衡', '扭曲'] }, meaningUp: { en: 'Justice asks for clear assessment, ethical proportion and honest consequence.', zh: '正义要求清晰判断、公平衡量，以及对结果的诚实承担。' }, meaningReversed: { en: 'Reversed, truth may be bent by fear, avoidance or refusal to face the real terms.', zh: '逆位时，真实可能被恐惧或逃避扭曲。' }, zodiac: ['libra'], short: { en: 'The blade and scale of truth, accountability and proportion.', zh: '衡量真实、责任与分寸的天平之牌。' } },
  { id: 'hanged-man', name: { en: 'The Hanged Man', zh: '倒吊人' }, number: 12, element: 'water', upright: { en: ['pause', 'surrender', 'reversal', 'insight'], zh: ['暂停', '臣服', '反转', '洞见'] }, reversed: { en: ['delay', 'stuckness', 'martyrdom', 'resistance'], zh: ['拖延', '卡住', '受害姿态', '抗拒'] }, meaningUp: { en: 'The Hanged Man is an intentional pause that creates new perspective through release.', zh: '倒吊人是一种有意识的停顿，通过放下而获得新的视角。' }, meaningReversed: { en: 'Reversed, it suggests the pause has become a trap or a refusal to let go.', zh: '逆位时，这种停顿可能已经变成僵局，或意味着你迟迟不肯松手。' }, zodiac: ['neptune'], short: { en: 'Suspension that changes seeing before it changes motion.', zh: '先改变看法，再改变行动的悬置之牌。' } },
  { id: 'death', name: { en: 'Death', zh: '死神' }, number: 13, element: 'water', upright: { en: ['ending', 'transformation', 'closure', 'renewal'], zh: ['结束', '蜕变', '关闭旧章', '新生'] }, reversed: { en: ['avoidance', 'lingering', 'stagnation', 'refusal to change'], zh: ['逃避结束', '拖延', '停滞', '拒绝改变'] }, meaningUp: { en: 'Death closes what is complete so new life can emerge without distortion.', zh: '死神结束已经完成的阶段，好让新的生命力腾出空间。' }, meaningReversed: { en: 'Reversed, the ending is still necessary but something keeps clinging to what has expired.', zh: '逆位时，结束仍是必要的，只是你还抓着早已过期的东西。' }, zodiac: ['scorpio'], short: { en: 'The stark mercy of ending, release and rebirth.', zh: '关于结束、释放与重生的冷峻慈悲。' } },
  { id: 'temperance', name: { en: 'Temperance', zh: '节制' }, number: 14, element: 'fire', upright: { en: ['balance', 'healing', 'blending', 'rhythm'], zh: ['平衡', '疗愈', '调和', '节律'] }, reversed: { en: ['extremes', 'disorder', 'imbalance', 'poor pacing'], zh: ['走极端', '混乱', '失衡', '节奏不当'] }, meaningUp: { en: 'Temperance restores flow by mixing opposites into a workable, living rhythm.', zh: '节制通过调和相反力量，让事物重新回到流动与节律中。' }, meaningReversed: { en: 'Reversed, the message concerns excess, poor pacing or a loss of healthy proportion.', zh: '逆位时，它提醒你正处在失衡、过量或节奏失控之中。' }, zodiac: ['sagittarius'], short: { en: 'Alchemy, healing and the art of wise proportion.', zh: '关于炼金、疗愈与分寸感的牌。' } },
  { id: 'devil', name: { en: 'The Devil', zh: '恶魔' }, number: 15, element: 'earth', upright: { en: ['bondage', 'desire', 'shadow', 'attachment'], zh: ['束缚', '欲望', '阴影', '执着'] }, reversed: { en: ['release', 'detachment', 'truth', 'liberation'], zh: ['松绑', '抽离', '看清', '解放'] }, meaningUp: { en: 'The Devil reveals dependence, fixation or patterns that promise pleasure but narrow freedom.', zh: '恶魔揭示那些看似带来快感、实则缩小自由的依附与模式。' }, meaningReversed: { en: 'Reversed, the chains weaken when the pattern is finally named and owned.', zh: '逆位时，枷锁开始松动，因为你终于看见并承认了问题。' }, zodiac: ['capricorn'], short: { en: 'A mirror for appetite, fear and entanglement.', zh: '映照欲望、恐惧与纠缠的镜子。' } },
  { id: 'tower', name: { en: 'The Tower', zh: '高塔' }, number: 16, element: 'fire', upright: { en: ['rupture', 'shock', 'collapse', 'revelation'], zh: ['崩裂', '震荡', '倒塌', '显露真相'] }, reversed: { en: ['delayed collapse', 'internal crisis', 'resistance', 'contained shock'], zh: ['延迟崩塌', '内在危机', '抗拒', '压抑震荡'] }, meaningUp: { en: 'The Tower breaks false stability so the truth can no longer be postponed.', zh: '高塔打碎虚假的稳定，让真相再也无法被拖延。' }, meaningReversed: { en: 'Reversed, the collapse may be quieter or delayed, but the structural truth remains unavoidable.', zh: '逆位时，崩塌也许更安静，但结构性问题依旧无法回避。' }, zodiac: ['mars'], short: { en: 'A lightning strike to illusion, denial and brittle forms.', zh: '劈向幻象、否认与脆弱结构的一道闪电。' } },
  { id: 'star', name: { en: 'The Star', zh: '星星' }, number: 17, element: 'air', upright: { en: ['hope', 'healing', 'clarity', 'faith'], zh: ['希望', '疗愈', '清明', '信念'] }, reversed: { en: ['doubt', 'discouragement', 'distance', 'faint light'], zh: ['怀疑', '失落', '疏离', '光芒微弱'] }, meaningUp: { en: 'The Star restores coherence, trust and clean emotional light after difficulty.', zh: '星星在风暴后带来清澈、修复与重新相信的能力。' }, meaningReversed: { en: 'Reversed, the light is still present but harder to feel, trust or receive.', zh: '逆位时，光并未消失，只是你暂时难以感受到它。' }, zodiac: ['aquarius'], short: { en: 'A cool, clean card of hope, healing and renewed signal.', zh: '一张清澈、治愈并重新带来信号的牌。' } },
  { id: 'moon', name: { en: 'The Moon', zh: '月亮' }, number: 18, element: 'water', upright: { en: ['intuition', 'dream', 'fog', 'emotion'], zh: ['直觉', '梦境', '迷雾', '情绪'] }, reversed: { en: ['clarification', 'fear exposed', 'projection', 'confusion'], zh: ['逐渐明朗', '恐惧浮现', '投射', '混乱'] }, meaningUp: { en: 'The Moon moves through symbol, uncertainty and deep feeling before facts fully form.', zh: '月亮引领你经过象征、模糊和深层情绪，在事实成形前先进入感受。' }, meaningReversed: { en: 'Reversed, the fog may thin enough to reveal what was fear, fantasy or true instinct.', zh: '逆位时，迷雾开始散去，你会看见哪些是恐惧，哪些是直觉。' }, zodiac: ['pisces'], short: { en: 'A night card for ambiguity, instinct and symbolic reality.', zh: '关于暧昧、直觉与象征现实的夜之牌。' } },
  { id: 'sun', name: { en: 'The Sun', zh: '太阳' }, number: 19, element: 'fire', upright: { en: ['joy', 'clarity', 'success', 'life-force'], zh: ['喜悦', '清晰', '成功', '生命力'] }, reversed: { en: ['overexposure', 'delay', 'ego heat', 'partial light'], zh: ['过度暴露', '延迟', '自我膨胀', '光线不完整'] }, meaningUp: { en: 'The Sun brings vitality, confidence and the relief of things becoming clear.', zh: '太阳带来生命力、自信，以及终于明朗起来的舒展感。' }, meaningReversed: { en: 'Reversed, the warmth remains but can be delayed, excessive or partly obscured.', zh: '逆位时，温暖仍在，只是它被延迟、遮挡或过度放大。' }, zodiac: ['sun'], short: { en: 'Radiance, vitality and unmistakable illumination.', zh: '关于光芒、活力与明确照亮的牌。' } },
  { id: 'judgement', name: { en: 'Judgement', zh: '审判' }, number: 20, element: 'spirit', upright: { en: ['awakening', 'calling', 'reckoning', 'renewal'], zh: ['觉醒', '召唤', '清算', '更新'] }, reversed: { en: ['avoidance', 'self-judgment', 'delay', 'unfinished reckoning'], zh: ['逃避', '自我苛责', '拖延', '未完成的清算'] }, meaningUp: { en: 'Judgement sounds a call to respond, awaken and step into a more truthful version of life.', zh: '审判像一声召唤，要求你醒来并回应更真实的人生方向。' }, meaningReversed: { en: 'Reversed, the call is heard but not answered, often because shame or fear still governs the threshold.', zh: '逆位时，召唤已被听见，但你仍被羞耻或恐惧挡在门外。' }, zodiac: ['pluto'], short: { en: 'The card of answering the call and rising to a deeper truth.', zh: '回应召唤并迈向更深真相的牌。' } },
  { id: 'world', name: { en: 'The World', zh: '世界' }, number: 21, element: 'spirit', upright: { en: ['completion', 'integration', 'mastery', 'arrival'], zh: ['完成', '整合', '成熟', '抵达'] }, reversed: { en: ['delay', 'unfinished cycle', 'fragmentation', 'near completion'], zh: ['延迟', '周期未完', '碎片化', '接近完成'] }, meaningUp: { en: 'The World completes a cycle and reveals how far the journey has already carried you.', zh: '世界标志着一个周期的完成，也让你看见自己已走了多远。' }, meaningReversed: { en: 'Reversed, the final integration is still pending even though the threshold is near.', zh: '逆位时，门槛已近，但最后的整合还没有真正发生。' }, zodiac: ['saturn'], short: { en: 'Completion, wholeness and entry into the wider pattern.', zh: '关于完成、整体性与进入更大格局的牌。' } },
];

const majorArcana: TarotCard[] = majorArcanaSeeds.map((seed) => ({
  id: `major-${seed.id}`,
  name: seed.name,
  arcana: 'major',
  suit: null,
  number: seed.number,
  image: localCardImage(`major-${seed.id}`),
  keywords_upright: seed.upright,
  keywords_reversed: seed.reversed,
  meaning_upright: seed.meaningUp,
  meaning_reversed: seed.meaningReversed,
  element_association: seed.element,
  zodiac_association: seed.zodiac,
  description_short: seed.short,
}));

const suitMeta: Record<Exclude<TarotSuit, null>, {
  label: { en: string; zh: string };
  element: TarotElement;
  zodiac: string[];
  domain: { en: string; zh: string };
}> = {
  wands: { label: { en: 'Wands', zh: '权杖' }, element: 'fire', zodiac: ['aries', 'leo', 'sagittarius'], domain: { en: 'desire, drive and creative momentum', zh: '欲望、行动力与创作推进' } },
  cups: { label: { en: 'Cups', zh: '圣杯' }, element: 'water', zodiac: ['cancer', 'scorpio', 'pisces'], domain: { en: 'emotion, intimacy and inner life', zh: '情绪、亲密感与内在世界' } },
  swords: { label: { en: 'Swords', zh: '宝剑' }, element: 'air', zodiac: ['gemini', 'libra', 'aquarius'], domain: { en: 'thought, conflict and truth', zh: '思维、冲突与真相' } },
  pentacles: { label: { en: 'Pentacles', zh: '星币' }, element: 'earth', zodiac: ['taurus', 'virgo', 'capricorn'], domain: { en: 'material reality, body and long-term value', zh: '物质现实、身体与长期价值' } },
};

const ranks = [
  { key: 'ace', label: { en: 'Ace', zh: '王牌' }, number: 1, upright: { en: ['seed', 'potential', 'opening'], zh: ['种子', '潜能', '开启'] }, reversed: { en: ['delay', 'blockage', 'latent force'], zh: ['延迟', '阻塞', '力量潜伏'] }, line: { en: 'introduces a fresh opening', zh: '带来新的开端' }, reverseLine: { en: 'struggles to fully begin', zh: '难以顺利展开' } },
  { key: 'two', label: { en: 'Two', zh: '二' }, number: 2, upright: { en: ['balance', 'choice', 'response'], zh: ['平衡', '选择', '回应'] }, reversed: { en: ['tension', 'uncertainty', 'misalignment'], zh: ['拉扯', '不确定', '失衡'] }, line: { en: 'creates exchange and negotiation', zh: '建立互动与协调' }, reverseLine: { en: 'reveals unstable balance', zh: '暴露出脆弱的平衡' } },
  { key: 'three', label: { en: 'Three', zh: '三' }, number: 3, upright: { en: ['growth', 'expansion', 'formation'], zh: ['成长', '扩展', '形成'] }, reversed: { en: ['fragmentation', 'stall', 'weak support'], zh: ['分裂', '停滞', '支撑薄弱'] }, line: { en: 'pushes the pattern outward into growth', zh: '把模式向外推进到成长阶段' }, reverseLine: { en: 'scatters the early momentum', zh: '让早期动力变得分散' } },
  { key: 'four', label: { en: 'Four', zh: '四' }, number: 4, upright: { en: ['rest', 'stability', 'containment'], zh: ['安稳', '稳定', '边界'] }, reversed: { en: ['rigidity', 'restlessness', 'weak footing'], zh: ['僵化', '不安', '根基不稳'] }, line: { en: 'creates a stable container', zh: '建立一个稳定的容器' }, reverseLine: { en: 'shows either stagnation or unstable footing', zh: '显示停滞或基础不牢' } },
  { key: 'five', label: { en: 'Five', zh: '五' }, number: 5, upright: { en: ['stress', 'testing', 'friction'], zh: ['压力', '考验', '摩擦'] }, reversed: { en: ['recovery', 'avoidance', 'internal strain'], zh: ['恢复', '逃避', '内耗'] }, line: { en: 'tests the system through pressure', zh: '通过压力测试现有结构' }, reverseLine: { en: 'turns conflict inward or softens it without resolution', zh: '让冲突内化，或变得模糊却未解决' } },
  { key: 'six', label: { en: 'Six', zh: '六' }, number: 6, upright: { en: ['movement', 'support', 'transition'], zh: ['流动', '支持', '过渡'] }, reversed: { en: ['imbalance', 'slow passage', 'stalled exchange'], zh: ['失衡', '推进缓慢', '交流停滞'] }, line: { en: 'reshapes the pattern through movement and response', zh: '通过流动与反馈重塑格局' }, reverseLine: { en: 'creates lag in the exchange of energy', zh: '让能量交换出现迟滞' } },
  { key: 'seven', label: { en: 'Seven', zh: '七' }, number: 7, upright: { en: ['strategy', 'evaluation', 'testing faith'], zh: ['策略', '评估', '信念考验'] }, reversed: { en: ['self-doubt', 'poor strategy', 'instability'], zh: ['怀疑自己', '策略失当', '不稳'] }, line: { en: 'demands discernment and strategic effort', zh: '要求判断力与策略性投入' }, reverseLine: { en: 'reveals confusion in the method or the motive', zh: '暴露方法和动机上的混乱' } },
  { key: 'eight', label: { en: 'Eight', zh: '八' }, number: 8, upright: { en: ['speed', 'skill', 'acceleration'], zh: ['速度', '技巧', '加速'] }, reversed: { en: ['friction', 'panic', 'blocked motion'], zh: ['阻力', '慌乱', '行动受阻'] }, line: { en: 'accelerates the process into active execution', zh: '让进程进入加速执行阶段' }, reverseLine: { en: 'throws speed and rhythm out of sync', zh: '让速度与节奏脱节' } },
  { key: 'nine', label: { en: 'Nine', zh: '九' }, number: 9, upright: { en: ['maturity', 'resilience', 'threshold'], zh: ['成熟', '韧性', '临界点'] }, reversed: { en: ['overwhelm', 'fatigue', 'guardedness'], zh: ['不堪重负', '疲惫', '过度防御'] }, line: { en: 'reaches a seasoned threshold of mastery', zh: '到达接近成熟掌握的门槛' }, reverseLine: { en: 'shows the strain of carrying too much too long', zh: '显示长期承受过多造成的疲惫' } },
  { key: 'ten', label: { en: 'Ten', zh: '十' }, number: 10, upright: { en: ['culmination', 'fullness', 'completion'], zh: ['顶点', '饱满', '完成'] }, reversed: { en: ['excess', 'collapse', 'unfinished burden'], zh: ['过载', '崩塌', '未完成的负担'] }, line: { en: 'pushes the theme to full culmination', zh: '把主题推向完整顶点' }, reverseLine: { en: 'shows the cost of carrying the cycle past its natural limit', zh: '显示一个周期被拖过自然极限的代价' } },
  { key: 'page', label: { en: 'Page', zh: '侍从' }, number: 11, upright: { en: ['message', 'curiosity', 'entry'], zh: ['讯息', '好奇', '进入'] }, reversed: { en: ['immaturity', 'mixed signals', 'hesitation'], zh: ['不成熟', '信号混乱', '犹疑'] }, line: { en: 'arrives as a fresh messenger of the suit', zh: '作为该花色的初始信使出现' }, reverseLine: { en: 'carries unstable or immature signal', zh: '带来不稳定或不成熟的信号' } },
  { key: 'knight', label: { en: 'Knight', zh: '骑士' }, number: 12, upright: { en: ['pursuit', 'motion', 'charge'], zh: ['追逐', '行动', '冲锋'] }, reversed: { en: ['recklessness', 'stall', 'misdirected force'], zh: ['鲁莽', '停滞', '方向错误'] }, line: { en: 'drives the suit forward in active pursuit', zh: '以强力推进该花色的主题' }, reverseLine: { en: 'misuses force or loses direction mid-charge', zh: '在冲刺过程中失去方向或误用力量' } },
  { key: 'queen', label: { en: 'Queen', zh: '皇后' }, number: 13, upright: { en: ['embodiment', 'mastery', 'receptive power'], zh: ['体现', '成熟', '接纳性的力量'] }, reversed: { en: ['distortion', 'moodiness', 'overcontrol'], zh: ['扭曲', '情绪失衡', '过度控制'] }, line: { en: 'embodies the suit with mature inner authority', zh: '以内在成熟的方式体现该花色' }, reverseLine: { en: 'shows the suit becoming overcontrolled or emotionally distorted', zh: '让花色能量走向控制或情绪扭曲' } },
  { key: 'king', label: { en: 'King', zh: '国王' }, number: 14, upright: { en: ['authority', 'command', 'stability'], zh: ['权威', '掌控', '稳固'] }, reversed: { en: ['domination', 'instability', 'misuse of power'], zh: ['支配', '不稳定', '权力误用'] }, line: { en: 'governs the suit through mature command', zh: '以成熟掌控力统御该花色' }, reverseLine: { en: 'shows authority slipping into rigidity or misuse', zh: '显示权威滑向僵化或滥用' } },
];

function createMinorArcana(): TarotCard[] {
  return (Object.keys(suitMeta) as Exclude<TarotSuit, null>[]).flatMap((suit) => {
    const meta = suitMeta[suit];
    return ranks.map((rank) => {
      const id = `minor-${suit}-${rank.key}`;
      return {
        id,
        name: {
          en: `${rank.label.en} of ${meta.label.en}`,
          zh: `${meta.label.zh}${rank.label.zh}`,
        },
        arcana: 'minor',
        suit,
        number: rank.number,
        image: localCardImage(id),
        keywords_upright: {
          en: [...rank.upright.en, meta.label.en.toLowerCase()],
          zh: [...rank.upright.zh, meta.label.zh],
        },
        keywords_reversed: {
          en: [...rank.reversed.en, meta.label.en.toLowerCase()],
          zh: [...rank.reversed.zh, meta.label.zh],
        },
        meaning_upright: {
          en: `${meta.label.en} ${rank.label.en} works through ${meta.domain.en} and ${rank.line.en}. It asks you to understand how this suit behaves when it is active in real life.`,
          zh: `${meta.label.zh}${rank.label.zh}处理的是${meta.domain.zh}，它会${rank.line.zh}。这张牌要求你看见这组能量在现实中是如何被启动和推进的。`,
        },
        meaning_reversed: {
          en: `${meta.label.en} ${rank.label.en} still concerns ${meta.domain.en}, but ${rank.reverseLine.en}. Reversed, the suit asks for correction, honesty and better pacing.`,
          zh: `${meta.label.zh}${rank.label.zh}依然围绕${meta.domain.zh}展开，但它会${rank.reverseLine.zh}。逆位时，这组能量需要被修正、诚实面对，并重新调整节奏。`,
        },
        element_association: meta.element,
        zodiac_association: meta.zodiac,
        description_short: {
          en: `${meta.label.en} ${rank.label.en} expresses ${meta.domain.en} through the lens of ${rank.upright.en[0]}, ${rank.upright.en[1]} and ${rank.upright.en[2]}.`,
          zh: `${meta.label.zh}${rank.label.zh}把${meta.domain.zh}带到台前，并通过${rank.upright.zh[0]}、${rank.upright.zh[1]}与${rank.upright.zh[2]}来表达。`,
        },
      };
    });
  });
}

export const tarotDeck: TarotCard[] = [...majorArcana, ...createMinorArcana()];
export const majorArcanaCards = tarotDeck.filter((card) => card.arcana === 'major');
