import { LessonMode, GeneratedLesson, Word } from '../types/lesson';
import { LanguageCode, LevelCode } from '../types/language';

type GenerateLessonInput = {
  words: Word[];
  mode: LessonMode;
  targetLanguage: LanguageCode;
  nativeLanguage: LanguageCode;
  level: LevelCode;
};

export function buildLessonPrompt(input: GenerateLessonInput): string {
  const words = input.words.map((word) => word.text).join(', ');
  return [
    'You are an expert language learning content designer for Fluent Gang.',
    `Target language: ${input.targetLanguage}. Native language: ${input.nativeLanguage}. Level: ${input.level}.`,
    `Lesson mode: ${input.mode}. Practice words: ${words}.`,
    'Create one contextual lesson text, simple level-matched definitions, examples, one true/false context question per practiced word, one true/false definition question per practiced word, and a shadowing-friendly version.',
    input.mode === 'superMemory'
      ? 'Super Memory mode: create an exaggerated, vivid, funny, memorable single-thread story using absurd imagery, emotional hooks, and strong associations.'
      : 'Keep the content natural, useful, and easy to understand.',
    'Return strict JSON matching the app lesson schema.',
  ].join('\n');
}

export async function generateLesson(input: GenerateLessonInput): Promise<GeneratedLesson> {
  // TODO: Replace mock with a Supabase Edge Function calling the OpenAI API.
  // Never expose OPENAI_API_KEY directly in the mobile app.
  await new Promise((resolve) => setTimeout(resolve, 700));

  const [firstWord, secondWord, thirdWord, fourthWord, fifthWord] = input.words.map((word) => word.text);
  const isSuperMemory = input.mode === 'superMemory';
  const readingText = isSuperMemory
    ? `A ${firstWord} chef ran into a ${secondWord} at sunrise, wearing a ${thirdWord} hat that flashed like a tiny lighthouse. He had to ${fourthWord} a ${fifthWord} backpack full of dancing notebooks, and every notebook shouted one useful sentence. People stopped, laughed, and pointed, because the scene was impossible to ignore. By the end of the street, the chef repeated the words again, connected them to the funny picture, and felt that the memory was already stronger.`
    : `Today, a ${firstWord} learner visited a ${secondWord} before class. The morning was ${thirdWord}, so she decided to ${fourthWord} a ${fifthWord} notebook and write down useful sentences from real life. First, she listened to people speaking naturally. Then she read the signs, repeated short phrases, and checked how each new word changed the meaning of the story. After ten minutes, the words did not feel random anymore. They belonged to one clear situation, and that made them easier to remember.`;

  const words = input.words.map((word) => ({
    ...word,
    definition: `A simple ${input.level} definition for "${word.text}" used in everyday context.`,
    example: `I can use "${word.text}" in a short sentence today.`,
  }));
  const contextQuizStatements = isSuperMemory
    ? [
        {
          statement: `The chef in the story is described as ${firstWord}.`,
          answer: true,
          explanation: `Yes. ${firstWord} describes the chef at the start of the story.`,
        },
        {
          statement: `The ${secondWord} appears late at night, not at sunrise.`,
          answer: false,
          explanation: `Not quite. The story says the chef ran into it at sunrise.`,
        },
        {
          statement: `The ${thirdWord} hat flashes like a tiny lighthouse.`,
          answer: true,
          explanation: `Yes. The hat is described with that vivid image.`,
        },
        {
          statement: `The chef does not need to ${fourthWord} anything in the story.`,
          answer: false,
          explanation: `Actually, the chef has to ${fourthWord} the backpack.`,
        },
        {
          statement: `The ${fifthWord} backpack is connected to dancing notebooks.`,
          answer: true,
          explanation: `Yes. The backpack is part of the memorable notebook scene.`,
        },
      ]
    : [
        {
          statement: `The learner in the text is described as ${firstWord}.`,
          answer: true,
          explanation: `Yes. ${firstWord} describes the learner in the opening sentence.`,
        },
        {
          statement: `The learner visits the ${secondWord} after class.`,
          answer: false,
          explanation: `Not quite. The text says the visit happens before class.`,
        },
        {
          statement: `The morning is described as ${thirdWord}.`,
          answer: true,
          explanation: `Yes. ${thirdWord} describes the morning.`,
        },
        {
          statement: `The learner decides to ${fourthWord} a notebook.`,
          answer: true,
          explanation: `Yes. The notebook is something the learner decides to ${fourthWord}.`,
        },
        {
          statement: `The ${fifthWord} notebook is used for drawing only, not sentences.`,
          answer: false,
          explanation: `Not quite. The learner uses it to write useful sentences.`,
        },
      ];

  return {
    id: `lesson-${Date.now()}`,
    title: isSuperMemory ? 'The unforgettable word story' : 'A short context lesson',
    mode: input.mode,
    targetLanguage: input.targetLanguage,
    level: input.level,
    words,
    readingText,
    shadowingText: readingText
      .split('. ')
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .join('.\n\n'),
    contextQuiz: words.map((word, index) => ({
      id: `context-${word.id}`,
      wordId: word.id,
      wordText: word.text,
      statement: contextQuizStatements[index]?.statement ?? `"${word.text}" appears in the lesson context.`,
      answer: contextQuizStatements[index]?.answer ?? true,
      explanation: contextQuizStatements[index]?.explanation ?? `"${word.text}" is practiced inside the lesson text.`,
    })),
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
  };
}
