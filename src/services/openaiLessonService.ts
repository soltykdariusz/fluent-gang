import { LessonMode, GeneratedLesson, MiniUsageExercise, SelectedWord, SessionSize } from '../types/lesson';
import { LanguageCode, LevelCode } from '../types/language';

type GenerateLessonInput = {
  words: SelectedWord[];
  mode: LessonMode;
  targetLanguage: LanguageCode;
  nativeLanguage: LanguageCode;
  level: LevelCode;
  sessionSize: SessionSize;
};

export function buildLessonPrompt(input: GenerateLessonInput): string {
  const words = input.words.map((word) => word.text).join(', ');
  return [
    'You are an expert language learning content designer for Fluent Gang.',
    `Target language: ${input.targetLanguage}. Native language: ${input.nativeLanguage}. Level: ${input.level}.`,
    `Word Workout mode: ${input.mode}. Practice words: ${words}.`,
    'Create a sentence-based vocabulary workout. Important: one trained word = one very simple sentence.',
    'For each word, create exactly one short context sentence using only that trained word as the new word. The rest of the sentence must be obvious and easy.',
    'Then create one true/false context check per word, short definitions, one mini usage exercise per word, and one simple shadowing sentence per word.',
    input.mode === 'superMemory'
      ? 'Super Memory can make the hint and memory hook vivid, funny, and memorable, but the context sentence must still stay short and simple.'
      : 'Keep every sentence natural, useful, and easy to understand.',
    'Return strict JSON matching the app lesson schema.',
  ].join('\n');
}

export async function generateLesson(input: GenerateLessonInput): Promise<GeneratedLesson> {
  // TODO: Replace mock with a Supabase Edge Function calling the OpenAI API.
  // Never expose OPENAI_API_KEY directly in the mobile app.
  await new Promise((resolve) => setTimeout(resolve, 700));

  const words = input.words.slice(0, input.sessionSize).map((word) => ({
    ...word,
    definition: word.definition ?? `A simple ${input.level} definition for "${word.text}" used in everyday context.`,
    example: word.example ?? `I can use "${word.text}" in a short sentence today.`,
    simpleDefinition: word.definition ?? `A simple meaning for "${word.text}".`,
    exampleSentence: word.example ?? `This is a simple example with "${word.text}".`,
    memoryHook: `Imagine "${word.text}" glowing green in one very clear scene.`,
    commonPattern: getCommonPattern(word.text),
    status: word.status ?? mapDiscoveryToWorkoutStatus(word.discoveryStatus),
  }));
  const contextSentences = words.map((word) => createContextSentence(word.id, word.text, input.level));
  const trueFalseQuestions = words.map((word, index) =>
    createTrueFalseQuestion(word.id, word.text, contextSentences[index].sentence),
  );
  const definitions = words.map((word) => ({
    wordId: word.id,
    targetWord: word.text,
    simpleDefinition: word.simpleDefinition ?? word.definition,
    exampleSentence: word.exampleSentence ?? word.example,
    memoryHook: word.memoryHook ?? `Imagine "${word.text}" in one clear scene.`,
    commonPattern: word.commonPattern,
  }));
  const miniUsageExercises = words.map((word, index) => createMiniUsageExercise(word.id, word.text, index));
  const shadowingSentences = words.map((word) => createShadowingSentence(word.id, word.text));
  const shadowingSets = words.map((word) => createShadowingSet(word.id, word.text));
  const readingText = contextSentences.map((item) => item.sentence).join('\n');
  const shadowingText = shadowingSentences.map((item) => item.sentence).join('\n');

  return {
    id: `lesson-${Date.now()}`,
    sessionId: `session-${Date.now()}`,
    userId: 'mock-user',
    sessionSize: input.sessionSize,
    startedAt: new Date().toISOString(),
    status: 'active',
    title: 'Daily Word Workout',
    mode: input.mode,
    targetLanguage: input.targetLanguage,
    level: input.level,
    words,
    selectedWords: words,
    contextSentences,
    trueFalseQuestions,
    definitions,
    miniUsageExercises,
    shadowingSentences,
    shadowingSets,
    readingText,
    shadowingText,
    contextQuiz: trueFalseQuestions,
    definitionQuiz: words.map((word, index) => ({
      id: `definition-${word.id}`,
      wordId: word.id,
      wordText: word.text,
      statement:
        index % 2 === 0
          ? `The example sentence for "${word.text}" shows how the word can be used today.`
          : `The definition for "${word.text}" should be much harder than the learner's level.`,
      answer: index % 2 === 0,
      explanation:
        index % 2 === 0
          ? `Yes. A usable example helps connect the word with real context.`
          : `No. Definitions should match ${input.level}, not feel unnecessarily difficult.`,
    })),
    memoryHooks: words.map((word) => ({
      wordId: word.id,
      visualAssociation: word.memoryHook ?? `Imagine "${word.text}" as one clear image.`,
      emotionalCue: `Connect "${word.text}" with a small feeling of progress.`,
      bodyActionCue: `Make a small gesture while saying "${word.text}" aloud.`,
      miniStory: `A tiny scene uses "${word.text}" in a way that is easy to recall later.`,
      absurdImage: `The word "${word.text}" glows green every time it appears in your memory.`,
      collocations: word.commonPattern ? [word.commonPattern] : [],
      contrasts: [],
    })),
  };
}

