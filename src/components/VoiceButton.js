import React, { useState, useCallback, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS, RADIUS, SHADOWS } from '../constants/themes';
import {
  startRecording,
  stopRecording,
  requestMicrophonePermission,
} from '../services/speechService';
import { getApiKey } from '../services/aiService';

/**
 * VoiceButton - Records audio from the microphone.
 * When recording stops, it submits the audio to a transcription API
 * (if an API key is configured) or prompts the user to type instead.
 */
export default function VoiceButton({ onTranscript, accentColor, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef(null);

  const startPulse = useCallback(() => {
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.current.start();
  }, [pulseAnim]);

  const stopPulse = useCallback(() => {
    pulseLoop.current?.stop();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [pulseAnim]);

  const handlePress = useCallback(async () => {
    if (disabled) return;

    if (isRecording) {
      // Stop recording and process
      stopPulse();
      setIsRecording(false);
      setIsProcessing(true);

      const uri = await stopRecording();
      setIsProcessing(false);

      if (!uri) {
        Alert.alert('Recording Error', 'Could not capture audio. Please type your message instead.');
        return;
      }

      // Try to transcribe using OpenAI Whisper API
      const apiKey = await getApiKey();
      if (!apiKey) {
        Alert.alert(
          'Voice Transcription',
          'To use voice input, please add your OpenAI API key in Settings. You can type your message instead.',
        );
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: 'audio.m4a',
          type: 'audio/m4a',
        });
        formData.append('model', 'whisper-1');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Transcription failed: ${response.status}`);
        }

        const data = await response.json();
        if (data.text) {
          onTranscript(data.text);
        }
      } catch {
        Alert.alert(
          'Transcription Error',
          'Could not transcribe audio. Please type your message instead.',
        );
      }
    } else {
      // Start recording
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          'Microphone Permission',
          'Spark needs microphone access to use voice input. Please enable it in Settings.',
        );
        return;
      }

      const started = await startRecording();
      if (started) {
        setIsRecording(true);
        startPulse();
      } else {
        Alert.alert('Recording Error', 'Could not start recording. Please try again.');
      }
    }
  }, [disabled, isRecording, onTranscript, startPulse, stopPulse]);

  if (isProcessing) {
    return (
      <ActivityIndicator
        size="small"
        color={accentColor || COLORS.primary}
        style={styles.processingIndicator}
      />
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <TouchableOpacity
        style={[
          styles.voiceButton,
          {
            backgroundColor: isRecording
              ? COLORS.error
              : accentColor || COLORS.primary,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={handlePress}
        disabled={disabled && !isRecording}
        activeOpacity={0.8}
      >
        <Text style={styles.micIcon}>{isRecording ? '⏹' : '🎤'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  micIcon: {
    fontSize: 18,
  },
  processingIndicator: {
    width: 40,
    height: 40,
  },
});
