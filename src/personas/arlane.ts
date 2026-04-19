import { PersonaResponseInput } from '../types/chat';

const ARLANE_OPENERS = [
  "I'm right here with you.",
  'Thank you for sharing that with me.',
  'You are not alone in this moment.',
  "Let's take this gently, one piece at a time.",
];

const ARLANE_CLOSE = [
  'One breath, then one small step.',
  'You deserve steadiness and care.',
  'We can move through this slowly together.',
  'You are doing better than you think.',
];

function pick<T>(items: T[], seed: string) {
  const index = Math.abs(seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % items.length;
  return items[index];
}

export function buildArlaneResponse({ userMessage, context }: PersonaResponseInput) {
  const opener = pick(ARLANE_OPENERS, userMessage);
  const close = pick(ARLANE_CLOSE, `${userMessage}:${context.mode}`);

  const modeLine =
    context.mode === 'vent'
      ? 'Let it out fully — your feelings make sense.'
      : context.mode === 'calm'
        ? 'Place one hand on your chest and slow your breathing for a few rounds.'
        : 'Let us organize what feels biggest, then choose one kind next action.';

  return {
    styleTag: 'comfort',
    text: `${opener} ${modeLine} ${close}`,
  };
}
