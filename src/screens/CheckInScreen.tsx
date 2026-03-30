import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LargeButton } from '../components/LargeButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';

export function CheckInScreen() {
  const { addMood } = useAppState();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <ScreenContainer title="Daily Check-in">
      <Text style={styles.text}>How are you feeling right now? (1 = very low, 5 = steady)</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((mood) => (
          <LargeButton key={mood} label={String(mood)} onPress={() => setSelectedMood(mood)} variant={selectedMood === mood ? 'primary' : 'secondary'} />
        ))}
      </View>
      <LargeButton label="Save mood" onPress={() => selectedMood && addMood(selectedMood)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, marginBottom: spacing.md, fontSize: 16 },
  row: { marginBottom: spacing.sm },
});
