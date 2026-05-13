import { GeneratedLesson } from '../types/lesson';
import { WorkoutModule } from '../types/navigation';
import { CharacterDialogueLine, WorkoutModuleData, WorkoutRound } from '../types/workout';
import contextScenariosJson from './contextScenarios.json';
import mockNewsRoundsJson from './mockNewsRounds.json';
import mockShadowingScenesJson from './mockShadowingScenes.json';
import mockSpeakDialogues from './mockSpeakDialogues.json';

const wordId = 'reluctant';
const targetWord = 'reluctant';

type ContextScenario = {
  id: string;
  placeTitle: string;
  scene: string;
  lines: CharacterDialogueLine[];
  question: string;
  choices: {
    id: string;
    text: string;
  }[];
  correctChoiceId: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
};

type NewsRound = {
  id: string;
  headline: string;
  story: string[];
  question: string;
  answers: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
};

type ShadowingScene = {
  id: string;
  title: string;
  lines: CharacterDialogueLine[];
};

const contextScenarios = contextScenariosJson as Record<string, ContextScenario[]>;
const mockNewsRounds = mockNewsRoundsJson as Record<string, NewsRound[]>;
const mockShadowingScenes = mockShadowingScenesJson as Record<string, ShadowingScene[]>;
const contextSentences = contextScenarios[targetWord].map(
  (scenario) => scenario.lines.at(-1)?.text ?? 'He was reluctant to speak.',
);

export const workoutModuleOrder: WorkoutModule[] = [
  'context',
  'the_news',
  'use',
  'speak',
  'argue',
  'ask',
  'super_memo',
  'feel',
  'same_different',
  'best_sentence',
  'fast_flash',
];

export const coreWorkoutModules: WorkoutModule[] = ['context', 'the_news', 'use', 'speak'];

export function getWorkoutModule(lesson: GeneratedLesson, type: WorkoutModule): WorkoutModuleData {
  const lessonWord = lesson.words[0];
  const lessonWordId = lessonWord?.id ?? wordId;
  const lessonTargetWord = lessonWord?.text ?? targetWord;
  const lessonTargetKey = lessonTargetWord.toLowerCase();
  const useMockReluctant = lessonTargetKey === targetWord;
  const rounds = type === 'context' && contextScenarios[lessonTargetKey]
    ? createContextRoundsForWord(lessonWordId, lessonTargetWord)
    : useMockReluctant
    ? createReluctantRounds(type)
    : createGenericRounds(type, lessonWordId, lessonTargetWord, lesson);

  return {
    id: `${lessonWordId}-${type}`,
    type,
    title: getModuleTitle(type),
    subtitle: getModuleSubtitle(type),
    icon: getModuleIconName(type),
    isCore: coreWorkoutModules.includes(type),
    isOptional: !coreWorkoutModules.includes(type),
    status: 'available',
    rounds,
    progress: {
      completedRounds: 0,
      totalRounds: rounds.length,
    },
  };
}

export function getModuleTitle(type: WorkoutModule) {
  const titles: Record<WorkoutModule, string> = {
    context: 'Context',
    the_news: 'The News',
    use: 'Podcast',
    speak: 'Shadowing',
    argue: 'Argue',
    ask: 'Ask',
    super_memo: 'Super Memo',
    feel: 'Feel',
    same_different: 'Same / Different',
    best_sentence: 'Best Sentence',
    fast_flash: 'Fast Flash',
  };

  return titles[type];
}

export function getModuleSubtitle(type: WorkoutModule) {
  const subtitles: Record<WorkoutModule, string> = {
    context: 'Meet the word in simple situations.',
    the_news: 'Read a tiny story and catch the meaning.',
    use: 'Hear a tiny podcast and catch key words.',
    speak: 'Hear it, then shadow it.',
    argue: 'Watch characters disagree about the situation.',
    ask: 'Hear the word inside short questions.',
    super_memo: 'Build a vivid memory hook.',
    feel: 'Connect the word with a feeling.',
    same_different: 'Compare close and opposite ideas.',
    best_sentence: 'Pick the sentence that sounds right.',
    fast_flash: 'Recognize the word quickly.',
  };

  return subtitles[type];
}

export function getModuleIconName(type: WorkoutModule) {
  const icons: Record<WorkoutModule, string> = {
    context: 'book',
    the_news: 'newspaper',
    use: 'podcast',
    speak: 'volume',
    argue: 'swords',
    ask: 'circle-help',
    super_memo: 'brain',
    feel: 'heart',
    same_different: 'columns',
    best_sentence: 'sparkles',
    fast_flash: 'gauge',
  };

  return icons[type];
}

