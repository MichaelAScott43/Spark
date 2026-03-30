import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';

export function ScreenContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: spacing.md },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: spacing.md },
});
