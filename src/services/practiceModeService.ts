import { GeneratedLesson } from '../types/lesson';
import { WorkoutModule } from '../types/navigation';

type PracticeOption = {
  id: string;
  text: string;
};

export type PracticeExercise = {
  wordId: string;
  targetWord: string;
  sentence: string;
  question?: string;
  options: PracticeOption[];
  correctOptionId: string;
};

export function getPracticeExercises(
  lesson: GeneratedLesson,
  module: Extract<WorkoutModule, 'feel' | 'same_different' | 'best_sentence' | 'fast_flash'>,
): PracticeExercise[] {
  return lesson.words.map((word, index) => {
    const context = lesson.contextSentences.find((item) => item.wordId === word.id) ?? lesson.contextSentences[index];
    const sentence = context?.sentence ?? word.exampleSentence ?? word.example;
    const targetWord = context?.targetWord ?? word.text;

    if (module === 'feel') {
      return createFeelExercise(word.id, targetWord, sentence);
    }

    if (module === 'same_different') {
      return createSameDifferentExercise(word.id, targetWord, sentence, index);
    }

    if (module === 'best_sentence') {
      return createBestSentenceExercise(word.id, targetWord, sentence);
    }

    return {
      wordId: word.id,
      targetWord,
      sentence,
      options: [
        { id: 'got-it', text: 'Got it' },
        { id: 'again', text: 'Again' },
      ],
      correctOptionId: 'got-it',
    };
  });
}

export function getPracticeTitle(module: Extract<WorkoutModule, 'feel' | 'same_different' | 'best_sentence' | 'fast_flash'>) {
  if (module === 'feel') return 'Feel';
  if (module === 'same_different') return 'Same / Different';
  if (module === 'best_sentence') return 'Best Sentence';
  return 'Fast Flash';
}

function createFeelExercise(wordId: string, targetWord: string, sentence: string): PracticeExercise {
  const correctFeelingByWord: Record<string, string> = {
    reluctant: 'unsure',
    risky: 'careful',
    curious: 'interested',
    bold: 'brave',
    brief: 'quick',
    honest: 'truthful',
  };
  const correct = correctFeelingByWord[targetWord.toLowerCase()] ?? 'unsure';
  const options = uniqueOptions([correct, 'ready', 'angry']);

  return {
    wordId,
    targetWord,
    sentence,
    question: 'How did they feel?',
    options,
    correctOptionId: options.find((option) => option.text === correct)?.id ?? options[0].id,
  };
}

function createSameDifferentExercise(
  wordId: string,
  targetWord: string,
  sentence: string,
  index: number,
): PracticeExercise {
  const sameIdeaByWord: Record<string, string> = {
    reluctant: 'He did not want to speak.',
    risky: 'The plan could be dangerous.',
    curious: 'She wanted to know more.',
    bold: 'She made a brave choice.',
    brief: 'The answer was short.',
    honest: 'He told the truth.',
  };
  const differentIdeaByWord: Record<string, string> = {
    reluctant: 'He was excited to speak.',
    risky: 'The plan was completely safe.',
    curious: 'She did not care.',
    bold: 'She was afraid to choose.',
    brief: 'The answer was very long.',
    honest: 'He lied.',
  };
  const sameIdea = index % 2 === 0;

  return {
    wordId,
    targetWord,
    sentence: `${sentence}\n${sameIdea ? sameIdeaByWord[targetWord.toLowerCase()] : differentIdeaByWord[targetWord.toLowerCase()] ?? 'This means something different.'}`,
    question: 'Same idea or different idea?',
    options: [
      { id: 'same', text: 'Same idea' },
      { id: 'different', text: 'Different idea' },
    ],
    correctOptionId: sameIdea ? 'same' : 'different',
  };
}

function createBestSentenceExercise(wordId: string, targetWord: string, sentence: string): PracticeExercise {
  return {
    wordId,
    targetWord,
    sentence: targetWord,
    question: 'Pick the best sentence.',
    options: [
      { id: 'best', text: sentence },
      { id: 'bad-order', text: `${capitalize(targetWord)} answer quickly.` },
      { id: 'bad-form', text: `He was ${targetWord}ly answer.` },
    ],
    correctOptionId: 'best',
  };
}

function uniqueOptions(values: string[]): PracticeOption[] {
  return Array.from(new Set(values)).map((text, index) => ({ id: `option-${index}`, text }));
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
