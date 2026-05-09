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

## Session Sizes

Session size means words per workout session, not words per day.

- Solo: 1 word
- Quick: 3 words
- Standard: 5 words
- Deep: 8 words

Standard can be the default, but Solo must always be possible.

## Current MVP Flow

1. Choose session size
2. Word proposal
3. Word workout hub
4. User chooses any exercise mode
5. Completed mode returns to Word workout hub
6. User repeats, chooses another mode, or taps Finish workout
7. Finish workout leads to word self-assessment

The workout is a gym, not a forced linear lesson path.

## Word Gym Hub

All exercise modes are visible as practice machines. The user chooses the machine they want to use, completes short rounds, then returns to the gym.

Current machines:

- Context
- Check
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

Simple exposure to the word in context.

One screen = one word = one very simple sentence.

### Check

True/False check.

Example:

```text
He was reluctant to speak.
He really wanted to speak.

True / False
```

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
