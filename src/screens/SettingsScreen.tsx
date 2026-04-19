import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';

export function SettingsScreen({ navigation }: any) {
  const { selectedCharacter, chooseCharacter, voiceEnabled, setVoiceEnabled, resetConversation } = useAppState();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Character</Text>
        <View style={styles.row}>
          <Pressable
            style={[styles.option, selectedCharacter === 'tj' && styles.active]}
            onPress={() => chooseCharacter('tj')}
          >
            <Text style={styles.optionText}>TJ</Text>
          </Pressable>
          <Pressable
            style={[styles.option, selectedCharacter === 'arlane' && styles.active]}
            onPress={() => chooseCharacter('arlane')}
          >
            <Text style={styles.optionText}>Arlane</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.heading}>Voice replies</Text>
          <Switch value={voiceEnabled} onValueChange={setVoiceEnabled} thumbColor={voiceEnabled ? colors.primary : '#666'} />
        </View>
        <Text style={styles.caption}>When enabled, character responses are spoken aloud.</Text>
      </View>

      <Pressable style={styles.link} onPress={() => navigation.navigate('Disclaimer')}>
        <Text style={styles.linkText}>Disclaimer & Privacy Notice</Text>
      </Pressable>

      <Pressable style={styles.reset} onPress={resetConversation}>
        <Text style={styles.resetText}>Clear chat session</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  title: { color: colors.text, fontSize: 30, fontWeight: '700', marginBottom: spacing.md },
  card: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md },
  heading: { color: colors.text, fontSize: 18, fontWeight: '700' },
  row: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  option: { flex: 1, padding: spacing.md, borderRadius: 12, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  active: { borderColor: colors.primary, backgroundColor: '#202A40' },
  optionText: { color: colors.text, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  caption: { color: colors.muted, marginTop: spacing.sm },
  link: { paddingVertical: spacing.md },
  linkText: { color: colors.primary, fontWeight: '600' },
  reset: { marginTop: spacing.lg, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: spacing.md, alignItems: 'center' },
  resetText: { color: colors.muted },
});
