import { buildArlaneResponse } from '../personas/arlane';
import { buildTjResponse } from '../personas/tj';
import { buildSafetyOverrideResponse, detectSafetyRisk } from '../safety';
import { CharacterId, ChatMessage, SupportMode } from '../types/chat';

export type RoutedResponse = {
  text: string;
  safetyTriggered: boolean;
  styleTag: string;
};

export function routeResponse({
  character,
  userMessage,
  mode,
  history,
}: {
  character: CharacterId;
  userMessage: string;
  mode: SupportMode;
  history: ChatMessage[];
}): RoutedResponse {
  const safety = detectSafetyRisk(userMessage);
  if (safety.triggered) {
    return {
      text: buildSafetyOverrideResponse(),
      safetyTriggered: true,
      styleTag: 'safety-override',
    };
  }

  const overwhelmed = /panic|overwhelmed|can't|cannot|spiraling|freaking out|too much/i.test(userMessage);
  const payload = {
    userMessage,
    context: {
      mode,
      overwhelmed,
      history: history.slice(-8),
    },
  };

  const personaResponse = character === 'tj' ? buildTjResponse(payload) : buildArlaneResponse(payload);

  return {
    text: personaResponse.text,
    safetyTriggered: false,
    styleTag: personaResponse.styleTag,
  };
}
