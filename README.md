# Steady (Expo React Native)

Steady is a non-clinical emotional support companion app with two AI-style characters:

- **TJ** – sarcastic, blunt, southern tough-love support
- **Arlane** – warm, calm, grandmother-style comfort support

> Steady is **not** a therapy app and does not provide medical advice.

## MVP Included

- Character selection at first launch
- Real-time chat UI with bubbles + typing indicator
- Session memory (for active app session)
- Voice mode:
  - speech-to-text input (microphone)
  - text-to-speech replies
  - toggle in settings
- Persona engine modules:
  - `src/personas/tj.ts`
  - `src/personas/arlane.ts`
  - `src/services/responseRouter.ts`
- Safety module override:
  - `src/safety/index.ts`
  - crisis detection for self-harm / suicidal language
  - automatic 988 + emergency guidance
- Quick support modes:
  - I just need to vent
  - Help me calm down
  - Talk me through this
- Settings:
  - switch character
  - voice on/off
  - disclaimer + privacy notice
- Google Play checklist:
  - `docs/GOOGLE_PLAY_CHECKLIST.md`

## Required disclaimer

Steady is not a licensed therapist or medical service. If you are in crisis, contact emergency services or 988.

## Run locally

```bash
npm install
npm run start
```

Run on Android:

```bash
npm run android
```

## Build for Google Play

Use EAS build:

```bash
npx eas build --platform android --profile production
```

Full submission checklist is in `docs/GOOGLE_PLAY_CHECKLIST.md`.