function createReluctantRounds(type: WorkoutModule): WorkoutRound[] {
  const roundFactory: Record<WorkoutModule, () => WorkoutRound[]> = {
    context: createContextRounds,
    the_news: createTheNewsRounds,
    use: createUseRounds,
    speak: createSpeakRounds,
    argue: createArgueRounds,
    ask: createAskRounds,
    super_memo: createSuperMemoRounds,
    feel: createFeelRounds,
    same_different: createSameDifferentRounds,
    best_sentence: createBestSentenceRounds,
    fast_flash: createFastFlashRounds,
  };

  return roundFactory[type]();
}

function createRound(
  moduleType: WorkoutModule,
  roundIndex: number,
  data: Omit<WorkoutRound, 'id' | 'moduleType' | 'wordId' | 'roundIndex' | 'targetWord'>,
): WorkoutRound {
  return {
    id: `${moduleType}-${roundIndex + 1}`,
    moduleType,
    wordId,
    roundIndex,
    targetWord,
    ...data,
  };
}

function createContextRounds() {
  return createContextRoundsForWord(wordId, targetWord);
}

function createContextRoundsForWord(currentWordId: string, currentTargetWord: string) {
  const scenarios = contextScenarios[currentTargetWord.toLowerCase()] ?? contextScenarios[targetWord];

  return scenarios.map((scenario, index) => ({
    id: `context-${index + 1}`,
    moduleType: 'context' as const,
    wordId: currentWordId,
    roundIndex: index,
    targetWord: currentTargetWord,
    prompt: scenario.question,
    content: scenario.lines.map((line) => line.text).join(' '),
    sceneTitle: scenario.placeTitle,
    sceneType: scenario.scene,
    dialogueLines: scenario.lines,
    choices: scenario.choices,
    correctChoiceId: scenario.correctChoiceId,
    feedbackCorrect: scenario.feedbackCorrect,
    feedbackIncorrect: scenario.feedbackIncorrect,
  }));
}

function createTheNewsRounds() {
  return createTheNewsRoundsForWord(wordId, targetWord);
}

function createTheNewsRoundsForWord(currentWordId: string, currentTargetWord: string): WorkoutRound[] {
  const rounds = mockNewsRounds[currentTargetWord.toLowerCase()] ?? createGenericNewsTemplates(currentTargetWord);

  return rounds.map((round, index) => ({
    id: `the-news-${index + 1}`,
    moduleType: 'the_news',
    wordId: currentWordId,
    roundIndex: index,
    targetWord: currentTargetWord,
    headline: round.headline,
    story: round.story,
    prompt: round.question,
    content: round.story.join(' '),
    choices: round.answers,
    correctChoiceId: round.correctAnswerId,
    feedbackCorrect: round.feedbackCorrect,
    feedbackIncorrect: round.feedbackIncorrect,
  }));
}

function createUseRounds() {
  return [
    createRound('use', 0, {
      useRoundType: 'podcast_words',
      prompt: 'Select 3 words you heard.',
      content: 'Welcome to my podcast. Today my guest is Ray. Ray says Tom was reluctant to speak before the meeting.',
      chunks: [
        { id: 'tom', text: 'Tom' },
        { id: 'reluctant', text: 'reluctant' },
        { id: 'speak', text: 'speak' },
        { id: 'proud', text: 'proud' },
        { id: 'kitchen', text: 'kitchen' },
        { id: 'fast', text: 'fast' },
      ],
      correctOrder: ['tom', 'reluctant', 'speak'],
      correctSentence: 'Tom reluctant speak',
      feedbackCorrect: 'Nice. You caught the key words.',
      feedbackIncorrect: 'Almost. Listen for Tom, reluctant, and speak.',
    }),
    createRound('use', 1, {
      useRoundType: 'podcast_words',
      prompt: 'Select 3 words you heard.',
      content: 'This is the Fluent Gang podcast. Mia is with us today. She says Sara was reluctant to answer in class.',
      chunks: [
        { id: 'sara', text: 'Sara' },
        { id: 'reluctant', text: 'reluctant' },
        { id: 'answer', text: 'answer' },
        { id: 'repair', text: 'repair' },
        { id: 'happy', text: 'happy' },
        { id: 'price', text: 'price' },
      ],
      correctOrder: ['sara', 'reluctant', 'answer'],
      correctSentence: 'Sara reluctant answer',
      feedbackCorrect: 'Nice. You heard the important words.',
      feedbackIncorrect: 'Almost. Listen for Sara, reluctant, and answer.',
    }),
    createRound('use', 2, {
      useRoundType: 'podcast_words',
      prompt: 'Select 3 words you heard.',
      content: 'Welcome back to the podcast. Ray tells us Mike was reluctant to join the match because his leg hurt.',
      chunks: [
        { id: 'mike', text: 'Mike' },
        { id: 'reluctant', text: 'reluctant' },
        { id: 'join', text: 'join' },
        { id: 'loudly', text: 'loudly' },
        { id: 'doctor', text: 'doctor' },
        { id: 'forgot', text: 'forgot' },
      ],
      correctOrder: ['mike', 'reluctant', 'join'],
      correctSentence: 'Mike reluctant join',
      feedbackCorrect: 'Nice. You caught the podcast words.',
      feedbackIncorrect: 'Almost. Listen for Mike, reluctant, and join.',
    }),
  ];
}

