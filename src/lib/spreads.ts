import type { SpreadDefinition } from '@/types/reading';

export const spreadDefinitions: SpreadDefinition[] = [
  {
    id: 'single',
    name: 'Single Card',
    description: 'A focused daily pull for a single theme, signal or emotional center.',
    cardCount: 1,
    ritualPrompt: 'Reduce the question to one clear line before you draw.',
    positions: [{ key: 'guidance', label: 'Guidance', intention: 'The central message most ready to be seen.' }],
  },
  {
    id: 'three-card',
    name: 'Past / Present / Future',
    description: 'A clean line through what shaped the moment, what holds it now and what grows next.',
    cardCount: 3,
    ritualPrompt: 'Ask about a process, not just a yes or no outcome.',
    positions: [
      { key: 'past', label: 'Past', intention: 'The prior force or condition that brought the present into being.' },
      { key: 'present', label: 'Present', intention: 'The immediate energy currently defining the situation.' },
      { key: 'future', label: 'Future', intention: 'The direction or pattern already beginning to form.' },
    ],
  },
  {
    id: 'celtic-cross-lite',
    name: 'Celtic Cross Lite',
    description: 'A structured six-card read for layered questions with multiple emotional and practical axes.',
    cardCount: 6,
    ritualPrompt: 'Make room for contradiction. This spread is designed for complexity.',
    positions: [
      { key: 'heart', label: 'Core', intention: 'The living heart of the issue and the energy at its center.' },
      { key: 'challenge', label: 'Challenge', intention: 'The friction, tension or obstacle shaping the situation.' },
      { key: 'foundation', label: 'Foundation', intention: 'The hidden root, emotional base or unseen cause.' },
      { key: 'crown', label: 'Crown', intention: 'Your conscious aim, hope or known mental framing.' },
      { key: 'near-future', label: 'Near Future', intention: 'The most immediate development coming into motion.' },
      { key: 'guidance', label: 'Guidance', intention: 'The stance, discipline or wisdom that serves you best now.' },
    ],
  },
  {
    id: 'relationship-mirror',
    name: 'Relationship Mirror',
    description: 'A five-card spread for attachment, desire, reciprocity, emotional rhythm and what sits between two people.',
    cardCount: 5,
    ritualPrompt: 'Ask about the dynamic, not just the person.',
    positions: [
      { key: 'self', label: 'You', intention: 'Your current stance, need or emotional position in the connection.' },
      { key: 'other', label: 'Other', intention: 'The other side of the bond as it currently presents itself.' },
      { key: 'bridge', label: 'Bridge', intention: 'What connects, attracts or attempts to hold the bond together.' },
      { key: 'fracture', label: 'Friction', intention: 'The pattern that destabilizes trust, clarity or rhythm.' },
      { key: 'potential', label: 'Potential', intention: 'What may emerge if the current pattern continues with awareness.' },
    ],
  },
  {
    id: 'decision-path',
    name: 'Decision Path',
    description: 'A four-card comparison spread for crossroads, timing, risk and strategic movement.',
    cardCount: 4,
    ritualPrompt: 'Name the choice honestly before you ask which road carries life.',
    positions: [
      { key: 'current', label: 'Current Path', intention: 'What defines the present route if nothing changes.' },
      { key: 'option-a', label: 'Option A', intention: 'The likely tone and demand of the first viable direction.' },
      { key: 'option-b', label: 'Option B', intention: 'The likely tone and demand of the second viable direction.' },
      { key: 'wisdom', label: 'Wisdom', intention: 'The deeper principle that should guide the final choice.' },
    ],
  },
  {
    id: 'lunar-cycle',
    name: 'Lunar Cycle',
    description: 'A four-card ritual spread for intention, emergence, culmination and release.',
    cardCount: 4,
    ritualPrompt: 'Use this spread when you want a ritual cadence, not just an answer.',
    positions: [
      { key: 'new-moon', label: 'New Moon', intention: 'The seed, intention or inner pull beginning now.' },
      { key: 'waxing', label: 'Waxing', intention: 'What grows through effort, attention and repetition.' },
      { key: 'full-moon', label: 'Full Moon', intention: 'What reaches visibility, fullness or emotional climax.' },
      { key: 'waning', label: 'Waning', intention: 'What should be released, softened or allowed to leave.' },
    ],
  },
];

export const defaultSpread = spreadDefinitions[1];

export function getSpreadById(spreadId: SpreadDefinition['id']): SpreadDefinition {
  return spreadDefinitions.find((spread) => spread.id === spreadId) ?? defaultSpread;
}
