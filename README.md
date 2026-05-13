# Fluent Gang

> Legacy prototype.
>
> This repository is now treated as a learning/prototyping checkpoint for Fluent Gang. It contains useful experiments around Word Gym, Context, The News, Podcast, and Shadowing, but the next Fluent Gang app should be rebuilt from a cleaner modular foundation. See [docs/new-app-concept.md](docs/new-app-concept.md) for the fresh product brief.

Mobile-first MVP foundation for a contextual vocabulary growth engine.

**App name:** Fluent Gang  
**Slogan:** You can be fluent.

## What Is Included

- Expo + React Native + TypeScript
- Native stack navigation
- MVP onboarding for interface language, native language, target language, and level
- 10 target learning languages in the app model
- i18n setup with English and Polish starter copy
- Light/dark theme foundation with system, light, and dark preferences
- Contextual vocabulary acquisition direction with memory stages and word state modeling
- Vocabulary selection with proposed words and custom-word entry
- Lesson mode selection: Standard Context, Funny Story, Dialogue, Super Memory
- Mock Word Gym session generation with an OpenAI-ready prompt builder
- Session size selection: Solo 1, Quick 3, Standard 5, Deep 8 words
- Word Gym hub with Context, The News, Podcast, Shadowing, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, and Fast Flash
- Module runner for short contextual vocabulary practice machines
- Context Exposure, The News, Podcast, Shadowing, character-led dialogue modules, and quick recognition modes
- Finish Workout flow with word self-assessment
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
  contextual-vocabulary-engine.md core product definition
  design-direction.md brand and UI direction
  flow.md full user flow
  game-mode.md playful solo and group game concept
```

## Design Direction

Fluent Gang should feel premium, calm, and carefully made. The green brand direction should suggest correctness, progress, and focus. UI should use consistent SVG icons wherever they improve clarity, with a refined product character rather than loud gamification.

The workout experience is a Word Gym: one tile opens one mini-module with several quick rounds. It should feel like a clean room of practice machines, not a forced lesson path. The user chooses the exercise they want, and the app avoids a hard split between main workout and optional practice.

The shared color palette lives in `src/theme/palette.ts`. App components should use theme tokens from `src/theme/theme.ts` instead of hardcoded colors.

See `docs/design-direction.md` for the design principles and quality bar.

## Character Direction

Fluent Gang should eventually include a small cast of premium, funny, memorable characters. They should make the app warmer and less technical while supporting learning moments, celebrations, Super Memo, Speak, and game mode.

See `docs/characters.md` for the character system concept.

## Mascot System

The MVP includes a reusable `Mascot` component with states: idle, thinking, happy, oops, celebrate, and encourage. It currently uses a static animated placeholder and is ready for future Lottie files through `src/constants/mascotAnimations.ts`.

If Lottie assets are missing, the app falls back gracefully and does not block the workout flow.

The current mascot concept board is stored at `assets/reference/gangImg.png`. See `docs/mascot-direction.md` for the character direction.

## Game Mode Direction

Fluent Gang should include a playful game mode for solo practice or a small gang of players. The game can use random words, practiced vocabulary, phrasal verbs, idioms, and quick prompts. The simplest MVP version is a local one-device round with points, skips, funny answers, and a 60-second timer.

The broader concept also includes friendly competition: private groups of friends can compare learning time, completed lessons, practiced words, streaks, and game points. Future country leaderboards can show how users compare with learners from the same country, with privacy controls.

See `docs/game-mode.md` for the concept.

## Business Model Direction

Planned product tiers:

- Free plan: users can learn with the core lesson flow, with a 15-second ad shown before starting a generated lesson.
- Paid plan: ad-free learning with a smoother premium experience and future advanced features.
- Company plan: team/company access for businesses that want language learning for employees, with future admin, reporting, and group progress features.

MVP implementation note: billing, real ads, and company accounts are not implemented yet. The app currently uses a 0.5-second mock ad gate before lesson generation so the flow can be tested quickly.

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

Current Word Gym session generation is mocked in `src/services/openaiLessonService.ts`.

Important MVP rule:

**One word = one simple sentence.**

The app should not generate long articles or complex stories as the default MVP learning experience. For each selected word, the generator should create short contextual material for the Word Gym modules: simple context moments, true/false checks, mini usage choices, and natural character dialogue where it helps the word land.

Shadowing is a guide-and-you speaking rhythm, not a technical list of example sentences. The user hears or sees a short line, then sees the same line again in a `You` bubble to shadow it. The target word should stay visually calm inside bubbles; the screen should rely on context, voice, and character flow rather than heavy highlighting.

Definitions are optional support, not the core lesson stage:

**Definition is not the lesson. Definition is a rescue tool.**

Next step:

1. Create a Supabase Edge Function, for example `generate-lesson`.
2. Store `OPENAI_API_KEY` as a Supabase secret.
3. Send selected words, language settings, level, and mode from the app.
4. Validate the JSON response server-side.
5. Persist generated word workout sessions and quiz data to Supabase.

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
