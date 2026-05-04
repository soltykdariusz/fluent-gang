import { LanguageCode, LevelCode } from './language';

export type LessonMode = 'news' | 'sport' | 'lifestyle' | 'superMemory';

export type Word = {
  id: string;
  text: string;
  language: LanguageCode;
  level: LevelCode;
  translation?: string;
};

export type LessonWord = Word & {
  definition: string;
  example: string;
};

export type TrueFalseQuestion = {
  id: string;
  wordId?: string;
  wordText?: string;
  statement: string;
  answer: boolean;
  explanation: string;
};

export type GeneratedLesson = {
  id: string;
  title: string;
  mode: LessonMode;
  targetLanguage: LanguageCode;
  level: LevelCode;
  words: LessonWord[];
  readingText: string;
  shadowingText: string;
  contextQuiz: TrueFalseQuestion[];
  definitionQuiz: TrueFalseQuestion[];
  audioUrl?: string;
};

export type LessonResult = {
  lessonId: string;
  completedAt: string;
  contextScore: number;
  definitionScore: number;
  practicedWordIds: string[];
  durationSeconds: number;
};