function createSpeakRounds() {
  return createShadowingRoundsForWord(wordId, targetWord);
}

function createShadowingRoundsForWord(currentWordId: string, currentTargetWord: string): WorkoutRound[] {
  const scenes = mockShadowingScenes[currentTargetWord.toLowerCase()] ?? createGenericShadowingScenes(currentTargetWord);

  return scenes.flatMap((scene, sceneIndex) =>
    scene.lines.map((dialogueLine, lineIndex) => ({
      id: `speak-${scene.id}-${lineIndex + 1}`,
      moduleType: 'speak' as const,
      wordId: currentWordId,
      roundIndex: sceneIndex * 10 + lineIndex,
      targetWord: currentTargetWord,
      prompt: 'Repeat out loud.',
      content: dialogueLine.text,
      sceneTitle: scene.title,
      sceneType: scene.id,
      dialogueLines: [dialogueLine],
      feedbackCorrect: 'Nice shadowing rep.',
    })),
  );
}

function createGenericShadowingScenes(currentTargetWord: string): ShadowingScene[] {
  const lines = getSpeakDialogueLines(currentTargetWord);

  return [
    {
      id: 'everyday',
      title: 'In a small talk',
      lines,
    },
  ];
}

function createArgueRounds() {
  return [
    createRound('argue', 0, {
      prompt: 'What does reluctant mean here?',
      content: 'Tom is reluctant to speak.',
      dialogueLines: [
        line('mia', 'Mia', 'talking', 'Tom is reluctant to speak today.'),
        line('ray', 'Ray', 'confused', 'If Tom is reluctant, why is he near the microphone?'),
        line('mia', 'Mia', 'thinking', 'He is reluctant because he keeps stepping back.'),
        line('ray', 'Ray', 'surprised', 'So reluctant does not mean ready and excited?'),
        line('mia', 'Mia', 'confident', 'Right. Reluctant means he does not really want to speak.'),
        line('ray', 'Ray', 'thinking', 'Tom can speak, but Tom is reluctant to do it.'),
      ],
      choices: [
        { id: 'not-wanting', text: 'not really wanting to do it' },
        { id: 'loud', text: 'speaking very loudly' },
        { id: 'proud', text: 'feeling proud' },
      ],
      correctChoiceId: 'not-wanting',
      feedbackCorrect: 'Exactly. Zac figured out the situation.',
      feedbackIncorrect: 'Almost. Reluctant feels like stepping back from something.',
      extraDialogueLines: [
        line('mia', 'Mia', 'thinking', 'Look at Tom. A reluctant person can still do the thing.'),
        line('ray', 'Ray', 'confident', 'A reluctant person just does not really want to do it.'),
      ],
    }),
    createRound('argue', 1, {
      prompt: 'What is happening?',
      content: 'She was reluctant to answer.',
      dialogueLines: [
        line('ray', 'Ray', 'talking', 'Mia looks reluctant to answer.'),
        line('mia', 'Mia', 'confused', 'Maybe she is reluctant because everyone is watching.'),
        line('ray', 'Ray', 'thinking', 'If she knows the answer, can she still be reluctant?'),
        line('mia', 'Mia', 'confident', 'Yes. Reluctant is about not really wanting to answer.'),
        line('ray', 'Ray', 'surprised', 'So a reluctant person can know the answer and still pause.'),
      ],
      choices: [
        { id: 'hesitates', text: 'She hesitates to answer' },
        { id: 'shouts', text: 'She shouts the answer' },
        { id: 'forgets', text: 'She forgets every word' },
      ],
      correctChoiceId: 'hesitates',
      feedbackCorrect: 'Correct. Reluctant often feels like hesitation.',
      feedbackIncorrect: 'Almost. The clue is that she holds back.',
    }),
    createRound('argue', 2, {
      prompt: 'Which phrase sounds natural?',
      content: 'reluctant ___ go',
      dialogueLines: [
        line('ray', 'Ray', 'arguing', 'I feel reluctant go sounds short.'),
        line('mia', 'Mia', 'confident', 'I hear reluctant to go in natural English.'),
        line('ray', 'Ray', 'thinking', 'So reluctant needs to before an action?'),
        line('mia', 'Mia', 'talking', 'Yes. Reluctant to speak. Reluctant to answer.'),
        line('ray', 'Ray', 'happy', 'Got it. Reluctant to go sounds right.'),
      ],
      choices: [
        { id: 'to-go', text: 'reluctant to go' },
        { id: 'go', text: 'reluctant go' },
        { id: 'not-sure', text: "I'm not sure" },
      ],
      correctChoiceId: 'to-go',
      feedbackCorrect: 'Correct. Natural pattern: reluctant to go.',
      feedbackIncorrect: 'Almost. The pattern is "reluctant to do something".',
      extraDialogueLines: [
        line('mia', 'Mia', 'happy', 'Tiny pattern rep: reluctant to speak, reluctant to answer, reluctant to go.'),
      ],
    }),
  ];
}

