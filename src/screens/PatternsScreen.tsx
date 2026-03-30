import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';

export function PatternsScreen() {
  const { moods, journals } = useAppState();
  const lastFive = moods.slice(0, 5);

  return (
    <ScreenContainer title="Pattern Tracking">
      <Text style={styles.text}>Recent moods: {lastFive.length ? lastFive.join(' → ') : 'No check-ins yet'}</Text>
      <Text style={styles.text}>Total journal entries: {journals.length}</Text>
      <Text style={styles.note}>
        Pattern tracking helps you spot shifts over time. It is informational only and does not provide diagnosis.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, marginBottom: spacing.sm, fontSize: 16 },
  note: { color: colors.muted, lineHeight: 20 },
});
