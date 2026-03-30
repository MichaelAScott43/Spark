import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { LargeButton } from '../components/LargeButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { countryResources } from '../data/resources';
import { useAppState } from '../context/AppContext';

export function HelpNowScreen() {
  const { country, veteranMode, trustedContacts, shareLocationOnHelp } = useAppState();
  const resources = countryResources[country].filter((r) => (veteranMode ? true : !r.veteranOnly));

  return (
    <ScreenContainer title="Help Now">
      <Text style={styles.warning}>If you might act on self-harm thoughts, contact emergency or crisis support now.</Text>
      <LargeButton label="Calm Me Now" onPress={() => Alert.alert('Breathe', 'Inhale for 4, hold for 4, exhale for 6. Repeat for 1 minute.')} />
      <LargeButton
        label="Contact Someone I Trust"
        onPress={() =>
          Alert.alert(
            'Trusted contacts',
            trustedContacts.length
              ? `Reach out to: ${trustedContacts.join(', ')}${shareLocationOnHelp ? '. Your location can be shared now.' : ''}`
              : 'No trusted contacts saved yet. Add one in Safety Plan.',
          )
        }
        variant="secondary"
      />
      <LargeButton label="Crisis Support Now" variant="danger" onPress={() => Alert.alert('Crisis resources', resources.map((r) => `${r.name}: ${r.contact}`).join('\n'))} />
      <Text style={styles.section}>Your country resources:</Text>
      {resources.map((resource) => (
        <Text key={resource.name} style={styles.resource}>
          {resource.veteranOnly && country === 'US' ? '🇺🇸 ' : ''}
          {resource.name} — {resource.contact}
        </Text>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  warning: { color: colors.danger, marginBottom: spacing.md, fontWeight: '600' },
  section: { color: colors.text, marginTop: spacing.sm, marginBottom: spacing.xs, fontWeight: '700' },
  resource: { color: colors.muted, marginBottom: spacing.xs },
});
