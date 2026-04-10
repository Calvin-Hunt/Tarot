const allowedSpreadIds = new Set([
  'single',
  'three-card',
  'celtic-cross-lite',
  'relationship-mirror',
  'decision-path',
  'lunar-cycle',
]);

const allowedQuestionCategoryIds = new Set([
  'general',
  'love',
  'career',
  'healing',
  'shadow',
  'creativity',
]);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isLocalizedText(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.en === 'string' &&
      value.en.trim() &&
      typeof value.zh === 'string' &&
      value.zh.trim(),
  );
}

function isLocalizedList(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      Array.isArray(value.en) &&
      Array.isArray(value.zh),
  );
}

function isTextLike(value) {
  return isNonEmptyString(value) || isLocalizedText(value);
}

function isListLike(value) {
  return (Array.isArray(value) && value.length > 0) || isLocalizedList(value);
}

export function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

export function validateCredentials(input, { requireDisplayName = false } = {}) {
  const email = normalizeEmail(input?.email);
  const password = typeof input?.password === 'string' ? input.password.trim() : '';
  const displayName = typeof input?.displayName === 'string' ? input.displayName.trim() : '';

  if (!email || !password || (requireDisplayName && !displayName)) {
    return { ok: false, error: requireDisplayName ? 'email, password and displayName are required' : 'email and password are required' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'invalid email format' };
  }

  if (password.length < 6) {
    return { ok: false, error: 'password must be at least 6 characters' };
  }

  if (requireDisplayName && displayName.length < 2) {
    return { ok: false, error: 'displayName must be at least 2 characters' };
  }

  return { ok: true, value: { email, password, displayName } };
}

export function validateReadingPayload(input) {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'reading payload is required' };
  }

  const { createdAt, spreadId, zodiacId, questionCategoryId, cards } = input;
  if (!isNonEmptyString(createdAt) || !isNonEmptyString(spreadId) || !isNonEmptyString(zodiacId) || !Array.isArray(cards)) {
    return { ok: false, error: 'invalid reading payload' };
  }

  if (!allowedSpreadIds.has(spreadId)) {
    return { ok: false, error: 'invalid spreadId' };
  }

  if (questionCategoryId && !allowedQuestionCategoryIds.has(questionCategoryId)) {
    return { ok: false, error: 'invalid questionCategoryId' };
  }

  if (cards.length === 0) {
    return { ok: false, error: 'reading must contain at least one card' };
  }

  const cardsAreValid = cards.every((card) => {
    if (!card || typeof card !== 'object') {
      return false;
    }

    return (
      isNonEmptyString(card.orientation) &&
      isTextLike(card.baseMeaning) &&
      isTextLike(card.positionMeaning) &&
      card.card &&
      typeof card.card === 'object' &&
      isNonEmptyString(card.card.id) &&
      isTextLike(card.card.name) &&
      card.position &&
      typeof card.position === 'object' &&
      isNonEmptyString(card.position.key) &&
      isNonEmptyString(card.position.label) &&
      isListLike(card.baseKeywords)
    );
  });

  if (!cardsAreValid) {
    return { ok: false, error: 'invalid reading cards payload' };
  }

  return {
    ok: true,
    value: {
      createdAt,
      spreadId,
      zodiacId,
      questionCategoryId: questionCategoryId || undefined,
      cards,
    },
  };
}

export function validateCardId(input) {
  const cardId = typeof input?.cardId === 'string' ? input.cardId.trim() : '';
  if (!cardId) {
    return { ok: false, error: 'cardId is required' };
  }
  return { ok: true, value: cardId };
}
