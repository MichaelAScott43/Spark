export type CountryCode = 'US' | 'CA' | 'GB' | 'AU' | 'IN' | 'OTHER';

export type CrisisResource = {
  name: string;
  description: string;
  contact: string;
  veteranOnly?: boolean;
};

export const countryResources: Record<CountryCode, CrisisResource[]> = {
  US: [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: '24/7 call, text, or chat support in the United States.',
      contact: 'Call or text 988',
    },
    {
      name: 'Veterans Crisis Line',
      description: 'Support for veterans and service members.',
      contact: 'Dial 988, then press 1',
      veteranOnly: true,
    },
  ],
  CA: [
    {
      name: 'Talk Suicide Canada',
      description: '24/7 bilingual support across Canada.',
      contact: 'Call or text 1-833-456-4566',
    },
  ],
  GB: [
    {
      name: 'Samaritans',
      description: '24/7 emotional support in the UK and ROI.',
      contact: 'Call 116 123',
    },
  ],
  AU: [
    {
      name: 'Lifeline Australia',
      description: '24/7 crisis support and suicide prevention.',
      contact: 'Call 13 11 14',
    },
  ],
  IN: [
    {
      name: 'Tele-MANAS',
      description: 'India national tele-mental health helpline.',
      contact: 'Call 14416 or 1-800-891-4416',
    },
  ],
  OTHER: [
    {
      name: 'Emergency Services',
      description: 'If immediate danger is present, contact local emergency services now.',
      contact: 'Call your local emergency number',
    },
  ],
};

export const countries: { label: string; value: CountryCode }[] = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Australia', value: 'AU' },
  { label: 'India', value: 'IN' },
  { label: 'Other', value: 'OTHER' },
];
