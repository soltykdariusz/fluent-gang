import { LanguageCode, LevelCode } from './language';
import { MemoryHook } from './vocabulary';

export type LessonMode = 'standardContext' | 'funnyStory' | 'dialogue' | 'superMemory';
export type SessionSize = 1 | 3 | 5 | 8;
export type SessionStatus = 'active' | 'completed' | 'abandoned';

export type WordDiscoveryStatus = 'known' | 'recognized' | 'new';
export type WorkoutWordStatus = 'new' | 'familiar' | 'reinforce' | 'review';
export type MiniUsageExerciseType = 'insert_word' | 'correct_usage';

export type WordProgressState =
  | 'new'
  | 'recognized'
  | 'practiced'
  | 'familiar'
  | 'activeVocabulary'
  | 'mastered';

export type Word = {
  id: string;
  text: string;
  language: LanguageCode;
  level: LevelCode;
  translation?: string;
  definition?: string;
  example?: string;
  additionalMeanings?: string[];
};

export type SelectedWord = Word & {
  discoveryStatus: WordDiscoveryStatus;
  status?: WorkoutWordStatus;
};

export type LessonWord = Word & {
  definition: string;
  example: string;
  status?: WorkoutWordStatus;
  simpleDefinition?: string;
  exampleSentence?: string;
  memoryHook?: string;
  commonPattern?: string;
};

export type TrueFalseQuestion = {
  id: string;
  wordId?: string;
  wordText?: string;
  statement: string;
  answer: boolean;
  explanation: string;
  baseSentence?: string;
  questionText?: string;
  correctAnswer?: boolean;
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
};

export type ContextSentence = {
  wordId: string;
  sentence: string;
  targetWord: string;
  hint: string;
  level: LevelCode;
};

export type MiniUsageOption = {
  id: string;
  text: string;
};

export type MiniUsageExercise = {
  id: string;
  wordId: string;
  type: MiniUsageExerciseType;
  prompt: string;
  options: MiniUsageOption[];
  correctOptionId: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
};

export type ShadowingSentence = {
  wordId: string;
  sentence: string;
  targetWord: string;
};

export type ShadowingSet = {
  wordId: string;
  targetWord: string;
  sentences: string[];
  playbackSpeedOptions: Array<0.75 | 1 | 1.25>;
  audioUrl?: string;
};

export type WordDefinition = {
  wordId: string;
  targetWord: string;
  simpleDefinition: string;
  exampleSentence: string;
  memoryHook: string;
  commonPattern?: string;
};

export type GeneratedLesson = {
  id: string;
  sessionId?: string;
  userId?: string;
  sessionSize: SessionSize;
  startedAt: string;
  completedAt?: string;
  status: SessionStatus;
  title: string;
  mode: LessonMode;
  targetLanguage: LanguageCode;
  level: LevelCode;
  words: LessonWord[];
  selectedWords?: LessonWord[];
  contextSentences: ContextSentence[];
  trueFalseQuestions: TrueFalseQuestion[];
  definitions: WordDefinition[];
  miniUsageExercises: MiniUsageExercise[];
  shadowingSentences: ShadowingSentence[];
  shadowingSets: ShadowingSet[];
  readingText: string;
  shadowingText: string;
  contextQuiz: TrueFalseQuestion[];
  definitionQuiz: TrueFalseQuestion[];
  memoryHooks: MemoryHook[];
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

export type QuizSummary = {
  answers: Record<string, boolean>;
  score: number;
  total: number;
};

export type WordSelfAssessmentStatus = 'new' | 'recognized' | 'active';
