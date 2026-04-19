import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing } from '../constants/theme';
import { useAppState } from '../context/AppContext';
import { SupportMode } from '../types/chat';

const modeOptions: { key: SupportMode; label: string }[] = [
  { key: 'vent', label: 'I just need to vent' },
  { key: 'calm', label: 'Help me calm down' },
  { key: 'coach', label: 'Talk me through this' },
];

export function ChatScreen() {
  const { messages, sendMessage, selectedCharacter, isTyping, mode, setMode, voiceEnabled } = useAppState();
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  const accentColor = selectedCharacter === 'tj' ? colors.tj : colors.arlane;
  const characterName = selectedCharacter === 'tj' ? 'TJ' : 'Arlane';

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const onSend = async () => {
    if (!canSend) return;
    const text = input;
    setInput('');
    await sendMessage(text);
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{characterName}</Text>
        <Text style={[styles.headerSub, { color: accentColor }]}>{voiceEnabled ? 'Voice replies on' : 'Text replies'}</Text>
      </View>

      <View style={styles.modeRow}>
        {modeOptions.map((m) => (
          <Pressable key={m.key} style={[styles.modePill, mode === m.key && { borderColor: accentColor }]} onPress={() => setMode(m.key)}>
            <Text style={[styles.modeText, mode === m.key && { color: colors.text }]}>{m.label}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messages}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : [styles.botBubble, { borderColor: accentColor }]]}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Start the conversation whenever you are ready.</Text>}
        ListFooterComponent={isTyping ? <Text style={styles.typing}>Typing…</Text> : null}
      />

      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Type what's going on..."
          placeholderTextColor={colors.muted}
          value={input}
          multiline
          onChangeText={setInput}
        />
        <Pressable style={[styles.sendButton, { backgroundColor: accentColor }]} onPress={onSend}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>

      <Pressable style={styles.voiceButton} onPress={() => inputRef.current?.focus()}>
        <Text style={styles.voiceText}>Voice Input: tap keyboard mic after focusing text field</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, paddingTop: spacing.md },
  header: { paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  headerTitle: { color: colors.text, fontSize: 28, fontWeight: '700' },
  headerSub: { fontSize: 14, marginTop: 2 },
  modeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  modePill: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 10, backgroundColor: colors.card },
  modeText: { color: colors.muted, fontSize: 12 },
  messages: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  bubble: { borderRadius: 16, padding: spacing.md, marginBottom: spacing.sm, maxWidth: '92%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  botBubble: { alignSelf: 'flex-start', backgroundColor: colors.card, borderWidth: 1 },
  bubbleText: { color: '#fff', lineHeight: 20 },
  typing: { color: colors.muted, paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  empty: { color: colors.muted, textAlign: 'center', marginTop: spacing.xl },
  inputRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  input: {
    flex: 1,
    color: colors.text,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 120,
  },
  sendButton: { justifyContent: 'center', alignItems: 'center', borderRadius: 12, minWidth: 72, paddingHorizontal: spacing.md },
  sendText: { color: 'white', fontWeight: '700' },
  voiceButton: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
  },
  voiceText: { color: colors.muted, fontWeight: '500', textAlign: 'center' },
});
