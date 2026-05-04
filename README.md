# Fluent Gang

Mobile-first MVP foundation for an AI-powered language learning app.

**App name:** Fluent Gang  
**Slogan:** You can be fluent.

## What Is Included

- Expo + React Native + TypeScript
- Native stack navigation
- MVP onboarding for interface language, native language, target language, and level
- 10 target learning languages in the app model
- i18n setup with English and Polish starter copy
- Light/dark theme foundation with system, light, and dark preferences
- Vocabulary selection with 5 proposed words and custom-word entry
- Lesson mode selection: News, Sport, Lifestyle, Super Memory
- Mock AI lesson generation with an OpenAI-ready prompt builder
- Reading/listening placeholder, true/false quizzes, definitions, shadowing placeholder
- Local progress and focus session tracking with Zustand + AsyncStorage
- Supabase client setup and initial SQL schema
- `.env.example` for configuration

## Setup

```bash
npm install
cp .env.example .env
npm run start
```

Then open the app with Expo Go, iOS simulator, Android emulator, or run:

```bash
npm run ios
npm run android
npm run web
```

## Environment Variables

Only public Expo variables should be used inside the mobile app:

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Do not expose `OPENAI_API_KEY` in the app. OpenAI calls should go through a Supabase Edge Function.

## Project Structure

```text
src/
  components/      reusable UI primitives
  constants/       languages, levels, lesson modes
  data/            MVP mock data
  i18n/            interface translations
  navigation/      root navigation
  screens/         route screens
  services/        Supabase, OpenAI, vocabulary, progress services
  store/           local MVP app state
  theme/           colors, spacing, radius
  types/           domain and navigation types
supabase/
  schema.sql       initial database schema
docs/
  architecture.md  architecture notes
  business-model.md monetization direction
  characters.md character and mascot direction
  design-direction.md brand and UI direction
  game-mode.md playful solo and group game concept
```

## Design Direction

Fluent Gang should feel premium, calm, and carefully made. The green brand direction should suggest correctness, progress, and focus. UI should use consistent SVG icons wherever they improve clarity, with a refined product character rather than loud gamification.

See `docs/design-direction.md` for the design principles and quality bar.

## Character Direction

Fluent Gang should eventually include a small cast of premium, funny, memorable characters. They should make the app warmer and less technical while supporting learning moments, celebrations, Super Memory, shadowing, and game mode.

See `docs/characters.md` for the character system concept.

## Game Mode Direction

Fluent Gang should include a playful game mode for solo practice or a small gang of players. The game can use random words, practiced vocabulary, phrasal verbs, idioms, and quick prompts. The simplest MVP version is a local one-device round with points, skips, funny answers, and a 60-second timer.

The broader concept also includes friendly competition: private groups of friends can compare learning time, completed lessons, practiced words, streaks, and game points. Future country leaderboards can show how users compare with learners from the same country, with privacy controls.

See `docs/game-mode.md` for the concept.

## Business Model Direction

Planned product tiers:

- Free plan: users can learn with the core lesson flow, with a 15-second ad shown before starting a generated lesson.
- Paid plan: ad-free learning with a smoother premium experience and future advanced features.
- Company plan: team/company access for businesses that want language learning for employees, with future admin, reporting, and group progress features.

MVP implementation note: billing, real ads, and company accounts are not implemented yet. The app currently uses a 2-second mock ad gate before lesson generation so the flow can be tested quickly.

## Supabase

Run `supabase/schema.sql` in your Supabase project SQL editor or convert it into migrations later.

The schema supports:

- profiles with interface/native/target language and level
- languages and levels
- words and translations
- lessons, lesson words, lesson modes
- quizzes and quiz answers
- user word progress
- review schedule
- focus sessions
- generated audio references

## OpenAI Integration Plan

Current lesson generation is mocked in `src/services/openaiLessonService.ts`.

Next step:

1. Create a Supabase Edge Function, for example `generate-lesson`.
2. Store `OPENAI_API_KEY` as a Supabase secret.
3. Send selected words, language settings, level, and mode from the app.
4. Validate the JSON response server-side.
5. Persist generated lessons and quiz data to Supabase.

The prompt structure is already centralized in `buildLessonPrompt`.

## Development Commands

```bash
npm run start
npm run typecheck
```

## MVP Notes

- English is the first complete target language for demo words.
- The type system and database are multilingual from day one.
- Interface i18n starts with English and Polish, prepared for more languages.
- Business logic lives in services and store, not UI components.
- TODO markers show where Supabase and OpenAI should replace local mock behavior.
