import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { LargeButton } from '../components/LargeButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing } from '../constants/theme';
import { countries, CountryCode } from '../data/resources';
import { useAppState } from '../context/AppContext';

export function OnboardingScreen() {
  const { completeOnboarding } = useAppState();
  const [country, setCountry] = useState<CountryCode>('US');
  const [veteranMode, setVeteranMode] = useState(false);

  return (
    <ScreenContainer title="Welcome to Steady">
      <Text style={styles.body}>
        Steady supports coping and safety planning. It does not diagnose conditions and does not replace therapy or emergency care.
      </Text>
      <Text style={styles.label}>Choose your country</Text>
      <View style={styles.rowWrap}>
        {countries.map((item) => (
          <LargeButton key={item.value} label={item.label} onPress={() => setCountry(item.value)} variant={country === item.value ? 'primary' : 'secondary'} />
        ))}
      </View>
      <View style={styles.toggleRow}>
        <Text style={styles.label}>Veteran mode</Text>
        <Switch value={veteranMode} onValueChange={setVeteranMode} />
      </View>
      <LargeButton label="I Understand & Continue" onPress={() => completeOnboarding(country, veteranMode)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { color: colors.text, marginBottom: spacing.md, fontSize: 16, lineHeight: 22 },
  label: { color: colors.text, fontWeight: '600', marginBottom: spacing.sm },
  rowWrap: { marginBottom: spacing.md },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
});
