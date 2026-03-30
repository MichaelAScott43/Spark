import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { LargeButton } from '../components/LargeButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';
import { buildReflection } from '../utils/reflection';

const prompts = [
  'What felt hardest today?',
  'What helped even a little?',
  'What would support look like right now?',
];

export function JournalScreen() {
  const { journals, moods, addJournal } = useAppState();
  const [entry, setEntry] = useState('');
  const reflection = useMemo(() => buildReflection(moods, journals), [journals, moods]);

  return (
    <ScreenContainer title="Journal & Reflection">
      <Text style={styles.text}>Prompt: {prompts[journals.length % prompts.length]}</Text>
      <TextInput
        value={entry}
        onChangeText={setEntry}
        placeholder="Write a few lines..."
        placeholderTextColor={colors.muted}
        multiline
        style={styles.input}
      />
      <LargeButton
        label="Save journal entry"
        onPress={() => {
          if (entry.trim()) {
            addJournal(entry.trim());
            setEntry('');
          }
        }}
      />
      <Text style={styles.reflectionTitle}>AI reflection summary</Text>
      <Text style={styles.summary}>{reflection}</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, marginBottom: spacing.sm },
  input: {
    minHeight: 120,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
  },
  reflectionTitle: { color: colors.text, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.sm },
  summary: { color: colors.muted, lineHeight: 20 },
});
