# Fluent Gang Contextual Vocabulary Engine

Fluent Gang is not a traditional language learning app and not an English-first course product.

Fluent Gang is a mobile-first contextual vocabulary growth engine.

## Core Question

The app should not only ask:

> Do you know this word?

It should model:

> At what level does this word live in the user’s mind?

## Memory Stages

Words move gradually through memory and activation stages:

1. New
2. Seen
3. Recognized
4. Understood in context
5. Meaning recalled
6. Recognized in listening
7. Used in a guided sentence
8. Used freely
9. Active / automatic vocabulary

The product goal is to move words from passive exposure into active vocabulary.

## Learning Principles

- Context before definition.
- Retrieval before repetition.
- Memory hooks after the user first tries to understand.
- Rotate contexts instead of repeating the same sentence forever.
- Track multiple memory dimensions, not one known/unknown flag.
- Use AI to generate deliberate memory structures, not random long texts.
- In MVP, use one very simple context sentence per target word.

## Word State Dimensions

For each user and word, the system should eventually track:

- recognition score
- meaning recall score
- contextual understanding score
- listening recognition score
- usage recall score
- speaking activation score
- confidence score
- difficulty
- stability
- last seen date
- next review date
- exposures
- correct answers
- wrong answers
- average response time
- last review type

## MVP Scope

The MVP should implement a small useful version:

- word proposal with simple scoring
- context-first sentence generation
- one target word per simple sentence
- true/false context check
- optional definitions and memory hooks as rescue tools
- mini usage without typing
- shadowing
- simple spaced repetition scheduling
- basic user word state updates

Do not build a full course system or grammar lessons.

## Duolingo Inspiration

Duolingo is an inspiration for clarity, habit design, friendly navigation, quick feedback, and approachable visual character.

Fluent Gang should not copy Duolingo’s tone or visual system. Fluent Gang should feel calmer, more premium, and focused on contextual vocabulary acquisition.

Useful inspiration to keep:

- short guided steps
- mascot/guide support
- quick positive feedback
- small celebrations after successful actions
- visible daily progress
- simple tap-first interactions
