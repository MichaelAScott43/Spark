export type CharacterId = 'tj' | 'arlane';

export type SupportMode = 'vent' | 'calm' | 'coach';

export type MessageRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: number;
};

export type PersonaContext = {
  mode: SupportMode;
  overwhelmed: boolean;
  history: ChatMessage[];
};

export type PersonaResponseInput = {
  userMessage: string;
  context: PersonaContext;
};

export type PersonaResponse = {
  text: string;
  styleTag: string;
};