function mapDiscoveryToWorkoutStatus(status: SelectedWord['discoveryStatus']) {
  if (status === 'known') {
    return 'review';
  }
  if (status === 'recognized') {
    return 'reinforce';
  }
  return 'new';
}

function createContextSentence(wordId: string, targetWord: string, level: LevelCode) {
  const knownSentences: Record<string, { sentence: string; hint: string }> = {
    reluctant: {
      sentence: 'He was reluctant to speak.',
      hint: 'A feeling before doing something you do not really want to do.',
    },
    bold: {
      sentence: 'She made a bold choice.',
      hint: 'A strong, brave kind of choice.',
    },
    brief: {
      sentence: 'I need a brief answer.',
      hint: 'Something short, not long.',
    },
    risky: {
      sentence: 'The plan seems risky.',
      hint: 'Something may go wrong.',
    },
    honest: {
      sentence: 'He gave an honest reply.',
      hint: 'A reply that is true.',
    },
    curious: {
      sentence: 'I am curious about this word.',
      hint: 'You want to know more.',
    },
    market: {
      sentence: 'We buy fruit at the market.',
      hint: 'A place where people buy things.',
    },
    bright: {
      sentence: 'The room is bright today.',
      hint: 'There is a lot of light.',
    },
    carry: {
      sentence: 'I carry my bag.',
      hint: 'You hold it and take it with you.',
    },
    simple: {
      sentence: 'This sentence is simple.',
      hint: 'Easy to understand.',
    },
  };
  const match = knownSentences[targetWord.toLowerCase()] ?? {
    sentence: `I can see the ${targetWord} today.`,
    hint: `Focus on "${targetWord}". The rest of the sentence is simple.`,
  };

  return {
    wordId,
    sentence: match.sentence,
    targetWord,
    hint: match.hint,
    level,
  };
}

