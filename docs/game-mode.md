# Fluent Gang Game Mode Concept

Fluent Gang should include a playful game mode where one person or a small group can practice language together. This mode should feel social, funny, fast, and entertaining, while still reinforcing vocabulary.

## Core Idea

The game lets a solo player or a gang of players compete in short rounds using language prompts.

Possible prompt categories:

- random words
- practiced vocabulary
- phrasal verbs
- idioms
- false friends
- sentence completion
- quick definitions
- taboo-style explanations
- acting or describing without saying the word

The purpose is entertainment first, learning second. The group should laugh, guess, react, and remember words through shared emotion.

## Players

- Solo mode: one player plays against time and earns points.
- Local gang mode: 2+ people play together on one device.
- Future online gang mode: players join with a room code.
- Future company mode: teams can play vocabulary rounds together.

## Social Competition

Fluent Gang should also support friendly competition around learning consistency and progress.

Future competition layers:

- Friends/gang leaderboard: compare focus time, completed lessons, words practiced, review streaks, and game points inside a private group.
- Country leaderboard: compare progress against learners from the same country.
- Weekly challenges: for example, most focused minutes, most reviewed words, best streak, or most game points.
- Company leaderboard: optional team-based competition for company plans.

This should feel motivating and social, not stressful. The goal is to make learning visible, playful, and shared.

Privacy principle: users should choose what is visible to friends, groups, companies, or country rankings.

## Simple MVP Game: Gang Round

This is the easiest version to build first.

1. Choose mode: Solo or Gang.
2. Choose category: Words, Phrasal Verbs, Idioms, Mixed.
3. Choose level.
4. The app shows one prompt at a time.
5. A player explains, acts, or uses the prompt in a sentence.
6. The group taps `Correct`, `Skip`, or `Funny but wrong`.
7. Points are counted locally.
8. After 60 seconds, the round ends and shows a simple score.

This can work without accounts, backend, or real multiplayer.

## Example Round Types

### Explain It

The player sees a word and must explain it without translating directly.

### Use It

The player must create a sentence with the word, phrasal verb, or idiom.

### Guess the Idiom

The app shows a funny literal image/description of an idiom, and the player guesses the idiom.

### Super Memory Duel

The app shows 3-5 words. Players create the most absurd memory story. The group votes on the best one.

### Speed Meaning

The app shows a word and three short meanings. The player chooses fast for points.

## Tone

Game mode can be more playful than the core learning flow, but it should still feel premium and polished.

- Funny, not childish.
- Fast, not chaotic.
- Social, not noisy.
- Competitive, but friendly.
- Rewarding without breaking the calm Fluent Gang identity.

## Scoring

Simple MVP scoring:

- Correct: +10
- Skip: 0
- Funny but wrong: +2
- Streak bonus: +5 after 3 correct answers in a row

Future scoring can include accuracy, speed, team streaks, and vocabulary mastery impact.

## Architecture Notes

Future types/modules may include:

- `game_sessions`
- `game_rounds`
- `game_players`
- `game_prompts`
- `game_scores`
- `game_categories`
- `groups`
- `group_members`
- `leaderboards`
- `leaderboard_entries`
- `weekly_challenges`
- `user_visibility_settings`

For MVP, game sessions can live fully in local state with mock prompts.

## Product Fit

This mode strengthens the name Fluent Gang. It gives the app a social identity and creates moments where learning feels like a shared activity instead of a private chore.
