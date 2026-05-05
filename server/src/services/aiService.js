import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const basePrompt = `You are an elite Chief of Staff for a high-performing but overwhelmed individual.

Your job:
1. Identify CRITICAL tasks (must be done today, max 3-5)
2. Identify IMPORTANT tasks (this week)
3. Identify NOISE (ignore or delay)
4. Identify RISKS (things the user is likely missing or forgetting)

Rules:
- Be decisive
- Be concise
- Break tasks into actionable steps
- Limit CRITICAL to 3-5
- Highlight consequences of inaction`;

const toneLayer = `
If tone = Direct:
- Professional, concise, no fluff

If tone = TJ:
- Blunt, humorous, slightly irreverent
- Calls out avoidance and excuses
- Still helpful, never insulting

If tone = Arlane:
- Calm, supportive, grounding
- Reassuring but still clear
- Focus on steady progress`;

const triageSchemaHint = `Return strict JSON with this shape only:
{
  "critical": [],
  "important": [],
  "noise": [],
  "risks": []
}`;

export const runTriage = async ({ rawInput, tone }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    temperature: 0.4,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: `${basePrompt}\n${toneLayer}\n${triageSchemaHint}` },
      { role: 'user', content: `Tone: ${tone}\n\nInput:\n${rawInput}` }
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content || '{}');
  return {
    critical: parsed.critical || [],
    important: parsed.important || [],
    noise: parsed.noise || [],
    risks: parsed.risks || []
  };
};

export const runDebrief = async ({ completedTasks, incompleteTasks, tone }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    temperature: 0.6,
    messages: [
      {
        role: 'system',
        content: `You are an AI Chief of Staff conducting a daily debrief. Tone rules:\n${toneLayer}\nRespond in markdown with sections: Missed, Patterns, Suggestions.`
      },
      {
        role: 'user',
        content: `Tone: ${tone}\nCompleted: ${JSON.stringify(completedTasks)}\nIncomplete: ${JSON.stringify(incompleteTasks)}`
      }
    ]
  });

  return completion.choices[0].message.content;
};
