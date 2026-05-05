export type SupportedLanguage = 'en-US' | 'es-ES' | 'fr-FR' | 'hi-IN';

const spanishHints = ['hola', 'gracias', 'estoy', 'ayuda', 'triste', 'ansiedad'];
const frenchHints = ['bonjour', 'merci', 'aide', 'anxiete', 'triste', 'je'];
const hindiHints = ['namaste', 'dhanyavad', 'madad', 'darr', 'chinta'];

export function detectLanguage(input: string): SupportedLanguage {
  const normalized = input.toLowerCase();

  if (hindiHints.some((word) => normalized.includes(word)) || /[\u0900-\u097F]/.test(normalized)) {
    return 'hi-IN';
  }

  if (spanishHints.some((word) => normalized.includes(word)) || /[¿¡]/.test(normalized)) {
    return 'es-ES';
  }

  if (frenchHints.some((word) => normalized.includes(word)) || /[àâçéèêëîïôûùüÿœ]/.test(normalized)) {
    return 'fr-FR';
  }

  return 'en-US';
}

export function buildSupportReply(input: string) {
  const openings = [
    'Well hey there, sugar, TJ here, and this day is finer than frog hair split four ways.',
    'Bless your heart, you reached TJ on another absolutely outstanding day.',
    'TJ clocking in: today is so good it oughta be illegal in at least two counties.',
  ];

  const theories = [
    'I am 97% sure that stress is just your brain revving like a pickup in low gear.',
    'Classic situation: your thoughts are loud because your greatness is double-parked.',
    'I did the back-porch math, and it says this problem is loud but not boss.',
  ];

  const pepTalk = [
    'Go on and take one slow breath. Shoulders down. We are handling this one step at a time.',
    'Deep breath, partner. Boots planted. We are not letting this moment run the ranch.',
    'Inhale nice and slow, exhale even slower. We keep moving, calm and stubborn.',
  ];

  const randomFrom = (items: string[]) => items[Math.floor(Math.random() * items.length)];

  return `${randomFrom(openings)} You said: "${input}". ${randomFrom(theories)} ${randomFrom(pepTalk)} If you feel unsafe, open Help Now for immediate support.`;
}