function createAskRounds() {
  return [
    createRound('ask', 0, {
      prompt: 'What does Mia feel?',
      content: 'A short question scene.',
      dialogueLines: [
        line('ray', 'Ray', 'talking', 'Are you reluctant to answer, Mia?'),
        line('mia', 'Mia', 'thinking', 'Yes, I am reluctant to answer right now.'),
        line('ray', 'Ray', 'confused', 'Are you reluctant because the question is hard?'),
        line('mia', 'Mia', 'talking', 'I am reluctant because I need more time.'),
        line('ray', 'Ray', 'happy', 'Okay, reluctant means you want to wait.'),
      ],
      choices: [
        { id: 'not-want', text: 'She does not really want to answer' },
        { id: 'excited', text: 'She is very excited' },
        { id: 'angry', text: 'She is angry' },
      ],
      correctChoiceId: 'not-want',
      feedbackCorrect: 'Correct. She needs time and holds back.',
      feedbackIncorrect: 'Almost. Reluctant points to holding back.',
    }),
    createRound('ask', 1, {
      prompt: 'Is Zac eager to join?',
      content: 'A short question scene.',
      dialogueLines: [
        line('ray', 'Ray', 'talking', 'Mia, why are you reluctant to join?'),
        line('mia', 'Mia', 'confused', 'I am reluctant to join because I am not ready.'),
        line('ray', 'Ray', 'thinking', 'Would you be less reluctant after five minutes?'),
        line('mia', 'Mia', 'talking', 'Yes, I might be less reluctant after I prepare.'),
        line('ray', 'Ray', 'confident', 'So reluctant is the opposite of eager.'),
      ],
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
      ],
      correctChoiceId: 'no',
      feedbackCorrect: 'Correct. He is not ready yet.',
      feedbackIncorrect: 'Almost. Reluctant is closer to not eager.',
    }),
    createRound('ask', 2, {
      prompt: 'Choose the correct phrase.',
      content: 'A short question scene.',
      dialogueLines: [
        line('mia', 'Mia', 'talking', 'Would you be reluctant to speak in front of 100 people?'),
        line('ray', 'Ray', 'surprised', 'Yes, I would be reluctant to speak there.'),
        line('mia', 'Mia', 'thinking', 'Would you be reluctant to speak to ten people?'),
        line('ray', 'Ray', 'talking', 'Maybe not. I am only reluctant with a huge crowd.'),
        line('mia', 'Mia', 'happy', 'Good. Reluctant to speak is the natural phrase.'),
      ],
      choices: [
        { id: 'to-speak', text: 'reluctant to speak' },
        { id: 'speak', text: 'reluctant speak' },
      ],
      correctChoiceId: 'to-speak',
      feedbackCorrect: 'Correct. Reluctant to speak.',
      feedbackIncorrect: 'Almost. Use the pattern "reluctant to speak".',
    }),
  ];
}

