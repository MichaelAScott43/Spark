const scoreOpportunity = (text) => {
  const normalized = text.toLowerCase();
  let score = 40;

  if (/(federal|government|sam\.gov|rfp)/.test(normalized)) score += 15;
  if (/(renewal|incumbent|sole source)/.test(normalized)) score += 10;
  if (/(strategic|multi-year|enterprise)/.test(normalized)) score += 10;
  if (/(urgent|deadline|submission)/.test(normalized)) score += 5;
  if (/(low budget|unfunded|unclear scope)/.test(normalized)) score -= 15;

  return Math.max(0, Math.min(100, score));
};

export const extractOpportunitySignals = (inputText) => {
  const text = inputText || '';
  const score = scoreOpportunity(text);

  return {
    opportunityScore: score,
    readiness: score >= 75 ? 'High' : score >= 55 ? 'Medium' : 'Low',
    indicators: [
      /federal|government/i.test(text) ? 'Federal/compliance signal detected' : null,
      /deadline|due|submission/i.test(text) ? 'Time pressure detected' : null,
      /budget|value|contract/i.test(text) ? 'Commercial value signal detected' : null
    ].filter(Boolean)
  };
};
