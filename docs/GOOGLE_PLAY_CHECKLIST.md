# Steady Google Play Checklist

## 1) Production build setup

1. Install deps:
   - `npm install`
2. Configure EAS (one time):
   - `npx expo login`
   - `npx eas build:configure`
3. Build Android AAB for Google Play:
   - `npx eas build --platform android --profile production`
4. For local APK smoke testing:
   - `npx expo run:android`

## 2) Play Console submission steps

1. Create app in Play Console named **Steady**.
2. Complete store listing (short description, full description, category, contact details).
3. Upload AAB from EAS build output.
4. Complete Data Safety form with final production backend/storage details.
5. Fill App Content declarations (not medical / not therapy service).
6. Add privacy policy public URL (replace placeholder in docs/PRIVACY_POLICY_PLACEHOLDER.md).
7. Submit to internal testing track, validate, then promote to production.

## 3) Required assets

- App icon: 512 x 512
- Feature graphic: 1024 x 500
- Phone screenshots (minimum 2)
- Optional 7-inch / 10-inch tablet screenshots

## 4) Permissions

- `RECORD_AUDIO` for voice input
- In-app explanation: microphone is only used for optional voice chat input

## 5) Safety and disclosure checks

- In-app disclaimer visible in Settings > Disclaimer.
- Safety override response includes 988 guidance for US users.
- App messaging avoids therapy / diagnosis claims.
