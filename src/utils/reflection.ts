export function buildReflection(moods: number[], entries: string[]) {
  const avgMood = moods.length
    ? (moods.reduce((total, mood) => total + mood, 0) / moods.length).toFixed(1)
    : 'N/A';

  const recentPrompt = entries[entries.length - 1];
  const trend = moods.length > 2 && moods[moods.length - 1] >= moods[0] ? 'stable or improving' : 'under pressure';

  return `Reflection summary: your recent average mood is ${avgMood}/5 and your pattern looks ${trend}. ` +
    `A theme from your journal: "${recentPrompt || 'No entries yet.'}". ` +
    'This is a wellness reflection only, not medical advice. If you feel unsafe, open Help Now immediately.';
}
