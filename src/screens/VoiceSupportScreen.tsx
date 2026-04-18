import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech';
import { LargeButton } from '../components/LargeButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { useAppState, VoiceGender } from '../context/AppContext';
import { buildSupportReply, detectLanguage, SupportedLanguage } from '../utils/language';

type VoiceOption = {
  identifier?: string;
  language?: string;
  name?: string;
};

function matchesGender(name: string, gender: VoiceGender) {
  const normalized = name.toLowerCase();
  const maleHints = ['male', 'man', 'david', 'alex', 'liam'];
  const femaleHints = ['female', 'woman', 'samantha', 'victoria', 'ava'];
  return gender === 'male'
    ? maleHints.some((hint) => normalized.includes(hint))
    : femaleHints.some((hint) => normalized.includes(hint));
}

export function VoiceSupportScreen() {
  const { preferredVoiceGender, setPreferredVoiceGender, detectedLanguage, setDetectedLanguage } = useAppState();
  const [input, setInput] = useState('');

  const languageLabel = useMemo(() => {
    const labels: Record<SupportedLanguage, string> = {
      'en-US': 'English',
      'es-ES': 'Spanish',
      'fr-FR': 'French',
      'hi-IN': 'Hindi',
    };
    return labels[detectedLanguage];
  }, [detectedLanguage]);

  const speakBack = async () => {
    if (!input.trim()) {
      Alert.alert('Add message', 'Type or paste what the user said so Steady can detect language and talk back.');
      return;
    }

    const language = detectLanguage(input);
    setDetectedLanguage(language);

    const voices = (await Speech.getAvailableVoicesAsync()) as VoiceOption[];
    const languageVoices = voices.filter((voice) => (voice.language || '').startsWith(language.split('-')[0]));
    const selected = languageVoices.find((voice) => matchesGender(voice.name || '', preferredVoiceGender)) || languageVoices[0];

    Speech.speak(buildSupportReply(input), {
      language,
      voice: selected?.identifier,
      pitch: preferredVoiceGender === 'female' ? 1.05 : 0.9,
      rate: 0.92,
    });
  };

  return (
    <ScreenContainer title="Voice Support">
      <Text style={styles.text}>
        Meet TJ: a confidently wrong, blue-collar pseudo-intellectual robot with a sarcastic southern edge who insists every day is outstanding.
      </Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type what TJ should respond to..."
        placeholderTextColor={colors.muted}
        multiline
        style={styles.input}
      />
      <Text style={styles.label}>Voice choice</Text>
      <View style={styles.row}>
        <LargeButton label="Female voice" onPress={() => setPreferredVoiceGender('female')} variant={preferredVoiceGender === 'female' ? 'primary' : 'secondary'} />
        <LargeButton label="Male voice" onPress={() => setPreferredVoiceGender('male')} variant={preferredVoiceGender === 'male' ? 'primary' : 'secondary'} />
      </View>
      <LargeButton label="Let TJ talk back" onPress={speakBack} />
      <Text style={styles.detected}>Detected language: {languageLabel}</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, marginBottom: spacing.sm, lineHeight: 20 },
  input: {
    minHeight: 110,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: { color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  row: { marginBottom: spacing.sm },
  detected: { color: colors.muted, marginTop: spacing.sm },
});
