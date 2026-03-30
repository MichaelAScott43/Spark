import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { LargeButton } from '../components/LargeButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';

export function SafetyPlanScreen() {
  const { trustedContacts, addTrustedContact, shareLocationOnHelp, setShareLocationOnHelp } = useAppState();
  const [name, setName] = useState('');

  return (
    <ScreenContainer title="Safety Plan">
      <Text style={styles.text}>Add trusted contacts for fast support.</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Contact name"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      <LargeButton
        label="Add contact"
        onPress={() => {
          if (name.trim()) {
            addTrustedContact(name.trim());
            setName('');
          }
        }}
      />
      {trustedContacts.map((contact) => (
        <Text key={contact} style={styles.contact}>• {contact}</Text>
      ))}
      <View style={styles.switchRow}>
        <Text style={styles.text}>Share location only when I trigger Help Now</Text>
        <Switch value={shareLocationOnHelp} onValueChange={setShareLocationOnHelp} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, marginBottom: spacing.sm },
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
  },
  contact: { color: colors.muted, marginBottom: spacing.xs },
  switchRow: { marginTop: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
});
