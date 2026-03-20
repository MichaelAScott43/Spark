import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/themes';
import { MODES, PERSONAL_SUBTYPES, SYSTEM_PROMPTS, WELCOME_MESSAGES, QUICK_PROMPTS } from '../constants/prompts';
import ChatInterface from '../components/ChatInterface';

const SUBTYPES = [
  {
    id: PERSONAL_SUBTYPES.GENERAL,
    title: 'General Support',
    emoji: '💙',
    description: 'Comfort for any anxious moment',
    color: '#6B9BD2',
  },
  {
    id: PERSONAL_SUBTYPES.SOCIAL,
    title: 'Social Situations',
    emoji: '🤝',
    description: 'Navigate social anxiety with ease',
    color: '#8BC4A8',
  },
  {
    id: PERSONAL_SUBTYPES.WORK_STRESS,
    title: 'Work Stress',
    emoji: '💼',
    description: 'Manage workplace pressure',
    color: '#A78BFA',
  },
  {
    id: PERSONAL_SUBTYPES.RELATIONSHIPS,
    title: 'Relationships',
    emoji: '❤️',
    description: 'Navigate personal connections',
    color: '#F9A8D4',
  },
  {
    id: PERSONAL_SUBTYPES.BREATHING,
    title: 'Breathing Exercises',
    emoji: '🌬️',
    description: 'Calm your nervous system now',
    color: '#6EE7B7',
  },
];

export default function PersonalScreen({ navigation }) {
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [chatKey, setChatKey] = useState(0);

  const handleSelectSubtype = (subtype) => {
    setSelectedSubtype(subtype);
    setChatKey((k) => k + 1);
  };

  const handleBack = () => {
    setSelectedSubtype(null);
  };

  const handleNoApiKey = () => {
    navigation.navigate('Settings');
  };

  if (selectedSubtype) {
    const currentSubtype = SUBTYPES.find((s) => s.id === selectedSubtype);
    return (
      <SafeAreaView style={styles.chatContainer}>
        <View style={[styles.chatHeader, { backgroundColor: currentSubtype.color }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderTitle}>
            <Text style={styles.chatHeaderEmoji}>{currentSubtype.emoji}</Text>
            <Text style={styles.chatHeaderText}>{currentSubtype.title}</Text>
          </View>
          <View style={styles.backButtonPlaceholder} />
        </View>
        <ChatInterface
          key={chatKey}
          systemPrompt={SYSTEM_PROMPTS[MODES.PERSONAL][selectedSubtype]}
          welcomeMessage={WELCOME_MESSAGES[MODES.PERSONAL][selectedSubtype]}
          accentColor={currentSubtype.color}
          quickPrompts={QUICK_PROMPTS[MODES.PERSONAL][selectedSubtype]}
          onNoApiKey={handleNoApiKey}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.headerLogo}
            resizeMode="contain"
            accessibilityLabel="Spark App Logo"
          />
          <Text style={styles.headerEmoji}>💙</Text>
          <Text style={styles.headerTitle}>Personal Support</Text>
          <Text style={styles.headerSubtitle}>
            You are not alone. Choose the kind of support you need right now.
          </Text>
        </View>

        <View style={styles.affirmation}>
          <Text style={styles.affirmationText}>
            "You have survived every difficult day so far. You're doing better than you think."
          </Text>
        </View>

        <Text style={styles.sectionTitle}>What would you like help with?</Text>

        {SUBTYPES.map((subtype) => (
          <TouchableOpacity
            key={subtype.id}
            style={[styles.subtypeCard, SHADOWS.md]}
            onPress={() => handleSelectSubtype(subtype.id)}
            activeOpacity={0.85}
          >
            <View style={[styles.subtypeIconContainer, { backgroundColor: subtype.color + '22' }]}>
              <Text style={styles.subtypeEmoji}>{subtype.emoji}</Text>
            </View>
            <View style={styles.subtypeInfo}>
              <Text style={styles.subtypeTitle}>{subtype.title}</Text>
              <Text style={styles.subtypeDescription}>{subtype.description}</Text>
            </View>
            <Text style={[styles.arrow, { color: subtype.color }]}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.breathingReminder}>
          <Text style={styles.breathingReminderText}>
            💡 Tip: If you're feeling overwhelmed right now, try the Breathing Exercises for instant calm.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingTop: SPACING.md,
  },
  headerLogo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  headerEmoji: {
    fontSize: 52,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  affirmation: {
    backgroundColor: COLORS.primary + '15',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  affirmationText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  subtypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  subtypeIconContainer: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  subtypeEmoji: {
    fontSize: 26,
  },
  subtypeInfo: {
    flex: 1,
  },
  subtypeTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  subtypeDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  arrow: {
    fontSize: 28,
    fontWeight: '300',
  },
  breathingReminder: {
    backgroundColor: '#6EE7B7' + '20',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  breathingReminderText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  backButton: {
    paddingVertical: SPACING.xs,
    paddingRight: SPACING.md,
  },
  backButtonText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  chatHeaderTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  chatHeaderEmoji: {
    fontSize: 20,
  },
  chatHeaderText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  backButtonPlaceholder: {
    width: 60,
  },
});