function createTrueFalseQuestion(wordId: string, targetWord: string, baseSentence: string) {
  const knownQuestions: Record<string, { questionText: string; correctAnswer: boolean; feedbackCorrect: string; feedbackIncorrect: string }> = {
    reluctant: {
      questionText: 'He wanted to speak very much.',
      correctAnswer: false,
      feedbackCorrect: 'Exactly. “Reluctant” means he did not really want to do it.',
      feedbackIncorrect: 'Almost. “Reluctant” means he did not really want to do it.',
    },
    bold: {
      questionText: 'Her choice was brave.',
      correctAnswer: true,
      feedbackCorrect: 'Nice. “Bold” can mean brave and confident.',
      feedbackIncorrect: 'Close. A “bold” choice is brave or confident.',
    },
    brief: {
      questionText: 'The answer should be very long.',
      correctAnswer: false,
      feedbackCorrect: 'Exactly. “Brief” means short.',
      feedbackIncorrect: 'Almost. “Brief” means short, not long.',
    },
    risky: {
      questionText: 'The plan may be dangerous.',
      correctAnswer: true,
      feedbackCorrect: 'Yes. “Risky” means something may go wrong.',
      feedbackIncorrect: 'Close. “Risky” means there is possible danger.',
    },
    honest: {
      questionText: 'His reply was true.',
      correctAnswer: true,
      feedbackCorrect: 'Exactly. “Honest” means truthful.',
      feedbackIncorrect: 'Almost. “Honest” means truthful.',
    },
    curious: {
      questionText: 'I want to know more about the word.',
      correctAnswer: true,
      feedbackCorrect: 'Nice. “Curious” means you want to know or learn more.',
      feedbackIncorrect: 'Almost. “Curious” means wanting to know more.',
    },
    market: {
      questionText: 'We buy fruit in this place.',
      correctAnswer: true,
      feedbackCorrect: 'Exactly. A “market” is a place where people buy and sell things.',
      feedbackIncorrect: 'Close. A “market” is a place where people buy and sell things.',
    },
    bright: {
      questionText: 'The room has very little light.',
      correctAnswer: false,
      feedbackCorrect: 'Exactly. “Bright” means full of light.',
      feedbackIncorrect: 'Almost. “Bright” means full of light.',
    },
    carry: {
      questionText: 'I hold my bag and take it with me.',
      correctAnswer: true,
      feedbackCorrect: 'Yes. “Carry” means hold something and take it somewhere.',
      feedbackIncorrect: 'Close. “Carry” means hold something and take it somewhere.',
    },
    simple: {
      questionText: 'The sentence is hard to understand.',
      correctAnswer: false,
      feedbackCorrect: 'Exactly. “Simple” means easy to understand or do.',
      feedbackIncorrect: 'Almost. “Simple” means easy, not hard.',
    },
  };
  const match = knownQuestions[targetWord.toLowerCase()] ?? {
    questionText: `"${targetWord}" changes the meaning of the sentence.`,
    correctAnswer: true,
    feedbackCorrect: `Nice. You noticed how "${targetWord}" works in context.`,
    feedbackIncorrect: `Look again at the sentence and focus only on "${targetWord}".`,
  };

  return {
    id: `context-${wordId}`,
    wordId,
    wordText: targetWord,
    baseSentence,
    questionText: match.questionText,
    statement: match.questionText,
    correctAnswer: match.correctAnswer,
    answer: match.correctAnswer,
    feedbackCorrect: match.feedbackCorrect,
    feedbackIncorrect: match.feedbackIncorrect,
    explanation: match.feedbackCorrect,
  };
}

type MiniUsageTemplate = Omit<MiniUsageExercise, 'id' | 'wordId'>;

