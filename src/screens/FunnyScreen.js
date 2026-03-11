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
import { MODES, SYSTEM_PROMPTS, WELCOME_MESSAGES, QUICK_PROMPTS } from '../constants/prompts';
import ChatInterface from '../components/ChatInterface';

const JOKE_CATEGORIES = [
  { emoji: '😅', label: 'Dad Jokes', prompt: 'Hit me with your worst dad joke!' },
  { emoji: '😂', label: 'Random Funny', prompt: 'Say something completely random and funny' },
  { emoji: '🤣', label: 'Cheer Me Up', prompt: 'I need cheering up - make me laugh!' },
  { emoji: '🙄', label: 'Monday Vibes', prompt: 'Tell me something funny about Mondays' },
  { emoji: '😆', label: 'Adulting', prompt: 'Why is adulting so hard? Make it funny' },
  { emoji: '🎭', label: 'Puns', prompt: 'Give me the most terrible pun you have' },
];

export default function FunnyScreen({ navigation }) {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [initialPrompt, setInitialPrompt] = useState(null);

  const handleStartChat = (prompt = null) => {
    setInitialPrompt(prompt);
    setChatStarted(true);
    setChatKey((k) => k + 1);
  };

  const handleBack = () => {
    setChatStarted(false);
    setInitialPrompt(null);
  };

  const handleNoApiKey = () => {
    navigation.navigate('Settings');
  };

  if (chatStarted) {
    return (
      <SafeAreaView style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderTitle}>
            <Text style={styles.chatHeaderText}>😂 Spark Comedy Hour</Text>
          </View>
          <View style={styles.backButtonPlaceholder} />
        </View>
        <ChatInterface
          key={chatKey}
          systemPrompt={SYSTEM_PROMPTS[MODES.FUNNY]}
          welcomeMessage={WELCOME_MESSAGES[MODES.FUNNY]}
          accentColor={COLORS.funny}
          quickPrompts={QUICK_PROMPTS[MODES.FUNNY]}
          onNoApiKey={handleNoApiKey}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>😂</Text>
          <Text style={styles.headerTitle}>Comedy Zone</Text>
          <Text style={styles.headerSubtitle}>
            Life's too short to be serious all the time. Let's laugh!
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.bigLaunchButton, SHADOWS.lg]}
          onPress={() => handleStartChat()}
          activeOpacity={0.85}
        >
          <Text style={styles.bigLaunchEmoji}>🎉</Text>
          <Text style={styles.bigLaunchTitle}>Start Laughing</Text>
          <Text style={styles.bigLaunchSubtitle}>Chat with Spark's comedy AI</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Quick Laugh Starters</Text>

        <View style={styles.categoryGrid}>
          {JOKE_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.label}
              style={[styles.categoryCard, SHADOWS.sm]}
              onPress={() => handleStartChat(category.prompt)}
              activeOpacity={0.85}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>⚠️ Humor Warning</Text>
          <Text style={styles.disclaimerText}>
            Side effects may include: uncontrollable laughter, snorting, 
            accidentally spitting out your coffee, and an inexplicable urge 
            to tell your friends bad jokes.
          </Text>
          <Text style={styles.disclaimerSmall}>
            Spark's jokes are family-friendly and designed to bring smiles, never offense. 😊
          </Text>
        </View>

        <View style={styles.funFacts}>
          <Text style={styles.funFactsTitle}>🧠 Did You Know?</Text>
          <Text style={styles.funFactText}>
            • Laughter reduces stress hormones by up to 70%
          </Text>
          <Text style={styles.funFactText}>
            • A good laugh burns up to 40 calories
          </Text>
          <Text style={styles.funFactText}>
            • Children laugh ~400 times a day. Adults: ~15 times 😅
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
  bigLaunchButton: {
    backgroundColor: COLORS.funny,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  bigLaunchEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  bigLaunchTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.surface,
    marginBottom: SPACING.xs,
  },
  bigLaunchSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.surface,
    opacity: 0.85,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.funny + '40',
  },
  categoryEmoji: {
    fontSize: 36,
    marginBottom: SPACING.xs,
  },
  categoryLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  disclaimerBox: {
    backgroundColor: COLORS.funny + '15',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.funny + '40',
  },
  disclaimerTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.funnyDark,
    marginBottom: SPACING.xs,
  },
  disclaimerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  disclaimerSmall: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
  },
  funFacts: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  funFactsTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  funFactText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.funny,
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
    alignItems: 'center',
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
