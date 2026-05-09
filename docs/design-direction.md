# Fluent Gang Design Direction

Fluent Gang should feel premium, calm, confident, and carefully made. The app is not a loud gamified toy. It should feel like a polished learning instrument with its own recognizable character.

## Brand Feeling

- Luxurious but not flashy.
- Precise, calm, and trustworthy.
- Motivating without shouting.
- Warm enough to feel human.
- Distinctive enough that the user remembers it after closing the app.

The green palette is core to the product. It should suggest correctness, progress, calm focus, and a feeling that the user is moving in the right direction.

## Product Character

Fluent Gang should have a strong product personality, similar to how premium cars have recognizable design DNA. Screens should feel consistent even before the user reads any labels.

Key signals:

- quiet confidence
- refined spacing
- soft but deliberate contrast
- high-quality microinteractions
- visible progress without visual noise
- vocabulary learning presented as something valuable and aspirational

## Icons

Use icons wherever they improve scanning, reduce text, or make actions easier to recognize.

Rules:

- Prefer SVG icons for UI actions, navigation, lesson modes, progress, focus, review, audio, subtitles, speed, quiz answers, settings, and word actions.
- Keep icon style consistent across the app.
- Icons should feel premium and minimal, not playful clip art.
- Pair icons with text where clarity matters, especially during MVP.
- Use icon-only buttons only for familiar actions or where a tooltip/accessibility label exists.

Future implementation note: add a single icon system, likely `lucide-react-native` or custom SVG assets, then centralize usage through reusable components.

## UI Principles

- Mobile-first always.
- The focus control should feel like part of the app shell. It can live in the top bar, but it must stay quiet and secondary to the learning task.
- Timers and tracking should be visible but quiet enough not to distract from learning.
- The Word Gym should feel like a clean room of practice machines: each round icon opens a short module with quick reps, not a forced linear lesson path.
- Avoid a strong main-vs-optional split. All machines are available choices; completion can be shown gently without pressuring the user.
- Target vocabulary should not be heavily highlighted in dialogue bubbles. The current direction favors calm text, natural context, and audio over bold/color emphasis.
- Lesson content should have enough breathing room to feel readable and premium.
- Avoid clutter, heavy shadows, oversized cards, and noisy gamification.
- Animations should be subtle, silent, and meaningful. Celebration should communicate strength and success without interrupting focus.

## Word Gym UI Direction

- No heavy Word Gym header. Let the character, instruction bubble, and machine grid establish the screen.
- Use a neutral character bubble to guide the user.
- Machines should feel round, simple, and scannable, with three icons per row on normal mobile widths.
- Spacing should be generous, but the screen should still feel like a usable control surface rather than a landing page.
- Typography should be light and calm. Avoid strong bolding except where hierarchy truly needs it.
- Dialogue bubbles should be neutral: light or gray surfaces, subtle borders, no colorful teaching background.
- Speak should feel like a natural conversation between two characters. Previous bubbles remain visible as the conversation builds.

## Visual Direction

- Primary green remains the core brand color.
- Supporting colors should be restrained and purposeful.
- Typography should feel confident and readable.
- Rounded corners should be modest.
- Borders and separators are preferred over heavy card shadows.
- Progress circles, levels, and streak-like elements should feel precise rather than arcade-like.

## Product Quality Bar

Every major screen should answer:

1. Does it feel calm and premium?
2. Is the main learning action obvious?
3. Are icons used where they make the interface faster to understand?
4. Does the screen still feel like Fluent Gang if the logo is removed?
5. Is progress visible without pressuring or distracting the user?
