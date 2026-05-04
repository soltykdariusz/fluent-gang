# Fluent Gang User Flow

Fluent Gang is a mobile-first language learning app focused on extending vocabulary through context, AI-generated micro-texts, true/false quizzes, shadowing, focus tracking, and spaced repetition.

## 1. Onboarding

The user chooses:

- interface language
- native language
- target learning language

The app should support learning at least 10 popular languages and should be architected for many interface languages in the future.

Initial target learning languages:

- English
- Spanish
- French
- German
- Italian
- Portuguese
- Polish
- Japanese
- Korean
- Chinese

## 2. Level Selection

The user has two options:

- choose their level manually
- take a short level test

Manual levels:

- A1
- A2
- B1
- B2
- C1
- C2

The level test should be short and only estimate the user’s level. It should not feel like a school exam.

## 3. Word Discovery

After the level is known, the user can generate 5 or 6 words.

The app should support both options:

- 5 words
- 6 words

There is a playful inspiration from Nikola Tesla’s 3, 6, 9 idea, but the app should not overuse it.

For each proposed word, the user can mark it as:

- I know it — remove from learning
- I recognize it — use for reinforcement
- New for me — add to lesson
- Show meanings — show additional meanings if the word has more than one meaning

The goal is to let the user consciously choose words before starting a lesson.

## 4. Word Preview

Before generating the lesson, the user sees a preview of selected words.

Each word should show:

- word
- simple definition in the target learning language
- example sentence
- optional translation visible only after clicking
- additional meanings visible after clicking
- pronunciation/audio placeholder

Definitions should be in the language being learned.

Example: if the user learns English, English words should have English definitions.

## 5. Lesson Mode Selection

After approving 5–6 words, the user chooses a lesson mode:

- News
- Sport
- Lifestyle
- Psychology
- Super Memory

Super Memory mode should generate an exaggerated, vivid, funny, memorable story that connects all selected words into one single thread. It should use memory techniques, strong associations, absurd imagery, emotional hooks, and clear context.

Future modes may include:

- Business
- Tech
- Travel
- Daily Conversation

## 6. AI Generated Micro Text

The app generates a short text using all selected words.

The text must be adjusted to the user’s level:

- A1: 1–2 very simple sentences
- A2: 2–4 simple sentences
- B1: short paragraph
- B2: 1–2 short paragraphs
- C1/C2: more natural and advanced text

All selected words should be bolded.

When the user clicks a bolded word, the app should show:

- definition
- example
- other meanings
- pronunciation/audio
- option to mark as known

## 7. Reading and Listening Stage

The user can:

- read the text
- listen to the narrator
- do both

After finishing, the user marks:

- I read it
- I listened
- I’m ready

Then the user moves to the context quiz.

## 8. Context True/False Quiz

The quiz should have one question per screen.

Each question should refer to the generated text and check whether the user understood the practiced words in context.

Example question:

“In the text, reliable means that someone can be trusted.”

True / False

Feedback should be positive and progress-focused.

If the user answers correctly:

- show a small animation or reward
- reinforce progress

If the user answers incorrectly:

- do not shame the user
- show helpful feedback
- refer back to the relevant part of the text
- encourage another try

The goal is engagement and progress, not school-style grading.

## 9. Quiz Result

At the end, show:

- score
- number of trained words
- number of words strengthened
- words that need more practice
- completed focus time if available

The message should emphasize consistency and progress.

Example:

“You trained 6 words today. 4 are stronger now. 2 will come back soon.”

## 10. Shadowing Stage

After the quiz, the app gives the user a shadowing text.

The shadowing text should:

- use the same selected words again
- preferably use them in a slightly different context
- be level-adjusted
- be easy to read aloud
- support narrator audio
- support adjustable playback speed
- support subtitles on/off

The user listens, reads, and repeats after the narrator.

For MVP, the app does not need to check pronunciation.

The user self-assesses:

- Easy
- Okay
- Hard

The main goal is to understand what they say and reinforce active vocabulary.

## 11. Review Scheduling

After shadowing, the app schedules future review using spaced repetition / forgetting curve logic.

Example intervals:

- 1 day
- 3 days
- 7 days
- 14 days
- 30 days

After completing the lesson, show a message:

“Nice. These words will come back tomorrow.”

or

“Next review: in 3 days.”

## 12. Review Mode

When the user returns to a word set for review, they can:

- reuse the previous text
- generate a new text with the same words
- take a quick true/false quiz
- do shadowing again

Generating a new context is important because it helps the user understand words more deeply instead of memorizing one sentence.

## 13. Word Progress States

Each word should have a progress state:

- New
- Recognized
- Practiced
- Familiar
- Active vocabulary
- Mastered

The app should track both:

- passive vocabulary — words the user understands
- active vocabulary — words the user can use

## 14. Vocabulary Map

The app should eventually show a vocabulary progress dashboard:

- Active vocabulary count
- Recognized vocabulary count
- Words reviewed today
- Words to review today
- Strong words this week
- Current streak
- Focus time

This reinforces the idea that the user’s vocabulary is growing.

## 15. Focus Tracking

The app should include a focus timer/session tracker.

The goal:

- encourage distraction-free learning
- measure how much focused time the user spends learning
- connect focus time with progress

A focus session can start when the lesson begins and end after shadowing or review.

## 16. Product Positioning

The app is not just flashcards.

The app is not a school test.

The app is not only an AI tutor.

Core positioning:

“Extend your vocabulary through stories, context, and shadowing.”

Alternative:

“Fluent Gang helps you turn new words into real vocabulary.”

## 17. MVP Priorities

The first MVP should include:

1. onboarding
2. level selection or short level test placeholder
3. word generation with 5 or 6 words
4. word status selection
5. word preview with definitions
6. mode selection
7. mock AI generated text
8. reading/listening screen
9. true/false context quiz
10. result screen
11. shadowing screen
12. simple review scheduling
13. basic word progress states

Keep the first implementation simple.

Use mock data where needed.

Do not over-engineer.

The goal is to create a clear flow and build the smallest usable version first.
