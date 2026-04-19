import { PersonaResponseInput } from '../types/chat';

const TJ_OPENERS = [
  "Alright, listen up.",
  "Okay, partner.",
  "Here's the straight truth.",
  "I'm gonna keep it real with you.",
];

const TJ_PUSHES = [
  'Take one small step in the next 10 minutes.',
  'Pick the easiest next move and do it now.',
  'No perfect plan needed — just motion.',
  'Do the next right thing, not all the things.',
];

function pick<T>(items: T[], seed: string) {
  const index = Math.abs(seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % items.length;
  return items[index];
}

export function buildTjResponse({ userMessage, context }: PersonaResponseInput) {
  const short = context.overwhelmed || userMessage.length < 40;
  const opener = pick(TJ_OPENERS, userMessage);
  const push = pick(TJ_PUSHES, userMessage + context.mode);

  const modeLine =
    context.mode === 'vent'
      ? "You can vent, but don't park there all night."
      : context.mode === 'calm'
        ? 'Drop your shoulders, breathe low and slow, then move with purpose.'
        : 'We are solving this one step at a time.';

  return {
    styleTag: 'tough-love',
    text: short ? `${opener} ${push}` : `${opener} ${modeLine} ${push}`,
  };
}
