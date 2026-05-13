# Fluent Gang Project Checkpoint

This document captures the current product and implementation assumptions after the MVP flow refactor.

## Current Corrections

1. The yellow focus badge is no longer part of the brand or UI direction. It has been replaced by the Home button in the bottom dock.
2. Dark mode is not complete. The project currently has theme tokens, a provider, a Settings toggle, and partial shared-component support.
3. Production ads before lessons should be 15 seconds. MVP/dev uses a 0.5-second mock ad gate to keep testing fast.
4. OpenAI and Supabase are architecturally prepared but not connected to real runtime flows yet.
5. The slogan is not fully resolved. Branding currently says "You can be fluent.", while the bottom dock says "You will be fluent."
6. Fluent Gang characters are a concept documented in `docs/characters.md`; they are not implemented yet.
7. Game mode, social competition, company plans, and monetization are product concepts, not current MVP runtime features.
8. Fluent Gang is now defined as a contextual vocabulary growth engine, not a general language learning app.
9. English may be the first fully supported MVP target vocabulary language, but the product is not conceptually English-first.
10. The final MVP learning flow is session-based and word-based: the user trains one selected word through short contextual modules.
11. Long texts, articles, and complex stories are de-emphasized for MVP runtime. Super Memo can become a short memorable story/dialogue, but it should still end in a very simple comprehension task.
12. A session is not hardcoded as “5 words per day”. Users choose Solo 1, Quick 3, Standard 5, or Deep 8 words per session.
13. Definition is not a mandatory lesson stage. Definition is a rescue/help layer.
14. The Word Workout is now Word Gym: a hub of practice machines, not a forced linear path. Users choose any visible exercise mode and return to the hub after completion.
15. The product direction avoids a hard split between main workout and optional extra practice. Machines can have different roles, but the screen should feel like one clean gym.
16. Read has been renamed to Context.
17. Speak is now a natural two-character dialogue with line-by-line reveal, automatic speech for new lines, replay through a neutral speaker icon, and previous bubbles staying visible.
18. The current MVP runtime should start a one-word Word Gym workout from mock JSON data. Multi-word sessions are a future batch mode.
19. The approved UI direction is the new Context screen: white page, compact tinted scene, characters slightly breaking out of the rounded scene, title audio first, line-by-line dialogue, then question.
20. The active learning content should stay centered. When new content appears lower on the screen, the view should auto-scroll gently while the progress bar remains visible.
21. `Next`, `Back to gym`, and paired end actions should remain fixed at the same bottom height in the current bottom action style.

## Current Runtime MVP

- Expo React Native app with TypeScript.
- Local onboarding and language/level selection.
- Mock vocabulary and mock Word Gym session generation.
- Main workout starts from one mock word in JSON. Session size selection screens still exist, but they are not the primary MVP path.
- Word Gym hub with all MVP exercise modes visible: Context, The News, Use, Speak, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, and Fast Flash.
- Context scene module with title audio, compact illustration, line-by-line dialogue, subtle blue target-word highlight, micro-step progress, and a final three-choice question.
- The News mini-story comprehension module with headline audio, `Next`-revealed article, `Next`-revealed question, three choices, and short feedback.
- Finish Workout flow with word self-assessment: Still new, I recognize it, I can use it.
- 0.5-second mock ad gate before lesson generation.
- Bottom tab navigation with Home, Workout, Review, Progress, and Settings.
- Initial light/dark theme foundation.

## Next Recommended Slice

Polish the Word Gym and module content:

- first, visually polish `src/screens/WordPreviewScreen.tsx`: machine icon proportions, 3-per-row spacing, top menu, typography, and focus-control visual weight
- then review `src/screens/ModuleRunnerScreen.tsx` and the workout components for calm dialogue-first UI consistency
- define the behavior and content model for Context, The News, Use, Speak, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, and Fast Flash
- extend dialogue-based learning where it makes sense
- expand `src/data/mockWorkoutModules.ts` and `src/data/mockSpeakDialogues.json` so every module has sensible examples for several words
- verify that Solo 1 always trains only the selected word across the flow
- update product documentation again after the current UI direction stabilizes

## Restart Prompt For Next Thread

Use this prompt when reopening the project in a fresh Codex thread:

