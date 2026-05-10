# Fluent Gang Word Gym Flow

Fluent Gang is a contextual vocabulary growth app for active vocabulary.

It is not a traditional language course, not a grammar app, and not a long-reading product.

## Core Principle

**One word = one very simple sentence.**

Good:

```text
reluctant
He was reluctant to speak.
```

Bad:

```text
Despite his overwhelming reluctance, he eventually addressed the complicated issue in front of the committee.
```

Reason: Fluent Gang trains the word, not reading-comprehension endurance.

## MVP Session Scope

For the current MVP runtime, the main workout starts with one selected mock word or one phrasal verb.

The user trains that one item inside Word Gym. Multi-word sessions can return later as a batch mode, but the current flow should stay simple and focused.

## Future Session Sizes

Session size means words per workout session, not words per day.

- Solo: 1 word
- Quick: 3 words
- Standard: 5 words
- Deep: 8 words

Standard can be the default, but Solo must always be possible.

## Current MVP Flow

1. Start workout
2. Word Gym opens for one mock word
3. User chooses any exercise mode
4. Completed mode returns to Word Gym
5. User repeats, chooses another mode, or taps Finish workout
6. Finish workout leads to word self-assessment

The workout is a gym, not a forced linear lesson path.

## Word Gym Hub

All exercise modes are visible as practice machines. The user chooses the machine they want to use, completes short rounds, then returns to the gym.

Current machines:

- Context
- The News
- Use
- Speak
- Argue
- Ask
- Super Memo
- Feel
- Same / Different
- Best Sentence
- Fast Flash

Completed modes can show a small checkmark, but the user can repeat them. The UI should avoid a strong "main workout" versus "extra practice" hierarchy.

## Exercise Modes

### Context

Context is a short place-based scene with two characters.

Flow:

1. Show a compact scene illustration and place title, for example `At the doctor`.
2. Read the place title automatically. A small speaker icon next to the title replays it.
3. Each `Next` reveals one dialogue line. Previous lines stay visible.
4. The target word can be highlighted subtly in blue when it appears in dialogue.
5. After the final dialogue line, one more `Next` reveals the question and three choices.

The Context progress bar tracks scene micro-steps: title, each dialogue line, and the question. It should not represent an unknown number of optional repeats.

The screen should gently auto-scroll as new content appears so the active content stays centered. The page background should be white, with only the scene rectangle using a subtle contextual tint. `Next`, `Back to gym`, and paired end actions stay fixed at the same bottom height.

Exercise screens should use a shared top chrome component containing the progress bar and close X. Tapping X must stop any active speech/audio before leaving the exercise.

Context titles and dialogue lines use the same reading reveal principle as The News: the full text is visible first in a readable gray, then the darker text reveals over it while the line is read. The target word can be highlighted in the darker reveal. Speaker icons turn blue while their audio is playing and can be tapped again to stop playback.

Module titles use a shared centered audio-title component in Context and The News. The title row is centered as a whole, but the text reveal itself starts from the left. Learning text should avoid pure black; use a softer dark ink color in light mode.

Context answer choices should stay visually calm. Do not use green borders on the selected answer; keep the normal light gray border. If the user picks a wrong answer, only that answer becomes disabled and gray, and the user keeps trying. A correct answer can make the selected answer text green while keeping the gray border. A correct answer turns the fixed bottom action panel light green all the way to the bottom edge and shows only a left-aligned check icon plus `Excellent!` above the next action buttons. Do not show helper text such as `Try another scene with this word?` in this completed state. Buttons in this panel should stay minimalist, without contrasting borders; secondary actions such as `Back to gym` use a light green fill.

### The News

The News replaces the old Check module.

It checks whether the user understands the target word in context, but through a tiny news-style story instead of a school-like True/False quiz.

Each The News module has three rounds for the selected word.

One round:

1. Short headline with replay audio.
2. `Next` reveals the first part of the mini news story in one shared article frame and reads it automatically.
3. `Next` reveals the second story part inside the same article frame and reads it automatically.
4. `Next` reveals one comprehension question with a proposed answer.
5. The user confirms with the OK button or rejects with the not-OK button.
6. A correct answer shows the shared fixed-bottom `Excellent!` success panel.

The story should have around five very simple sentences. The target word should appear twice, be highlighted in the story, and remain the main learning effort. The story must stay light and short. It should feel like a mini article, not a long reading task.

Text length should scale with the learner level. Lower levels use shorter sentences and shorter scenes/news. Higher levels can use longer texts, more detail, and more natural phrasing while keeping the target word as the main learning effort.

The News uses the same reveal rhythm as Context: compact top progress, no Word Gym/module header, first a title with audio, then content, then question. The visual treatment should differ from Context by using a mini newspaper/news direction instead of character dialogue.

The title should reveal like dialogue text from the left, with the full title visible first in readable gray and a plain speaker icon with no circular button. The article text should also type in like dialogue text, but without dialogue bubbles. Put the article in one light gray-bordered text box. The story is split into two parts, but both parts live in that same article box; each visible part has its own replay speaker icon on the left and text starting to the right of it. Show each part first in readable gray, then reveal the darker generated text over it. Part audio starts together with the darker text reveal, and the reveal pace should roughly match the reading speed. Speaker icons turn blue while their audio is playing and can be tapped again to stop playback. `Next` stays disabled until the automatic reading and the text reveal have finished. Do not show a repeated label such as `Mini report`. Like Context, the screen starts near the top and then gently scrolls upward as new elements appear. The OK and not-OK answer buttons start with identical neutral styling. A wrong choice only becomes disabled and gray, and the user keeps trying. A correct choice shows the same shared fixed bottom `Excellent!` panel component as Context, with both `Next story` and `Back to gym` available. Shared components should be preferred for repeated patterns such as the success panel and calm answer choices.

### Use

Mini usage without writing.

Examples:

```text
He was ______ to speak.
[ reluctant ] [ excited ] [ proud ]
```

```text
Which is correct?
A) reluctant to go
B) reluctant go
```

### Speak

Speak is a natural conversation between two characters.

The dialogue appears line by line. Previous bubbles stay on screen. Each new line is read aloud automatically, and the user can tap a neutral speaker icon to replay it.

Not every line has to contain the target word. The goal is a simple, believable conversation where the word becomes understandable through context.

### Argue

Two characters disagree or correct each other about the situation. The user answers a simple meaning question after the short exchange.

### Ask

The word appears inside short, natural questions and answers. The module should feel like a person asking about real situations, not a grammar drill.

### Super Memo

Not final yet.

The intended direction is a short memorable story or dialogue followed by one simple content question, for example True/False. It should help recall without becoming a long reading task.

### Feel

Choose the feeling. The user senses meaning without translating.

### Same / Different

The user compares two simple sentences and decides if they mean the same idea.

### Best Sentence

The user picks the best/simple correct use of the word.

### Fast Flash

Fast contextual flashcards:

```text
reluctant
She was reluctant to join us.

Got it / Again
```

## Finish Workout

Finish workout does not end silently.

Flow:

1. Finish workout
2. Nice workout
3. How do these words feel now?
4. Word self-assessment
5. Save progress or Skip

## Word Self-Assessment

Question:

```text
How do these words feel now?
```

For each word:

- Still new -> `new`
- I recognize it -> `recognized`
- I can use it -> `active`

For Solo sessions, show the single word prominently and ask:

```text
How does this word feel now?
```

The user can skip. Assessment should not block the workout.
