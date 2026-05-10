# Fluent Gang MVP Architecture

Fluent Gang is a mobile-first Expo app with a small but scalable foundation.

## Layers

- `src/screens`: route-level UI only.
- `src/components`: reusable mobile UI primitives.
- `src/store`: local MVP state with Zustand and AsyncStorage persistence.
- `src/services`: business logic and external integrations.
- `src/types`: domain and navigation types.
- `src/constants`: stable app options such as levels, languages, and lesson modes.
- `src/i18n`: interface translations.
- `supabase`: database migrations and future Edge Functions.

## MVP Flow

1. Choose interface language, native language, target language, and level.
2. Choose session size: Solo 1, Quick 3, Standard 5, or Deep 8.
3. Accept or edit proposed vocabulary words.
4. Choose lesson mode.
5. Generate a mock AI lesson.
6. Enter Word Gym and choose a practice machine.
7. Complete short module rounds such as Context, The News, Use, Speak, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, or Fast Flash.
8. Return to Word Gym, choose another machine, or finish the workout.
9. Track focus time and prepare spaced repetition reviews.

## Integration Notes

- OpenAI should be called from Supabase Edge Functions, not directly from the app.
- Supabase auth/profile sync should replace local-only profile state after auth is added.
- The current app is intentionally runnable with mock content before credentials exist.
