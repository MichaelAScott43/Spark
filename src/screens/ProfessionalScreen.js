import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/themes';
import { MODES, PROFESSIONAL_SUBTYPES, SYSTEM_PROMPTS, WELCOME_MESSAGES, QUICK_PROMPTS } from '../constants/prompts';
import ChatInterface from '../components/ChatInterface';

const SUBTYPES = [
  {
    id: PROFESSIONAL_SUBTYPES.EMAIL_DRAFTING,
    title: 'Cold Email Drafting',
    emoji: '📧',
    description: 'Craft compelling cold outreach emails that get responses',
    color: COLORS.professional,
    features: ['Personalized subject lines', 'Value-focused messaging', 'Clear call-to-action'],
  },
  {
    id: PROFESSIONAL_SUBTYPES.SALES_PRACTICE,
    title: 'Sales Practice',
    emoji: '💼',
    description: 'Practice your pitch with a realistic AI prospect',
    color: '#059669',
    features: ['Real objection handling', 'Interactive role-play', 'Coaching feedback'],
  },
  {
    id: PROFESSIONAL_SUBTYPES.INTERVIEW_PREP,
    title: 'Interview Preparation',
    emoji: '🎯',
    description: 'Ace your next interview with mock interview practice',
    color: '#7C3AED',
    features: ['Behavioral questions', 'STAR method guidance', 'Personalized feedback'],
  },
];

export default function ProfessionalScreen({ navigation }) {
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
          systemPrompt={SYSTEM_PROMPTS[MODES.PROFESSIONAL][selectedSubtype]}
          welcomeMessage={WELCOME_MESSAGES[MODES.PROFESSIONAL][selectedSubtype]}
          accentColor={currentSubtype.color}
          quickPrompts={QUICK_PROMPTS[MODES.PROFESSIONAL][selectedSubtype]}
          onNoApiKey={handleNoApiKey}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>💡</Text>
          <Text style={styles.headerTitle}>Professional Tools</Text>
          <Text style={styles.headerSubtitle}>
            Build confidence in your professional life with AI-powered practice and assistance.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>📧</Text>
            <Text style={styles.statLabel}>Cold Emails</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>🎯</Text>
            <Text style={styles.statLabel}>Interview Prep</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>💼</Text>
            <Text style={styles.statLabel}>Sales Practice</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose Your Tool</Text>

        {SUBTYPES.map((subtype) => (
          <TouchableOpacity
            key={subtype.id}
            style={[styles.subtypeCard, SHADOWS.md]}
            onPress={() => handleSelectSubtype(subtype.id)}
            activeOpacity={0.85}
          >
            <View style={[styles.subtypeHeader, { backgroundColor: subtype.color }]}>
              <Text style={styles.subtypeEmoji}>{subtype.emoji}</Text>
              <Text style={styles.subtypeTitle}>{subtype.title}</Text>
            </View>
            <View style={styles.subtypeBody}>
              <Text style={styles.subtypeDescription}>{subtype.description}</Text>
              <View style={styles.featureList}>
                {subtype.features.map((feature) => (
                  <View key={feature} style={styles.featureItem}>
                    <Text style={[styles.featureCheck, { color: subtype.color }]}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[styles.startButton, { backgroundColor: subtype.color }]}
                onPress={() => handleSelectSubtype(subtype.id)}
              >
                <Text style={styles.startButtonText}>Start Session →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Pro Tip</Text>
          <Text style={styles.tipText}>
            Use the voice button during Sales Practice to simulate a real phone call. 
            Speak your pitch out loud for the most realistic experience!
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
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  subtypeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  subtypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  subtypeEmoji: {
    fontSize: 24,
  },
  subtypeTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.surface,
  },
  subtypeBody: {
    padding: SPACING.md,
  },
  subtypeDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  featureList: {
    marginBottom: SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  featureCheck: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  featureText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  startButton: {
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  startButtonText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  tipBox: {
    backgroundColor: COLORS.professional + '15',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.professional,
  },
  tipTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  tipText: {
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
