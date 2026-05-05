# Fluent Gang Final MVP Workout Flow

Fluent Gang is not a traditional language learning app, not a course app, and not mainly a grammar product.

Fluent Gang is a contextual vocabulary growth app focused on extending active vocabulary.

## Core Principle

The user learns words through simple context, fast recognition, light usage, and shadowing.

Very important:

**One new or trained word = one very simple sentence.**

Each context sentence must contain exactly one target word. The rest of the sentence must be obvious, simple, and level-appropriate.

Good:

He was reluctant to speak.

Bad:

Despite his overwhelming reluctance, he eventually addressed the complicated issue in front of the committee.

Reason: Fluent Gang teaches the word, not reading-comprehension endurance.

## Session Sizes

A session is a vocabulary workout with a selected number of words.

Session sizes:

- Quick workout: 3 words
- Standard workout: 5 words
- Deep workout: 8 words

Default session size:

- Standard workout, 5 words

A user can complete one session per day, many sessions per day, or only reviews. Do not hardcode “5 words per day”. Use “words per session”.

## Final MVP Flow

1. Choose session size
2. Word proposal
3. Context exposure
4. True/False check
5. Mini usage
6. Shadowing
7. Summary

Definition is not a mandatory full screen in the core flow.

Definition is a support layer, not the main learning stage.

Product rule:

**Definition is not the lesson. Definition is a rescue tool.**

## 1. Choose Session Size

UI copy:

Choose your workout size

Options:

- Quick workout — 3 words
- Standard workout — 5 words
- Deep workout — 8 words

## 2. Word Proposal

The app proposes words for the selected session.

For each word card, show:

- word
- status: new / familiar / reinforce / review
- level
- optional short hint button
- actions: Learn this, I know this, Reinforce this, Replace

The user can set the session words before starting the workout.

Flow:

choose session size → receive proposed words → accept/replace/mark words → start workout

Do not show full definitions by default. Allow “Show hint” or “Quick meaning” as optional help.

## 3. Context Exposure

Show one sentence per screen.

For a 5-word session:

- 5 context screens
- each screen contains 1 target word
- each screen contains 1 simple sentence
- target word highlighted
- progress indicator, for example Word 1/5

Example:

Word 1/5

He was reluctant to speak.

Actions:

- I understand
- Show hint

Rules:

- exactly one target word per sentence
- no translation by default
- no long article
- no paragraph
- no wall of text

## 4. True/False Check

Purpose: check whether the user understood the word from context.

Show one question per screen.

Each question should be based on the simple context sentence.

For each word:

- show the original sentence or a short reference
- ask a true/false question
- provide short friendly feedback
- track correctness and response time

Example:

Context:

He was reluctant to speak.

Question:

He really wanted to speak.

Correct answer:

False

Feedback:

Correct. He did not really want to speak.

## 5. Mini Usage

Purpose: the user tries to use the word with almost zero friction.

Avoid typing in MVP. The user should associate and tap, not write long sentences.

Use only two exercise types in MVP.

### Insert Word

Example:

He was ______ to speak.

Options:

- reluctant
- excited
- proud

Rules:

- one blank
- one correct target word
- two simple distractors
- sentence contains only one trained word
- user taps the answer

### Choose Correct Usage

Example:

Which is correct?

A. reluctant to go  
B. reluctant go

Rules:

- two options only
- one correct usage
- one common incorrect usage
- short feedback only
- no long grammar explanation

Mini usage is not a writing exercise. It is a tiny activation step.

## 6. Shadowing

Shadowing is a core part of the flow.

Purpose: the user hears and repeats the target word in multiple simple contexts.

Shadowing should not show one mixed text with all words.

For each target word:

- show the word as title
- show 3-5 very simple sentences using this one word
- each sentence uses the target word naturally
- contexts vary slightly
- user can play audio
- user can control playback speed
- user marks the word as done

Example:

reluctant

I was reluctant at first.  
She was reluctant to answer.  
He seemed reluctant to join us.  
They were reluctant to change the plan.  
Tom is reluctant to speak today.

Controls:

- Play
- 0.75x
- 1x
- 1.25x
- Done

Audio can be mocked in MVP, but the UI should support future audio integration.

## 7. Summary

After completing the session, show:

- session completed
- number of words trained
- words that improved
- words scheduled for review
- next review suggestion
- progress circle update

Example:

Workout complete.

5 words trained.  
2 words feel stronger.  
3 words will return for review.  
Next rescue: tomorrow.

Actions:

- Back Home
- Start another workout

The summary should feel motivating, not like grading.

## Navigation Rules

- Home always returns to the main Home dashboard.
- During workout, use a focused layout.
- Hide unnecessary dashboard UI during the workout.
- Show an X button to exit the workout.
- If the user exits mid-workout, ask:
  - Save progress and exit
  - Discard session
  - Continue workout

Workout route structure:

- SessionSize
- WordProposal
- ContextExposure
- TrueFalseCheck
- MiniUsage
- Shadowing
- Summary

## Data Model

Session:

- id
- userId
- targetLanguage
- level
- sessionSize: 3 | 5 | 8
- selectedWords
- contextSentences
- trueFalseQuestions
- miniUsageExercises
- shadowingSets
- startedAt
- completedAt
- status: active | completed | abandoned

SelectedWord:

- id
- text
- language
- level
- status: new | familiar | reinforce | review
- hint
- simpleMeaning
- commonPattern

ContextSentence:

- wordId
- targetWord
- sentence
- hint
- level

TrueFalseQuestion:

- wordId
- contextSentence
- questionText
- correctAnswer
- feedbackCorrect
- feedbackIncorrect

MiniUsageExercise:

- wordId
- type: insert_word | correct_usage
- prompt
- options
- correctOptionId
- feedbackCorrect
- feedbackIncorrect

ShadowingSet:

- wordId
- targetWord
- sentences: string[]
- playbackSpeedOptions: 0.75 | 1 | 1.25
- audioUrl optional / TODO for MVP

## UX Principles

1. The user should never feel lost.
2. One screen should have one clear action.
3. Avoid walls of text.
4. Avoid typing in MVP.
5. Avoid long articles in MVP.
6. Avoid grammar-course feeling.
7. Definitions are optional help, not the main lesson.
8. Context comes first.
9. Mini usage should be almost obvious but still active.
10. Shadowing should repeat one word in several simple contexts.
11. The app should feel like the user is flowing and absorbing vocabulary.
12. The app should help the user understand the word so clearly that it becomes hard not to remember it.

## Duolingo-Inspired Qualities

Use as inspiration only:

- friendly guided flow
- mascot/guide moments
- quick wins
- visible progress
- small celebrations after success
- daily habit feeling
- lightweight screens

Do not copy Duolingo directly. Fluent Gang’s identity is active vocabulary growth.