function createSuperMemoRounds() {
  return [
    createRound('super_memo', 0, {
      prompt: 'Which meaning fits the story?',
      content: 'Memory hook duel.',
      dialogueLines: [
        line('ray', 'Ray', 'surprised', 'I see a giant parrot that is reluctant to speak.'),
        line('mia', 'Mia', 'talking', 'The reluctant parrot moves away from the microphone.'),
        line('ray', 'Ray', 'happy', 'The reluctant parrot hides behind a huge notebook.'),
        line('mia', 'Mia', 'confident', 'That picture makes reluctant feel like pulling away.'),
        line('ray', 'Ray', 'thinking', 'So reluctant means not wanting to do the thing.'),
      ],
      choices: [
        { id: 'not-wanting', text: 'not wanting to do something' },
        { id: 'loud', text: 'speaking very loudly' },
        { id: 'proud', text: 'feeling proud' },
      ],
      correctChoiceId: 'not-wanting',
      feedbackCorrect: 'Correct. Make the parrot move away in your mind.',
      feedbackIncorrect: 'Almost. The parrot wants distance from the microphone.',
    }),
    createRound('super_memo', 1, {
      prompt: 'Which image helps you remember reluctant?',
      content: 'Choose the stronger hook.',
      dialogueLines: [
        line('ray', 'Ray', 'talking', 'Imagine a reluctant person leaning back from a door.'),
        line('mia', 'Mia', 'talking', 'The door says SPEAK, but the person is reluctant to enter.'),
        line('ray', 'Ray', 'surprised', 'The reluctant person puts one foot away from the door.'),
        line('mia', 'Mia', 'confident', 'That reluctant movement is the memory hook.'),
        line('ray', 'Ray', 'happy', 'Reluctant feels like moving backward, not rushing in.'),
      ],
      choices: [
        { id: 'backward', text: 'leaning backward from the door' },
        { id: 'running', text: 'running happily into the room' },
      ],
      correctChoiceId: 'backward',
      feedbackCorrect: 'Yes. Reluctant has that backward pull.',
      feedbackIncorrect: 'Almost. Pick the image that shows holding back.',
    }),
    createRound('super_memo', 2, {
      prompt: 'The parrot was reluctant to speak, so it moved ______ from the microphone.',
      content: 'Complete the memory scene.',
      dialogueLines: [
        line('mia', 'Mia', 'talking', 'The reluctant parrot sees the microphone.'),
        line('ray', 'Ray', 'surprised', 'The reluctant parrot steps away from it.'),
        line('mia', 'Mia', 'thinking', 'A reluctant person often pulls away too.'),
        line('ray', 'Ray', 'happy', 'So reluctant can feel like moving away.'),
        line('mia', 'Mia', 'confident', 'That is a strong memory for reluctant.'),
      ],
      choices: [
        { id: 'away', text: 'away' },
        { id: 'closer', text: 'closer' },
        { id: 'faster', text: 'faster' },
      ],
      correctChoiceId: 'away',
      feedbackCorrect: 'Exactly. Reluctant feels like pulling away from what you do not want to do.',
      feedbackIncorrect: 'Almost. The reluctant parrot moves away.',
    }),
  ];
}

function createFeelRounds() {
  return [
    createRound('feel', 0, {
      prompt: 'Which feeling matches reluctant?',
      content: 'Your friend asks you to speak now.',
      choices: [
        { id: 'not-want', text: "I don't really want to do it" },
        { id: 'excited', text: 'I am very excited' },
        { id: 'proud', text: 'I feel proud' },
      ],
      correctChoiceId: 'not-want',
      feedbackCorrect: 'Correct. That is the body-feel of reluctant.',
      feedbackIncorrect: 'Almost. Reluctant has a little resistance inside it.',
    }),
    createRound('feel', 1, {
      prompt: 'Where does the person move?',
      content: 'The microphone is in front of Tom.',
      choices: [
        { id: 'back', text: 'a step back' },
        { id: 'forward', text: 'quickly forward' },
      ],
      correctChoiceId: 'back',
      feedbackCorrect: 'Yes. Reluctant often feels like stepping back.',
      feedbackIncorrect: 'Almost. Reluctant pulls away.',
    }),
    createRound('feel', 2, {
      prompt: 'Pick the matching reaction.',
      content: 'She is reluctant to answer.',
      choices: [
        { id: 'pause', text: 'She pauses and needs time' },
        { id: 'cheers', text: 'She cheers and jumps in' },
      ],
      correctChoiceId: 'pause',
      feedbackCorrect: 'Correct. A pause fits reluctance.',
      feedbackIncorrect: 'Almost. Reluctant is not eager.',
    }),
  ];
}

