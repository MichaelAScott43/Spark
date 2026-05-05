import { extractOpportunitySignals } from './opportunityService.js';

export const buildDecisionBrief = (inputText) => {
  const signals = extractOpportunitySignals(inputText);

  const bidDecision = signals.opportunityScore >= 65 ? 'BID' : 'NO-BID';
  const topRisks = [
    'Insufficient qualification data from buyer',
    'Resource contention with active deals',
    'Timeline slippage near submission window'
  ];

  const priorities = [
    'Validate buying authority and funding source',
    'Map win themes to evaluator pain points',
    'Assign owner for compliance checklist'
  ];

  return {
    bidDecision,
    opportunityScore: signals.opportunityScore,
    readiness: signals.readiness,
    riskFlags: topRisks,
    priorities,
    indicators: signals.indicators
  };
};
