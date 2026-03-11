import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/themes';
import {
  getApiKey,
  saveApiKey,
  getBaseUrl,
  saveBaseUrl,
} from '../services/aiService';

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.openai.com/v1');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [storedKey, storedUrl] = await Promise.all([getApiKey(), getBaseUrl()]);
      setApiKey(storedKey || '');
      setBaseUrl(storedUrl || 'https://api.openai.com/v1');
      setIsLoaded(true);
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      Alert.alert('API Key Required', 'Please enter your OpenAI API key to use Spark.');
      return;
    }

    if (!apiKey.trim().startsWith('sk-')) {
      Alert.alert(
        'Invalid API Key',
        'OpenAI API keys should start with "sk-". Please check your key and try again.',
      );
      return;
    }

    setIsSaving(true);
    try {
      await Promise.all([
        saveApiKey(apiKey.trim()),
        saveBaseUrl(baseUrl.trim() || 'https://api.openai.com/v1'),
      ]);
      Alert.alert('Saved!', 'Your settings have been saved. Spark is ready to help! 🚀');
    } catch {
      Alert.alert('Error', 'Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearKey = () => {
    Alert.alert(
      'Clear API Key',
      'Are you sure you want to remove your API key? You will need to re-enter it to use Spark.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await saveApiKey('');
            setApiKey('');
            Alert.alert('Cleared', 'API key has been removed.');
          },
        },
      ],
    );
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const isKeyConfigured = apiKey.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>⚙️</Text>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Configure your AI connection</Text>
        </View>

        <View style={[styles.statusCard, { backgroundColor: isKeyConfigured ? '#ECFDF5' : '#FFF7ED' }]}>
          <Text style={styles.statusEmoji}>{isKeyConfigured ? '✅' : '⚠️'}</Text>
          <View style={styles.statusText}>
            <Text style={[styles.statusTitle, { color: isKeyConfigured ? '#065F46' : '#92400E' }]}>
              {isKeyConfigured ? 'Spark is Ready!' : 'Setup Required'}
            </Text>
            <Text style={[styles.statusSubtitle, { color: isKeyConfigured ? '#047857' : '#B45309' }]}>
              {isKeyConfigured
                ? 'Your API key is configured. Enjoy Spark!'
                : 'Add your OpenAI API key to start using Spark'}
            </Text>
          </View>
        </View>

        <View style={[styles.section, SHADOWS.sm]}>
          <Text style={styles.sectionTitle}>🔑 OpenAI API Key</Text>
          <Text style={styles.sectionDescription}>
            Spark uses OpenAI's API for its AI responses. You need your own API key to use the app.
            Your key is stored securely on your device.
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.apiKeyInput}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="sk-..."
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry={!showKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setShowKey(!showKey)}
            >
              <Text style={styles.showButtonText}>{showKey ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {isKeyConfigured && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearKey}>
              <Text style={styles.clearButtonText}>Remove API Key</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.section, SHADOWS.sm]}>
          <Text style={styles.sectionTitle}>🌐 API Base URL</Text>
          <Text style={styles.sectionDescription}>
            Advanced: Change this if you're using a custom OpenAI-compatible endpoint (e.g., Azure OpenAI, local LLM).
          </Text>
          <TextInput
            style={styles.input}
            value={baseUrl}
            onChangeText={setBaseUrl}
            placeholder="https://api.openai.com/v1"
            placeholderTextColor={COLORS.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={COLORS.surface} />
          ) : (
            <Text style={styles.saveButtonText}>Save Settings</Text>
          )}
        </TouchableOpacity>

        <View style={[styles.section, SHADOWS.sm]}>
          <Text style={styles.sectionTitle}>📖 How to Get an API Key</Text>
          <View style={styles.steps}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>Go to platform.openai.com</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>Sign up or log in to your account</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>Navigate to API Keys section</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepText}>Create a new secret key and paste it above</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>5</Text>
              <Text style={styles.stepText}>Add billing info to enable API access</Text>
            </View>
          </View>
        </View>

        <View style={styles.privacyNote}>
          <Text style={styles.privacyTitle}>🔒 Privacy & Security</Text>
          <Text style={styles.privacyText}>
            Your API key is stored only on your device using secure encrypted storage. 
            Spark never collects or shares your conversations or personal data.
            All AI interactions go directly to OpenAI's servers using your key.
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
    ...SHADOWS.sm,
  },
  statusEmoji: {
    fontSize: 28,
  },
  statusText: {
    flex: 1,
  },
  statusTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  sectionDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  apiKeyInput: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  showButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  showButtonText: {
    fontSize: 20,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clearButton: {
    marginTop: SPACING.sm,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  steps: {
    gap: SPACING.sm,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    color: COLORS.surface,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  privacyNote: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  privacyTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  privacyText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