function createSameDifferentRounds() {
  return [
    sameDifferentRound(0, 'reluctant vs excited', 'Different', 'different'),
    sameDifferentRound(1, 'reluctant vs unwilling', 'Same', 'same'),
    sameDifferentRound(2, 'reluctant vs eager', 'Different', 'different'),
  ];
}

function sameDifferentRound(index: number, content: string, answerText: string, correctChoiceId: string) {
  return createRound('same_different', index, {
    prompt: 'Same idea or different idea?',
    content,
    choices: [
      { id: 'same', text: 'Same' },
      { id: 'different', text: 'Different' },
    ],
    correctChoiceId,
    feedbackCorrect: `Correct. These are ${answerText.toLowerCase()} ideas.`,
    feedbackIncorrect: `Almost. These are ${answerText.toLowerCase()} ideas.`,
  });
}

function createBestSentenceRounds() {
  return [0, 1, 2].map((_, index) =>
    createRound('best_sentence', index, {
      prompt: 'Which sentence uses reluctant best?',
      content: 'Pick the natural sentence.',
      choices: [
        { id: 'best', text: contextSentences[index] },
        { id: 'bad-object', text: 'He was reluctant the blue car.' },
        { id: 'bad-order', text: 'He reluctant very fast.' },
      ],
      correctChoiceId: 'best',
      feedbackCorrect: 'Correct. Simple and natural.',
      feedbackIncorrect: 'Almost. Reluctant usually fits "reluctant to..." or "reluctant at first".',
    }),
  );
}

function createFastFlashRounds() {
  return [
    createRound('fast_flash', 0, {
      prompt: 'Choose the meaning.',
      content: 'reluctant',
      choices: [
        { id: 'not-wanting', text: 'not wanting' },
        { id: 'happy', text: 'very happy' },
        { id: 'loud', text: 'very loud' },
      ],
      correctChoiceId: 'not-wanting',
      feedbackCorrect: 'Quick and correct.',
      feedbackIncorrect: 'Almost. Reluctant means not wanting.',
    }),
    createRound('fast_flash', 1, {
      prompt: 'Choose the phrase.',
      content: 'reluctant ___ speak',
      choices: [
        { id: 'to', text: 'to' },
        { id: 'very', text: 'very' },
        { id: 'with', text: 'with' },
      ],
      correctChoiceId: 'to',
      feedbackCorrect: 'Correct. Reluctant to speak.',
      feedbackIncorrect: 'Almost. Pattern: reluctant to speak.',
    }),
    createRound('fast_flash', 2, {
      prompt: 'Which scene matches?',
      content: 'reluctant',
      choices: [
        { id: 'holds-back', text: 'holds back' },
        { id: 'rushes-in', text: 'rushes in' },
        { id: 'shouts', text: 'shouts loudly' },
      ],
      correctChoiceId: 'holds-back',
      feedbackCorrect: 'Correct. Fast rep done.',
      feedbackIncorrect: 'Almost. Reluctant holds back.',
    }),
  ];
}

function createGenericRounds(
  type: WorkoutModule,
  genericWordId: string,
  genericTargetWord: string,
  lesson: GeneratedLesson,
): WorkoutRound[] {
  const sentence =
    lesson.contextSentences.find((item) => item.wordId === genericWordId)?.sentence ??
    lesson.words[0]?.exampleSentence ??
    lesson.words[0]?.example ??
    `I noticed the word ${genericTargetWord}.`;
  const definition =
    lesson.definitions.find((item) => item.wordId === genericWordId)?.simpleDefinition ??
    lesson.words[0]?.simpleDefinition ??
    lesson.words[0]?.definition ??
    'the idea in this situation';
  if (type === 'speak') {
    return createShadowingRoundsForWord(genericWordId, genericTargetWord);
  }

  if (type === 'context') {
    return createGenericContextRounds(genericWordId, genericTargetWord, sentence, definition);
  }

  if (type === 'the_news') {
    return createTheNewsRoundsForWord(genericWordId, genericTargetWord);
  }

  return [0, 1, 2].map((_, index) => ({
    id: `${type}-${index + 1}`,
    moduleType: type,
    wordId: genericWordId,
    roundIndex: index,
    prompt: getGenericPrompt(type, genericTargetWord, index),
    content: sentence,
    dialogueLines: getGenericDialogue(type, genericTargetWord, sentence, definition, index),
    choices: getGenericChoices(type, definition),
    correctChoiceId: 'fits',
    feedbackCorrect: 'Good. Keep the context in mind.',
    feedbackIncorrect: 'Almost. Use the sentence as your clue.',
    targetWord: genericTargetWord,
  }));
}

