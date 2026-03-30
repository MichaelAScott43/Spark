import React, { createContext, useContext, useMemo, useState } from 'react';
import { CountryCode } from '../data/resources';
import { SupportedLanguage } from '../utils/language';

export type VoiceGender = 'female' | 'male';

type AppState = {
  onboardingDone: boolean;
  country: CountryCode;
  veteranMode: boolean;
  moods: number[];
  journals: string[];
  trustedContacts: string[];
  shareLocationOnHelp: boolean;
  preferredVoiceGender: VoiceGender;
  detectedLanguage: SupportedLanguage;
  completeOnboarding: (country: CountryCode, veteranMode: boolean) => void;
  addMood: (mood: number) => void;
  addJournal: (entry: string) => void;
  addTrustedContact: (name: string) => void;
  setShareLocationOnHelp: (enabled: boolean) => void;
  setPreferredVoiceGender: (gender: VoiceGender) => void;
  setDetectedLanguage: (language: SupportedLanguage) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [country, setCountry] = useState<CountryCode>('US');
  const [veteranMode, setVeteranMode] = useState(false);
  const [moods, setMoods] = useState<number[]>([]);
  const [journals, setJournals] = useState<string[]>([]);
  const [trustedContacts, setTrustedContacts] = useState<string[]>([]);
  const [shareLocationOnHelp, setShareLocationOnHelp] = useState(false);
  const [preferredVoiceGender, setPreferredVoiceGender] = useState<VoiceGender>('female');
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>('en-US');

  const value = useMemo(
    () => ({
      onboardingDone,
      country,
      veteranMode,
      moods,
      journals,
      trustedContacts,
      shareLocationOnHelp,
      preferredVoiceGender,
      detectedLanguage,
      completeOnboarding: (selectedCountry: CountryCode, selectedVeteranMode: boolean) => {
        setCountry(selectedCountry);
        setVeteranMode(selectedVeteranMode);
        setOnboardingDone(true);
      },
      addMood: (mood: number) => setMoods((prev) => [mood, ...prev].slice(0, 30)),
      addJournal: (entry: string) => setJournals((prev) => [entry, ...prev].slice(0, 50)),
      addTrustedContact: (name: string) => setTrustedContacts((prev) => [...prev, name]),
      setShareLocationOnHelp,
      setPreferredVoiceGender,
      setDetectedLanguage,
    }),
    [
      onboardingDone,
      country,
      veteranMode,
      moods,
      journals,
      trustedContacts,
      shareLocationOnHelp,
      preferredVoiceGender,
      detectedLanguage,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return ctx;
}
