# Steady (Expo + TypeScript)

Steady is a calm, minimal React Native app focused on emotional support workflows without diagnosis or therapy claims.

## Included features

- Onboarding with safety disclaimer
- Daily mood check-in (1–5)
- Journal with rotating prompts
- AI reflection summaries (wellness summary text)
- Voice support with language detection + male/female voice preference
- **Help Now** screen:
  - Calm Me Now
  - Contact Someone I Trust
  - Crisis Support Now
- Safety plan with trusted contacts
- Optional location sharing only when user triggers help
- Pattern tracking for mood and journaling trends
- Global support:
  - Country selection
  - Country-based crisis resources
  - Veteran mode toggle
  - US flag shown only for US veteran resources

## Design goals applied

- Calm, minimal dark-friendly UI
- Large buttons for distressed users
- Clear language that avoids diagnosis and therapy framing
- Crisis escalation path in Help Now

## Run locally

```bash
npm install
npm run start
```

Then launch on device/simulator:

```bash
npm run android
npm run ios
```

## Project structure

```text
.
├── App.tsx
├── src
│   ├── components
│   │   ├── LargeButton.tsx
│   │   └── ScreenContainer.tsx
│   ├── constants
│   │   └── theme.ts
│   ├── context
│   │   └── AppContext.tsx
│   ├── data
│   │   └── resources.ts
│   ├── navigation
│   │   └── RootNavigator.tsx
│   ├── screens
│   │   ├── CheckInScreen.tsx
│   │   ├── HelpNowScreen.tsx
│   │   ├── JournalScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── PatternsScreen.tsx
│   │   ├── SafetyPlanScreen.tsx
│   │   └── VoiceSupportScreen.tsx
│   └── utils
│       ├── language.ts
│       └── reflection.ts
└── tsconfig.json
```

## Safety notes

Steady provides wellness-oriented guidance only. It does **not** diagnose, provide therapy, or replace emergency services. If someone may be in immediate danger, use local emergency resources right away.