function createGenericNewsTemplates(genericTargetWord: string): NewsRound[] {
  return [
    {
      id: `${genericTargetWord}-news-1`,
      headline: `A small story with ${genericTargetWord}`,
      story: [
        'Tom looked at the situation.',
        'He stopped for a moment.',
        `People noticed the word ${genericTargetWord} in the story.`,
        `${genericTargetWord} was the important clue.`,
      ],
      question: `What does ${genericTargetWord} mean here?`,
      answers: [
        { id: 'fits', text: 'the idea in this situation' },
        { id: 'opposite', text: 'the opposite idea' },
        { id: 'random', text: 'a random sound' },
      ],
      correctAnswerId: 'fits',
      feedbackCorrect: `Correct. ${genericTargetWord} gets meaning from the story.`,
      feedbackIncorrect: `Almost. Use the short news story as your clue.`,
    },
    {
      id: `${genericTargetWord}-news-2`,
      headline: `${genericTargetWord} appears in a short report`,
      story: [
        'Sara read the report.',
        'The story was short and clear.',
        `One sentence used ${genericTargetWord}.`,
        'That word changed the meaning.',
      ],
      question: `Why is ${genericTargetWord} important?`,
      answers: [
        { id: 'fits', text: 'It explains the situation' },
        { id: 'opposite', text: 'It means nothing here' },
        { id: 'random', text: 'It names a person' },
      ],
      correctAnswerId: 'fits',
      feedbackCorrect: 'Correct. The word helps explain the story.',
      feedbackIncorrect: 'Almost. The word is the clue in the story.',
    },
    {
      id: `${genericTargetWord}-news-3`,
      headline: `Readers notice ${genericTargetWord}`,
      story: [
        'Mike saw the headline.',
        'He read four simple lines.',
        `The final line used ${genericTargetWord}.`,
        'Now the story made more sense.',
      ],
      question: `What should the reader understand?`,
      answers: [
        { id: 'fits', text: `${genericTargetWord} fits the story` },
        { id: 'opposite', text: `${genericTargetWord} is not connected` },
        { id: 'random', text: `${genericTargetWord} is only a name` },
      ],
      correctAnswerId: 'fits',
      feedbackCorrect: 'Correct. The story gives the word context.',
      feedbackIncorrect: 'Almost. Look at how the word works in the story.',
    },
  ];
}

function createGenericContextRounds(
  genericWordId: string,
  genericTargetWord: string,
  sentence: string,
  definition: string,
): WorkoutRound[] {
  const places = [
    {
      sceneTitle: 'In the kitchen',
      sceneType: 'kitchen',
      lines: [
        line('mia', 'Mia', 'talking', sentence),
        line('ray', 'Ray', 'thinking', `I can hear ${genericTargetWord} there.`),
        line('mia', 'Mia', 'confident', `${genericTargetWord} fits this moment.`),
      ],
    },
    {
      sceneTitle: 'At the mechanic',
      sceneType: 'mechanic',
      lines: [
        line('ray', 'Ray', 'talking', sentence),
        line('mia', 'Mia', 'thinking', `The scene points to ${genericTargetWord}.`),
        line('ray', 'Ray', 'confused', `So ${genericTargetWord} connects to the situation.`),
      ],
    },
  ];

  return places.map((place, index) => ({
    id: `context-${index + 1}`,
    moduleType: 'context',
    wordId: genericWordId,
    roundIndex: index,
    prompt: `What does ${genericTargetWord} mean here?`,
    content: sentence,
    sceneTitle: place.sceneTitle,
    sceneType: place.sceneType,
    dialogueLines: place.lines,
    choices: [
      { id: 'fits', text: definition },
      { id: 'opposite', text: 'the opposite idea' },
      { id: 'random', text: 'a random sound' },
    ],
    correctChoiceId: 'fits',
    feedbackCorrect: 'Yes. The scene gives the word its meaning.',
    feedbackIncorrect: 'Almost. Use the situation as your clue.',
    targetWord: genericTargetWord,
  }));
}

