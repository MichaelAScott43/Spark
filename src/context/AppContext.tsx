import * as Speech from 'expo-speech';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { routeResponse } from '../services/responseRouter';
import { CharacterId, ChatMessage, SupportMode } from '../types/chat';

type AppState = {
  selectedCharacter: CharacterId | null;
  voiceEnabled: boolean;
  mode: SupportMode;
  messages: ChatMessage[];
  isTyping: boolean;
  setMode: (mode: SupportMode) => void;
  setVoiceEnabled: (value: boolean) => void;
  chooseCharacter: (character: CharacterId) => void;
  sendMessage: (text: string) => Promise<void>;
  resetConversation: () => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

function id() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [mode, setMode] = useState<SupportMode>('vent');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const value = useMemo<AppState>(
    () => ({
      selectedCharacter,
      voiceEnabled,
      mode,
      messages,
      isTyping,
      setMode,
      setVoiceEnabled,
      chooseCharacter: (character) => setSelectedCharacter(character),
      resetConversation: () => setMessages([]),
      sendMessage: async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || !selectedCharacter) return;

        const userMessage: ChatMessage = { id: id(), role: 'user', text: trimmed, createdAt: Date.now() };
        const nextHistory = [...messages, userMessage];
        setMessages(nextHistory);
        setIsTyping(true);

        await new Promise((resolve) => setTimeout(resolve, 700));

        const routed = routeResponse({
          character: selectedCharacter,
          userMessage: trimmed,
          mode,
          history: nextHistory,
        });

        const assistantMessage: ChatMessage = {
          id: id(),
          role: 'assistant',
          text: routed.text,
          createdAt: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);

        if (voiceEnabled) {
          Speech.speak(routed.text, { rate: 0.95, pitch: selectedCharacter === 'tj' ? 0.9 : 1.0 });
        }
      },
    }),
    [selectedCharacter, voiceEnabled, mode, messages, isTyping],
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
