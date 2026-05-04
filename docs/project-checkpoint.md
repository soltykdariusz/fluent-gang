# Fluent Gang Project Checkpoint

This document captures the current product and implementation assumptions after the first MVP foundation pass.

## Current Corrections

1. The yellow focus badge is no longer part of the brand or UI direction. It has been replaced by the Home button in the bottom dock.
2. Dark mode is not complete. The project currently has theme tokens, a provider, a Settings toggle, and partial shared-component support.
3. Production ads before lessons should be 15 seconds. MVP/dev uses a 2-second mock ad gate to keep testing fast.
4. OpenAI and Supabase are architecturally prepared but not connected to real runtime flows yet.
5. The slogan is not fully resolved. Branding currently says "You can be fluent.", while the bottom dock says "You will be fluent."
6. Fluent Gang characters are a concept documented in `docs/characters.md`; they are not implemented yet.
7. Game mode, social competition, company plans, and monetization are product concepts, not current MVP runtime features.

## Current Runtime MVP

- Expo React Native app with TypeScript.
- Local onboarding and language/level selection.
- Mock vocabulary and mock lesson generation.
- Reading, context quiz, definitions, definition quiz, shadowing, focus timer, and progress placeholders.
- 2-second mock ad gate before lesson generation.
- Bottom dock with Home, timer, brand link, and level progress.
- Initial light/dark theme foundation.

## Next Recommended Slice

Build a stronger lesson completion loop:

- pass real quiz scores through the lesson flow
- add a Lesson Complete screen
- update word progress more realistically
- prepare review scheduling from actual lesson results