function getSpeakDialogueLines(word: string): CharacterDialogueLine[] {
  const match = (mockSpeakDialogues as Record<string, CharacterDialogueLine[]>)[word.toLowerCase()];

  if (match) {
    return match;
  }

  return [
    line('ray', 'Ray', 'talking', `I saw ${word} in a sentence yesterday.`),
    line('mia', 'Mia', 'thinking', 'What was happening?'),
    line('ray', 'Ray', 'talking', 'It was a normal little scene.'),
    line('mia', 'Mia', 'confident', `Good. ${word} is easier inside a real moment.`),
    line('ray', 'Ray', 'happy', 'Yes, the story helped me remember it.'),
    line('mia', 'Mia', 'talking', `Let's use ${word} again later.`),
  ];
}

function getGenericPrompt(type: WorkoutModule, genericTargetWord: string, index: number) {
  if (type === 'argue') return `What does ${genericTargetWord} mean here?`;
  if (type === 'ask') return 'What is happening in the conversation?';
  if (type === 'super_memo') return `Which memory hook fits ${genericTargetWord}?`;
  if (type === 'speak') return index === 0 ? 'Listen. Then repeat.' : 'Shadow the next line.';
  return index === 0 ? 'Train this word in context.' : 'One more quick rep.';
}

function getGenericChoices(type: WorkoutModule, definition: string) {
  if (type === 'context' || type === 'speak' || type === 'the_news') return undefined;

  if (type === 'argue' || type === 'ask' || type === 'super_memo') {
    return [
      { id: 'fits', text: definition },
      { id: 'not-fits', text: 'the opposite idea' },
      { id: 'not-sure', text: "I'm not sure" },
    ];
  }

  return [
    { id: 'fits', text: 'This fits the scene' },
    { id: 'not-fits', text: 'This does not fit' },
  ];
}

function getGenericDialogue(
  type: WorkoutModule,
  genericTargetWord: string,
  sentence: string,
  definition: string,
  index: number,
) {
  if (type === 'speak') {
    return [
      line(
        index % 2 === 0 ? 'ray' : 'mia',
        index % 2 === 0 ? 'Ray' : 'Mia',
        'talking',
        sentence.includes(genericTargetWord)
          ? sentence
          : `I hear ${genericTargetWord} in this sentence: ${sentence}`,
      ),
    ];
  }

  if (type === 'argue') {
    return [
      line('mia', 'Mia', 'talking', `I hear ${genericTargetWord} in this scene: ${sentence}`),
      line('ray', 'Ray', 'confused', `I hear ${genericTargetWord}, but I am not sure what the situation means.`),
      line('mia', 'Mia', 'thinking', `${genericTargetWord} points to ${definition}.`),
      line('ray', 'Ray', 'surprised', `So ${genericTargetWord} is not just a random word here.`),
      line('mia', 'Mia', 'confident', `Right. ${genericTargetWord} gets its meaning from the scene.`),
    ];
  }

  if (type === 'ask') {
    return [
      line('ray', 'Ray', 'talking', `Where do you hear ${genericTargetWord}?`),
      line('mia', 'Mia', 'confident', `I hear ${genericTargetWord} here: ${sentence}`),
      line('ray', 'Ray', 'thinking', `Does ${genericTargetWord} connect to ${definition}?`),
      line('mia', 'Mia', 'talking', `Yes, ${genericTargetWord} fits that idea.`),
      line('ray', 'Ray', 'happy', `Okay, ${genericTargetWord} makes more sense now.`),
    ];
  }

  if (type === 'super_memo') {
    return [
      line('ray', 'Ray', 'surprised', `I want a picture for ${genericTargetWord}.`),
      line('mia', 'Mia', 'talking', `Imagine ${genericTargetWord} inside this scene: ${sentence}`),
      line('ray', 'Ray', 'happy', `My memory hook for ${genericTargetWord} should be vivid.`),
      line('mia', 'Mia', 'confident', `${genericTargetWord} should point to ${definition}.`),
      line('ray', 'Ray', 'thinking', `Good. ${genericTargetWord} now has a picture in my head.`),
    ];
  }

  return undefined;
}

function line(
  characterId: string,
  characterName: string,
  emotion: CharacterDialogueLine['emotion'],
  text: string,
): CharacterDialogueLine {
  return { characterId, characterName, emotion, text };
}
