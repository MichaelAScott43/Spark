# Spark 💙

**Your AI-powered companion for anxiety relief, professional growth, and a good laugh.**

Spark is a cross-platform mobile app (iOS & Android) built with React Native (Expo) that provides meaningful AI-driven support across three core areas of life.

---

## Features

### 💙 Personal Mode
Comfort and support for every anxious moment in your life:
- **General Support** – Real-time comfort and grounding techniques for any anxious situation
- **Social Situations** – Navigate social anxiety, small talk, parties, and new relationships
- **Work Stress** – Manage workplace pressure, difficult meetings, and fear of failure
- **Relationships** – Get help with hard conversations, expressing feelings, and connection
- **Breathing Exercises** – Guided 4-7-8 and box breathing for instant calm

### 💼 Professional Mode
Build confidence in your professional life:
- **Cold Email Drafting** – AI generates compelling, personalized cold outreach emails with subject lines, value propositions, and calls-to-action
- **Sales Practice** – Role-play with an AI prospect to practice handling objections and refine your pitch
- **Interview Preparation** – Mock interview sessions with behavioral questions, STAR method guidance, and personalized feedback

### 😂 Funny Mode
Interactive humor for when you need a smile:
- Chat with an AI comedian that responds to everything with wit and humor
- Quick laugh starters: Dad jokes, puns, adulting humor, cheer-me-up sessions
- Family-friendly, never offensive

### 🎤 Voice Functionality
- **Text-to-Speech** – Spark speaks all its responses aloud using your device's TTS engine
- **Voice Input** – Record your voice and have it transcribed automatically (requires OpenAI Whisper API)
- Tap the microphone button in any chat to speak instead of type
- Tap the speaking banner to stop Spark from talking

---

## Getting Started

### Prerequisites
- Node.js 18+
- [Expo Go](https://expo.dev/go) app on your phone (for testing)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
git clone https://github.com/MichaelAScott43/Spark.git
cd Spark
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

### API Key Setup

Spark requires an OpenAI API key:

1. Go to the **Settings** tab in the app
2. Enter your OpenAI API key (starts with `sk-`)
3. Tap **Save Settings**

Your API key is stored securely on your device using encrypted AsyncStorage. It is never shared with anyone.

> **Note:** You need a funded OpenAI account. The app uses `gpt-4o-mini` for chat (very affordable) and `whisper-1` for voice transcription.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React Native (Expo) | Cross-platform iOS & Android |
| React Navigation | Tab + Stack navigation |
| expo-speech | Text-to-speech output |
| expo-av | Audio recording for voice input |
| OpenAI API (gpt-4o-mini) | AI chat responses |
| OpenAI Whisper API | Voice transcription |
| AsyncStorage | Secure local key storage |

---

## Running the App

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS required)
npm run ios
```

---

## Privacy

- All data stays on your device
- API keys are stored in encrypted local storage
- Conversations are sent directly to OpenAI's servers using your own API key
- No data is collected by Spark

---

## License

MIT
