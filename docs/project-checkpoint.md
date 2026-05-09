# Fluent Gang Project Checkpoint

This document captures the current product and implementation assumptions after the MVP flow refactor.

## Current Corrections

1. The yellow focus badge is no longer part of the brand or UI direction. It has been replaced by the Home button in the bottom dock.
2. Dark mode is not complete. The project currently has theme tokens, a provider, a Settings toggle, and partial shared-component support.
3. Production ads before lessons should be 15 seconds. MVP/dev uses a 0.5-second mock ad gate to keep testing fast.
4. OpenAI and Supabase are architecturally prepared but not connected to real runtime flows yet.
5. The slogan is not fully resolved. Branding currently says "You can be fluent.", while the bottom dock says "You will be fluent."
6. Fluent Gang characters are a concept documented in `docs/characters.md`; they are not implemented yet.
7. Game mode, social competition, company plans, and monetization are product concepts, not current MVP runtime features.
8. Fluent Gang is now defined as a contextual vocabulary growth engine, not a general language learning app.
9. English may be the first fully supported MVP target vocabulary language, but the product is not conceptually English-first.
10. The final MVP learning flow is session-based and word-based: the user trains one selected word through short contextual modules.
11. Long texts, articles, and complex stories are de-emphasized for MVP runtime. Super Memo can become a short memorable story/dialogue, but it should still end in a very simple comprehension task.
12. A session is not hardcoded as “5 words per day”. Users choose Solo 1, Quick 3, Standard 5, or Deep 8 words per session.
13. Definition is not a mandatory lesson stage. Definition is a rescue/help layer.
14. The Word Workout is now Word Gym: a hub of practice machines, not a forced linear path. Users choose any visible exercise mode and return to the hub after completion.
15. The product direction avoids a hard split between main workout and optional extra practice. Machines can have different roles, but the screen should feel like one clean gym.
16. Read has been renamed to Context.
17. Speak is now a natural two-character dialogue with line-by-line reveal, automatic speech for new lines, replay through a neutral speaker icon, and previous bubbles staying visible.

## Current Runtime MVP

- Expo React Native app with TypeScript.
- Local onboarding and language/level selection.
- Mock vocabulary and mock Word Gym session generation.
- Session size selection before word proposal, including Solo 1-word workouts.
- Word Gym hub with all MVP exercise modes visible: Context, Check, Use, Speak, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, and Fast Flash.
- Context Exposure with one simple sentence per screen.
- True/False Check, Mini Usage, Speak with Expo Speech TTS, character dialogue modules, and lightweight quick practice modes.
- Finish Workout flow with word self-assessment: Still new, I recognize it, I can use it.
- 0.5-second mock ad gate before lesson generation.
- Bottom tab navigation with Home, Workout, Review, Progress, and Settings.
- Initial light/dark theme foundation.

## Next Recommended Slice

Polish the Word Gym and module content:

- refine Word Gym icon proportions, spacing, top menu, typography, and focus-control visual weight
- define the behavior and content model for Context, Check, Use, Speak, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, and Fast Flash
- extend dialogue-based learning where it makes sense
- expand mock data so every module has sensible examples for several words
- verify that Solo 1 always trains only the selected word across the flow
- update product documentation again after the current UI direction stabilizes
