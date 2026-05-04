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
2. Accept or edit 5 vocabulary words.
3. Choose lesson mode.
4. Generate a mock AI lesson.
5. Read/listen, answer context quiz, study definitions, answer definition quiz, shadow, save progress.
6. Track focus time and prepare spaced repetition reviews.

## Integration Notes

- OpenAI should be called from Supabase Edge Functions, not directly from the app.
- Supabase auth/profile sync should replace local-only profile state after auth is added.
- The current app is intentionally runnable with mock content before credentials exist.