```text
Pracujemy nad aplikacją Fluent Gang w repo `/Users/dariusz/Projects/fluentGang`.

Aktualny branch: `feature/core-learning-flow`.
Ostatni commit z kierunkiem Word Gym: `fbfbcf2 Build Word Gym module flow`.

Produkt:
Fluent Gang to contextual vocabulary growth app. To nie jest grammar course ani tradycyjna lekcja. Użytkownik trenuje jedno słowo przez krótkie, proste, angażujące moduły. Ekran Word Gym ma być salą ćwiczeń z maszynami. Użytkownik wybiera ćwiczenie, które lubi. Nie chcemy mocnego podziału na main i optional.

Aktualny stan:
- `Read` zostało zmienione na `Context`.
- Word Gym pokazuje moduły: Context, The News, Podcast, Shadowing, Argue, Ask, Super Memo, Feel, Same / Different, Best Sentence, Fast Flash.
- Dodany jest model `WorkoutModule`, `WorkoutRound`, `CharacterDialogueLine` oraz statusy modułów.
- Dodany jest `ModuleRunnerScreen`.
- Dodane komponenty: `DialogueScene`, `CharacterBubble`, `CharacterAvatarPlaceholder`, `ChoiceExercise`, `ChunkArrangeExercise`, `ModuleProgress`, `ExerciseTopBar`, `FocusTimer`.
- Dawny slot Use został przestawiony prezentacyjnie na Podcast: audio-first, ukryta transkrypcja, po odsłuchu wybór 3 słów usłyszanych w tekście.
- Dawny Speak został przestawiony prezentacyjnie na Shadowing: scenki z mockowego JSON-a mają tytuł miejsca, postać mówi linię, a potem pojawia się cue `repeat after me`.
- Poprzednie dymki w Shadowing zostają na ekranie.
- Dymki są neutralne: jasne/szare, delikatna ramka, bez kolorowego tła.
- Tekst w dymkach nie jest boldowany.
- Target word nie jest kolorowany ani boldowany w dymku.
- Nowa wypowiedź jest automatycznie czytana, a neutralny głośniczek pozwala ją odtworzyć ponownie.
- Mock reklama trwa 0.5 sekundy.
- Przy sesji Solo 1 ekran wyboru pokazuje tylko jedno słowo.
- Focus control jest w górnym pasku: okrąg z play/pause, subtelny ring, timer typu `09:42`.
- Dokumentacja została odświeżona w `README.md`, `docs/design-direction.md`, `docs/flow.md`, `docs/project-checkpoint.md` i powiązanych docs.

Najważniejsze pliki:
- `src/screens/WordPreviewScreen.tsx`
- `src/screens/ModuleRunnerScreen.tsx`
- `src/data/contextScenarios.json`
- `src/data/mockWorkoutWords.json`
- `src/data/mockWorkoutModules.ts`
- `src/data/mockSpeakDialogues.json`
- `src/components/workout/CharacterBubble.tsx`
- `src/components/workout/DialogueScene.tsx`
- `src/components/MascotBubble.tsx`
- `src/types/workout.ts`
- `src/types/navigation.ts`
- `docs/project-checkpoint.md`
- `docs/design-direction.md`
- `docs/flow.md`

Najbliższy cel:
Utrzymaj zaakceptowany kierunek ekranu Context:
- białe tło aplikacji
- pasek postępu na górze, bez wchodzenia pod `X`
- kompaktowy tinted scene rectangle
- postacie mogą lekko wychodzić poza obrys sceny
- tytuł sceny z głośniczkiem i automatycznym odczytem
- `Next`, `Back to gym` i pary akcji zawsze fixed na tej samej wysokości od dołu
- nowe linie/dialog/pytanie auto-scrollują ekran tak, żeby aktywny content był w centrum

Potem:
- dopolerować wizualnie ekran Word Gym, szczególnie `WordPreviewScreen.tsx`
- przejrzeć `ModuleRunnerScreen.tsx` pod spójność z neutralnym, prostym UI
- doprecyzować zachowanie każdego modułu
- rozszerzyć dialogowość tam, gdzie ma sens
- zaprojektować lepszy kierunek dla Super Memo jako krótka historia/dialog + proste pytanie True/False
- uporządkować mock data dla kilku słów
- sprawdzić, czy Solo 1 wszędzie trenuje tylko jedno wybrane słowo

Zacznij od sprawdzenia aktualnego kodu i dokumentacji. Potem zaproponuj krótki plan i wykonaj pierwszy slice: wizualny polish Word Gym.
```
