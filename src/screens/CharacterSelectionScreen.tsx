import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';

export function CharacterSelectionScreen() {
  const { chooseCharacter } = useAppState();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Who do you want to talk to?</Text>
      <Text style={styles.subtitle}>Choose your support style. You can switch anytime in Settings.</Text>

      <Pressable style={[styles.card, styles.tj]} onPress={() => chooseCharacter('tj')}>
        <Text style={styles.name}>TJ (Tough Love)</Text>
        <Text style={styles.desc}>Sarcastic, blunt, southern, funny, and focused on momentum.</Text>
      </Pressable>

      <Pressable style={[styles.card, styles.arlane]} onPress={() => chooseCharacter('arlane')}>
        <Text style={styles.name}>Arlane (Comfort Mode)</Text>
        <Text style={styles.desc}>Warm, patient, grandmother-style support to help you slow down.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'center' },
  title: { color: colors.text, fontSize: 30, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { color: colors.muted, fontSize: 15, marginBottom: spacing.lg },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  tj: { borderLeftWidth: 5, borderLeftColor: colors.tj },
  arlane: { borderLeftWidth: 5, borderLeftColor: colors.arlane },
  name: { color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: spacing.xs },
  desc: { color: colors.muted, fontSize: 15, lineHeight: 21 },
});
