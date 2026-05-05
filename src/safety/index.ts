const SELF_HARM_PATTERNS = [
  /kill myself/i,
  /end my life/i,
  /suicid(e|al)/i,
  /hurt myself/i,
  /self[- ]harm/i,
  /no reason to live/i,
  /want to die/i,
  /overdose/i,
];

export type SafetyAssessment = {
  triggered: boolean;
  reason?: string;
};

export function detectSafetyRisk(text: string): SafetyAssessment {
  for (const pattern of SELF_HARM_PATTERNS) {
    if (pattern.test(text)) {
      return { triggered: true, reason: pattern.toString() };
    }
  }

  return { triggered: false };
}

export function buildSafetyOverrideResponse() {
  return [
    'I am really glad you said that out loud. Your safety matters most right now.',
    'Steady is not crisis care. Please call or text 988 in the US right now for immediate support.',
    'If you might act on these thoughts, call emergency services now and reach out to a trusted person nearby.',
  ].join(' ');
}
