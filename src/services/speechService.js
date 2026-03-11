import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

let recording = null;
let isRecording = false;

/**
 * Speak text aloud using the device's TTS engine.
 * @param {string} text - Text to speak
 * @param {object} options - Speech options
 */
export function speak(text, options = {}) {
  Speech.speak(text, {
    language: 'en-US',
    pitch: 1.0,
    rate: 0.9,
    ...options,
    onDone: options.onDone,
    onError: options.onError,
  });
}

/**
 * Stop any ongoing speech.
 */
export function stopSpeaking() {
  Speech.stop();
}

/**
 * Check if the TTS engine is currently speaking.
 */
export async function isSpeaking() {
  return Speech.isSpeakingAsync();
}

/**
 * Request microphone permission.
 * @returns {boolean} - Whether permission was granted
 */
export async function requestMicrophonePermission() {
  const { granted } = await Audio.requestPermissionsAsync();
  return granted;
}

/**
 * Start recording audio from the microphone.
 * @returns {boolean} - Whether recording started successfully
 */
export async function startRecording() {
  if (isRecording) return false;

  const hasPermission = await requestMicrophonePermission();
  if (!hasPermission) return false;

  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );

    recording = newRecording;
    isRecording = true;
    return true;
  } catch {
    return false;
  }
}

/**
 * Stop recording and return the URI of the recorded audio file.
 * @returns {string|null} - URI of the recorded audio, or null on failure
 */
export async function stopRecording() {
  if (!isRecording || !recording) return null;

  try {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const uri = recording.getURI();
    recording = null;
    isRecording = false;
    return uri;
  } catch {
    recording = null;
    isRecording = false;
    return null;
  }
}

/**
 * Check if currently recording.
 */
export function getIsRecording() {
  return isRecording;
}
