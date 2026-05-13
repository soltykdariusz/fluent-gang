# Fluent Gang Next App Concept

This is the brief for rebuilding Fluent Gang from a clean, modular foundation.

## Product Definition

Fluent Gang is not a classic language-learning app, a grammar course, or a flashcard app.

Fluent Gang is a mobile app for contextual expansion of active vocabulary. The main metaphor is a word gym.

The goal is to train words, phrasal verbs, idioms, collocations, and natural chunks in context until they feel obvious, without translation in the user's head.

MVP learning language: English.

The architecture should support many interface/base languages from the beginning, including Polish, Spanish, German, French, Italian, Ukrainian, Portuguese, and Czech. Content should be modeled so helper translations and base-language support can be added later.

## Core Loop

1. The user gets or chooses a Daily Workout.
2. The user trains words in short contextual screens.
3. After the session, the user sees word growth.
4. The user can pin a word for continued training.
5. The app schedules words to return later.

## Home UX

The Home screen should be simple and focused:

- Today's Workout
- session time: 3 / 7 / 15 min
- word count
- pinned words
- Start Workout as the primary action
- simple progress: minutes trained, words strengthened, almost fluent

Avoid overload. The most important button is Start Workout.

## Learning Unit Types

- WORD
- PHRASAL_VERB
- IDIOM
- CHUNK
- COLLOCATION

Each learning unit is a Word Capsule:

```ts
type WordCapsule = {
  id: string;
  learningLanguage: string;
  type: 'WORD' | 'PHRASAL_VERB' | 'IDIOM' | 'CHUNK' | 'COLLOCATION';
  partOfSpeech?: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  usefulnessScore: number;
  headword: string;
  coreMeaning: Record<string, string>;
  naturalPatterns: string[];
  collocations: string[];
  examples: {
    level: string;
    text: string;
    meaningFocus: string;
  }[];
  commonMistakes: {
    wrong: string;
    correct: string;
  }[];
  relatedWords: string[];
  oppositeWords: string[];
};
```

Mock capsules for MVP:

- reluctant
- awkward
- overwhelmed
- put off
- bring up
- deal with
- call it a day
- at some point
- make an effort
- take responsibility

## Word Progress

Mastery levels:

- NEW
- NOTICED
- UNDERSTOOD
- RECOGNIZED_FAST
- USABLE
- FLUENT

Each word tracks:

- meaning
- pattern
- collocation
- speed
- production
- retention
- obviousnessScore

Obviousness Score:

- 0%: never seen
- 20%: I recognize it
- 40%: I understand it in simple contexts
- 60%: I understand it fast
- 80%: I can use it
- 100%: it feels obvious

## MVP Exercises

One screen equals one decision. Keep exercises short, mobile-first, and contextual.

1. Context Guess: the user sees a sentence and chooses the meaning.
2. Pattern Lock: the user completes a natural pattern, e.g. `reluctant ___ talk` -> `to`.
3. Collocation Match: the user chooses natural word combinations.
4. Situation Choice: the user chooses the word that fits a situation.
5. Build the Sentence: the user arranges chunks.
6. Micro Dialogue: the user completes a short conversation.

Avoid walls of text, heavy grammar, and hard blockers.

Feedback should be short and educational:

```text
Almost. Reluctant means you are not fully willing to do something.
Pattern: be reluctant to + verb.
```

If the user does not know:

- hint
- pattern preview
- reveal answer
- mark as seen with help
- schedule the word to return later

## MVP Screens

1. Onboarding
   - learning language: English
   - helper/interface language: PL / EN / ES / DE / FR / etc.
   - goal: Understand more, Speak more naturally, Work English, Phrasal verbs, Idioms, All of it
   - level: A2, B1, B2, Not sure

2. Home
   - Today's Workout
   - Start Workout
   - Quick Hit 3 min
   - Daily Workout 7 min
   - Deep Gym 15 min
   - Pinned words
   - weekly time
   - words strengthened

3. Workout
   - exercise card
   - session progress
   - hint
   - answers
   - feedback
   - next

4. End Session
   - training time
   - reps
   - words strengthened
   - biggest growth
   - Pin one word
   - next review info

5. Word Detail
   - headword
   - type
   - meaning
   - patterns
   - examples
   - common mistakes
   - related words
   - progress muscles
   - pin/unpin

6. Pinned Words
   - pinned list
   - pin type: Hot Pin, Memory Pin, Use Pin, Sound Pin, Confusion Pin
   - Start Pinned Workout

7. Progress / Stats
   - total minutes
   - weekly minutes
   - streak
   - fluent words
   - almost fluent words
   - weak words

8. Path
   - simple path like Street Fluent Starter
   - a few workouts
   - optional locked/unlocked status, without brutal blocking

## Naming And Vibe

- Workout
- Reps
- Word Muscle
- Gang Level
- Word Locker
- Pinned Words
- Boss Fight
- Fluency Path
- Street Fluent Starter

## Design Direction

- mobile-first
- simple, colorful, friendly
- lightly inspired by Duolingo structure, without copying UI
- modern word gym
- large cards
- clear buttons
- little text
- strong feeling of progress
- mascot/parrot placeholder is OK, but do not overbuild characters at the start

## Architecture

Keep these layers separate from the beginning:

- content model
- exercise engine
- progress model
- scheduling/review logic
- UI components
- language/i18n layer

Local mock data is enough for the PoC. Do not build a backend unless it is needed, but structure the app so a backend and CMS/content stack can be added later.

## First Build Scope

Build:

1. project structure
2. TypeScript models
3. mock content
4. mock user progress
5. onboarding -> home -> workout -> end session
6. exercise card components
7. simple word progress calculation
8. simple word pinning

Do not implement yet:

- payments
- social features
- advanced AI
- real backend
- full word database
- leaderboards
- audio
- speech recognition

The first working core should be:

```text
Start workout -> contextual exercise -> feedback -> word progress -> end session -> pin word
```

After that, propose next steps and the best places to expand.