function createMiniUsageExercise(wordId: string, targetWord: string, index: number): MiniUsageExercise {
  const knownExercises: Record<string, MiniUsageTemplate> = {
    reluctant: {
      type: 'insert_word',
      prompt: 'He was ______ to speak.',
      options: [
        { id: 'reluctant', text: 'reluctant' },
        { id: 'excited', text: 'excited' },
        { id: 'proud', text: 'proud' },
      ],
      correctOptionId: 'reluctant',
      feedbackCorrect: 'Great. “Reluctant to speak” sounds natural.',
      feedbackIncorrect: 'Try the word that means not wanting to do it.',
    },
    bold: {
      type: 'correct_usage',
      prompt: 'Which is correct?',
      options: [
        { id: 'bold-choice', text: 'a bold choice' },
        { id: 'boldly-choice', text: 'a boldly choice' },
      ],
      correctOptionId: 'bold-choice',
      feedbackCorrect: 'Yes. “A bold choice” is the useful pattern.',
      feedbackIncorrect: 'Almost. Say “a bold choice”.',
    },
    brief: {
      type: 'insert_word',
      prompt: 'I need a ______ answer.',
      options: [
        { id: 'brief', text: 'brief' },
        { id: 'loud', text: 'loud' },
        { id: 'strange', text: 'strange' },
      ],
      correctOptionId: 'brief',
      feedbackCorrect: 'Nice. “A brief answer” means a short answer.',
      feedbackIncorrect: 'Try the word that means short.',
    },
    risky: {
      type: 'correct_usage',
      prompt: 'Which is correct?',
      options: [
        { id: 'risky-plan', text: 'a risky plan' },
        { id: 'risk plan', text: 'a risk plan' },
      ],
      correctOptionId: 'risky-plan',
      feedbackCorrect: 'Exactly. “A risky plan” sounds natural.',
      feedbackIncorrect: 'Close. Use “risky” before the noun.',
    },
    honest: {
      type: 'insert_word',
      prompt: 'He gave an ______ reply.',
      options: [
        { id: 'honest', text: 'honest' },
        { id: 'empty', text: 'empty' },
        { id: 'angry', text: 'angry' },
      ],
      correctOptionId: 'honest',
      feedbackCorrect: 'Great. “An honest reply” means a truthful reply.',
      feedbackIncorrect: 'Try the word that means truthful.',
    },
    curious: {
      type: 'insert_word',
      prompt: 'I am ______ about this word.',
      options: [
        { id: 'curious', text: 'curious' },
        { id: 'tired', text: 'tired' },
        { id: 'cold', text: 'cold' },
      ],
      correctOptionId: 'curious',
      feedbackCorrect: 'Great. “Curious about” is a useful pattern.',
      feedbackIncorrect: 'Try the word that means wanting to know more.',
    },
    market: {
      type: 'insert_word',
      prompt: 'We buy fruit at the ______.',
      options: [
        { id: 'market', text: 'market' },
        { id: 'sky', text: 'sky' },
        { id: 'song', text: 'song' },
      ],
      correctOptionId: 'market',
      feedbackCorrect: 'Nice. “At the market” sounds natural.',
      feedbackIncorrect: 'Try the place where people buy things.',
    },
    bright: {
      type: 'correct_usage',
      prompt: 'Which is correct?',
      options: [
        { id: 'bright-room', text: 'a bright room' },
        { id: 'brightly-room', text: 'a brightly room' },
      ],
      correctOptionId: 'bright-room',
      feedbackCorrect: 'Exactly. “A bright room” is the useful pattern.',
      feedbackIncorrect: 'Almost. Say “a bright room”.',
    },
    carry: {
      type: 'insert_word',
      prompt: 'I ______ my bag.',
      options: [
        { id: 'carry', text: 'carry' },
        { id: 'sleep', text: 'sleep' },
        { id: 'shine', text: 'shine' },
      ],
      correctOptionId: 'carry',
      feedbackCorrect: 'Good. “Carry my bag” is simple and useful.',
      feedbackIncorrect: 'Try the word that means hold and take with you.',
    },
    simple: {
      type: 'correct_usage',
      prompt: 'Which is correct?',
      options: [
        { id: 'simple-sentence', text: 'a simple sentence' },
        { id: 'simply-sentence', text: 'a simply sentence' },
      ],
      correctOptionId: 'simple-sentence',
      feedbackCorrect: 'Yes. “A simple sentence” sounds natural.',
      feedbackIncorrect: 'Close. Say “a simple sentence”.',
    },
  };
  const fallback: MiniUsageTemplate = {
    type: index % 2 === 0 ? 'insert_word' as const : 'correct_usage' as const,
    prompt: index % 2 === 0 ? `Choose "${targetWord}" for the blank.` : 'Which is correct?',
    options: index % 2 === 0
      ? [
          { id: targetWord, text: targetWord },
          { id: `${targetWord}-other-1`, text: 'happy' },
          { id: `${targetWord}-other-2`, text: 'small' },
        ]
      : [
          { id: `${targetWord}-correct`, text: `${targetWord} today` },
          { id: `${targetWord}-wrong`, text: `${targetWord}ed today` },
        ],
    correctOptionId: index % 2 === 0 ? targetWord : `${targetWord}-correct`,
    feedbackCorrect: `Nice. You used "${targetWord}" in a simple pattern.`,
    feedbackIncorrect: `Almost. Focus on the simplest natural use of "${targetWord}".`,
  };
  const exercise = knownExercises[targetWord.toLowerCase()] ?? fallback;
  return {
    id: `mini-${wordId}`,
    wordId,
    ...exercise,
  };
}

