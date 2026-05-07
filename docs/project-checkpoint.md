# Fluent Gang Project Checkpoint

This document captures the current product and implementation assumptions after the MVP flow refactor.

## Current Corrections

1. The yellow focus badge is no longer part of the brand or UI direction. It has been replaced by the Home button in the bottom dock.
2. Dark mode is not complete. The project currently has theme tokens, a provider, a Settings toggle, and partial shared-component support.
3. Production ads before lessons should be 15 seconds. MVP/dev uses a 2-second mock ad gate to keep testing fast.
4. OpenAI and Supabase are architecturally prepared but not connected to real runtime flows yet.
5. The slogan is not fully resolved. Branding currently says "You can be fluent.", while the bottom dock says "You will be fluent."
6. Fluent Gang characters are a concept documented in `docs/characters.md`; they are not implemented yet.
7. Game mode, social competition, company plans, and monetization are product concepts, not current MVP runtime features.
8. Fluent Gang is now defined as a contextual vocabulary growth engine, not a general language learning app.
9. English may be the first fully supported MVP target vocabulary language, but the product is not conceptually English-first.
10. The final MVP learning flow is session-based and sentence-based: one new/trained word equals one simple context sentence.
11. Long texts, articles, and complex stories are de-emphasized for MVP runtime. Super Memory can influence hints and hooks, but the core context stays short and obvious.
12. A session is not hardcoded as “5 words per day”. Users choose Solo 1, Quick 3, Standard 5, or Deep 8 words per session.
13. Definition is not a mandatory lesson stage. Definition is a rescue/help layer.
14. The Word Workout is now a hub/gym, not a forced linear path. Users choose any visible exercise mode and return to the hub after completion.

## Current Runtime MVP

- Expo React Native app with TypeScript.
- Local onboarding and language/level selection.
- Mock vocabulary and mock Word Workout generation.
- Session size selection before word proposal, including Solo 1-word workouts.
- Word Workout hub with all MVP exercise modes visible: Read, Check, Use, Speak, Feel, Same / Different, Best Sentence, and Fast Flash.
- Context Exposure with one simple sentence per screen.
- True/False Check, Mini Usage, Speak with Expo Speech TTS, and lightweight extra practice modes.
- Finish Workout flow with word self-assessment: Still new, I recognize it, I can use it.
- 2-second mock ad gate before lesson generation.
- Bottom tab navigation with Home, Workout, Review, Progress, and Settings.
- Initial light/dark theme foundation.

## Next Recommended Slice

Make the core Word Workout feel more guided and rewarding:

- persist word self-assessment into local/Supabase word state
- add small celebration animations after correct answers
- improve mascot/guide presence during onboarding and workout
- track response time and update word states per exercise
- make review sessions use rotated one-word contexts
- prepare Supabase/OpenAI integration around sentence-based sessions
