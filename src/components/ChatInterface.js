import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/themes';
import { streamChatResponse } from '../services/aiService';
import { speak, stopSpeaking } from '../services/speechService';
import VoiceButton from './VoiceButton';

export default function ChatInterface({
  systemPrompt,
  welcomeMessage,
  accentColor = COLORS.primary,
  quickPrompts = [],
  onNoApiKey,
}) {
  const [messages, setMessages] = useState([
    { id: '0', role: 'assistant', content: welcomeMessage },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const flatListRef = useRef(null);
  const abortRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const handleSend = useCallback(
    async (text) => {
      const trimmed = (text || inputText).trim();
      if (!trimmed || isLoading) return;

      setInputText('');
      stopSpeaking();
      setIsSpeakingResponse(false);

      const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setStreamingMessage('');
      scrollToBottom();

      const conversationHistory = messages
        .filter((m) => m.id !== '0')
        .concat(userMessage)
        .map(({ role, content }) => ({ role, content }));

      let fullResponse = '';

      const abort = await streamChatResponse(
        conversationHistory,
        systemPrompt,
        (chunk, full) => {
          fullResponse = full;
          setStreamingMessage(full);
          scrollToBottom();
        },
        (finalText) => {
          const aiMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: finalText,
          };
          setMessages((prev) => [...prev, aiMessage]);
          setStreamingMessage('');
          setIsLoading(false);
          scrollToBottom();

          // Auto-speak the AI response
          setIsSpeakingResponse(true);
          speak(finalText, {
            onDone: () => setIsSpeakingResponse(false),
            onError: () => setIsSpeakingResponse(false),
          });
        },
        (err) => {
          setIsLoading(false);
          setStreamingMessage('');
          if (err.message === 'NO_API_KEY') {
            onNoApiKey?.();
          } else {
            const errorMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Sorry, I ran into an issue: ${err.message}. Please try again.`,
              isError: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
          }
          scrollToBottom();
        },
      );

      abortRef.current = abort;
    },
    [inputText, isLoading, messages, systemPrompt, scrollToBottom, onNoApiKey],
  );

  const handleVoiceInput = useCallback(
    (transcript) => {
      if (transcript) {
        handleSend(transcript);
      }
    },
    [handleSend],
  );

  const handleStopSpeaking = useCallback(() => {
    stopSpeaking();
    setIsSpeakingResponse(false);
  }, []);

  const renderMessage = useCallback(
    ({ item }) => {
      const isUser = item.role === 'user';
      return (
        <View
          style={[
            styles.messageRow,
            isUser ? styles.userRow : styles.aiRow,
          ]}
        >
          {!isUser && (
            <View style={[styles.avatar, { backgroundColor: accentColor }]}>
              <Text style={styles.avatarText}>S</Text>
            </View>
          )}
          <View
            style={[
              styles.bubble,
              isUser
                ? [styles.userBubble, { backgroundColor: accentColor }]
                : [styles.aiBubble, item.isError && styles.errorBubble],
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isUser ? styles.userText : styles.aiText,
              ]}
            >
              {item.content}
            </Text>
          </View>
        </View>
      );
    },
    [accentColor],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          streamingMessage ? (
            <View style={styles.messageRow}>
              <View style={[styles.avatar, { backgroundColor: accentColor }]}>
                <Text style={styles.avatarText}>S</Text>
              </View>
              <View style={styles.aiBubble}>
                <Text style={styles.aiText}>{streamingMessage}</Text>
                <ActivityIndicator
                  size="small"
                  color={accentColor}
                  style={styles.streamingIndicator}
                />
              </View>
            </View>
          ) : isLoading && !streamingMessage ? (
            <View style={styles.messageRow}>
              <View style={[styles.avatar, { backgroundColor: accentColor }]}>
                <Text style={styles.avatarText}>S</Text>
              </View>
              <View style={[styles.aiBubble, styles.typingBubble]}>
                <View style={styles.typingDots}>
                  <TypingDot delay={0} color={accentColor} />
                  <TypingDot delay={200} color={accentColor} />
                  <TypingDot delay={400} color={accentColor} />
                </View>
              </View>
            </View>
          ) : null
        }
      />

      {quickPrompts.length > 0 && messages.length <= 1 && (
        <View style={styles.quickPromptsContainer}>
          <FlatList
            horizontal
            data={quickPrompts}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickPromptsList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.quickPrompt, { borderColor: accentColor }]}
                onPress={() => handleSend(item)}
              >
                <Text style={[styles.quickPromptText, { color: accentColor }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {isSpeakingResponse && (
        <TouchableOpacity
          style={[styles.stopSpeakingBanner, { backgroundColor: accentColor }]}
          onPress={handleStopSpeaking}
        >
          <Text style={styles.stopSpeakingText}>🔊 Tap to stop speaking</Text>
        </TouchableOpacity>
      )}

      <View style={styles.inputContainer}>
        <VoiceButton
          onTranscript={handleVoiceInput}
          accentColor={accentColor}
          disabled={isLoading}
        />
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.textMuted}
          multiline
          maxLength={1000}
          onSubmitEditing={() => handleSend()}
          returnKeyType="send"
          blurOnSubmit
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: inputText.trim() && !isLoading ? accentColor : COLORS.border },
          ]}
          onPress={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function TypingDot({ delay, color }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [delay, opacity]);

  return (
    <Animated.View
      style={[styles.typingDot, { backgroundColor: color, opacity }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  messageList: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'flex-end',
    maxWidth: '100%',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginBottom: 2,
    flexShrink: 0,
  },
  avatarText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
  },
  userBubble: {
    borderBottomRightRadius: RADIUS.xs || 4,
  },
  aiBubble: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: RADIUS.xs || 4,
  },
  errorBubble: {
    backgroundColor: '#FFEBEE',
  },
  typingBubble: {
    paddingVertical: SPACING.md,
  },
  messageText: {
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.userBubbleText,
  },
  aiText: {
    color: COLORS.aiBubbleText,
  },
  streamingIndicator: {
    marginTop: SPACING.xs,
    alignSelf: 'flex-start',
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  quickPromptsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.sm,
  },
  quickPromptsList: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  quickPrompt: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    backgroundColor: COLORS.surface,
  },
  quickPromptText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  stopSpeakingBanner: {
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  stopSpeakingText: {
    color: COLORS.surface,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.sm,
    gap: SPACING.sm,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
