import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';

export function DisclaimerScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Disclaimer</Text>
      <View style={styles.card}>
        <Text style={styles.body}>
          Steady is not a licensed therapist or medical service. If you are in crisis, contact emergency services or 988.
        </Text>
      </View>

      <Text style={styles.title}>Privacy Notice</Text>
      <View style={styles.card}>
        <Text style={styles.body}>
          Steady stores chat state locally on your device for continuity. For production release, replace this placeholder with a hosted
          privacy policy URL and full data handling disclosure.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.sm },
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginTop: spacing.sm },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: spacing.md },
  body: { color: colors.text, lineHeight: 22 },
});
