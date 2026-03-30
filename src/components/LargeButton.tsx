import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

export function LargeButton({ label, onPress, variant = 'primary' }: Props) {
  return (
    <Pressable style={[styles.button, styles[variant]]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  danger: { backgroundColor: colors.danger },
  text: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
