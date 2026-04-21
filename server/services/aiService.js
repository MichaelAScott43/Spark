import OpenAI from 'openai';
import tjPrompt from '../prompts/tjPrompt.js';
import arlanePrompt from '../prompts/arlanePrompt.js';
import { buildDecisionBrief } from './decisionService.js';

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const personaSystemPrompt = (persona) => (persona === 'arlane' ? arlanePrompt : tjPrompt);

const fallbackReply = (persona, message, brief) => {
  const voice = persona === 'arlane' ? 'Arlane' : 'TJ';
  return `${voice} quick brief:\n\nDecision: ${brief.bidDecision}\nOpportunity score: ${brief.opportunityScore}/100\n\nPriorities:\n- ${brief.priorities.join('\n- ')}\n\nBased on your input: "${message.slice(0, 160)}"`;
};

export const generateChatResponse = async ({ persona = 'tj', message }) => {
  const decisionBrief = buildDecisionBrief(message);

  if (!client) {
    return {
      persona,
      response: fallbackReply(persona, message, decisionBrief),
      insights: decisionBrief
    };
  }

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
    temperature: 0.6,
    messages: [
      { role: 'system', content: `${personaSystemPrompt(persona)}\nYou are part of CHIEF OF STAFF AI.` },
      {
        role: 'user',
        content: `User message: ${message}\n\nDecision brief context:\n${JSON.stringify(decisionBrief, null, 2)}`
      }
    ]
  });

  return {
    persona,
    response: completion.choices[0]?.message?.content || fallbackReply(persona, message, decisionBrief),
    insights: decisionBrief
  };
};