function createShadowingSentence(wordId: string, targetWord: string) {
  const knownSentences: Record<string, string> = {
    reluctant: 'I was reluctant at first.',
    bold: 'She made a bold choice.',
    brief: 'Give me a brief answer.',
    risky: 'That plan is risky.',
    honest: 'He gave an honest reply.',
    curious: 'I am curious today.',
    market: 'We go to the market.',
    bright: 'The room is bright.',
    carry: 'I carry my bag.',
    simple: 'Keep it simple.',
  };
  return {
    wordId,
    sentence: knownSentences[targetWord.toLowerCase()] ?? `I can say ${targetWord} today.`,
    targetWord,
  };
}

function createShadowingSet(wordId: string, targetWord: string) {
  const knownSets: Record<string, string[]> = {
    reluctant: [
      'I was reluctant at first.',
      'She was reluctant to answer.',
      'He seemed reluctant to join us.',
      'They were reluctant to change the plan.',
      'Tom is reluctant to speak today.',
    ],
    bold: [
      'She made a bold choice.',
      'That was a bold move.',
      'He gave a bold answer.',
      'Be bold and try again.',
      'It was a bold idea.',
    ],
    brief: [
      'Please give me a brief answer.',
      'The meeting was brief.',
      'I wrote a brief note.',
      'She gave a brief explanation.',
      'Let’s take a brief break.',
    ],
    risky: [
      'That plan is risky.',
      'It is risky to drive fast.',
      'The idea seems risky.',
      'This move is risky.',
      'A risky choice can fail.',
    ],
    honest: [
      'He gave an honest reply.',
      'She is an honest person.',
      'Please be honest with me.',
      'That was an honest mistake.',
      'I want an honest answer.',
    ],
    curious: [
      'I am curious today.',
      'She is curious about words.',
      'He looks curious.',
      'A curious learner asks questions.',
      'Stay curious every day.',
    ],
    market: [
      'We go to the market.',
      'The market is open.',
      'I buy fruit at the market.',
      'This market is busy.',
      'Meet me at the market.',
    ],
    bright: [
      'The room is bright.',
      'It is a bright day.',
      'She has a bright smile.',
      'This light is bright.',
      'The screen looks bright.',
    ],
    carry: [
      'I carry my bag.',
      'She can carry the box.',
      'Please carry this for me.',
      'He carries a notebook.',
      'I carry water every day.',
    ],
    simple: [
      'Keep it simple.',
      'This sentence is simple.',
      'The idea is simple.',
      'Use a simple word.',
      'Make the answer simple.',
    ],
  };

  return {
    wordId,
    targetWord,
    sentences: knownSets[targetWord.toLowerCase()] ?? [
      `Say ${targetWord} today.`,
      `Use ${targetWord} once.`,
      `${targetWord} feels easier now.`,
    ],
    playbackSpeedOptions: [0.75, 1, 1.25] as Array<0.75 | 1 | 1.25>,
  };
}

function getCommonPattern(word: string) {
  const patterns: Record<string, string> = {
    reluctant: 'reluctant to do something',
    bold: 'a bold choice',
    brief: 'a brief answer',
    risky: 'a risky plan',
    honest: 'an honest reply',
    curious: 'curious about something',
    market: 'at the market',
    bright: 'a bright room',
    carry: 'carry a bag',
    simple: 'a simple sentence',
  };
  return patterns[word.toLowerCase()] ?? `${word} + simple sentence`;
}
