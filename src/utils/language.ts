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
  return `Thank you for checking in. I hear you saying: "${input}". Let's take one slow breath together. If you feel unsafe, open Help Now for immediate support.`;
}
