import { LanguageCode, LevelCode } from './language';
import { Word } from './lesson';

export type InterestCode =
  | 'technology'
  | 'business'
  | 'sport'
  | 'relationships'
  | 'travel'
  | 'psychology'
  | 'health'
  | 'money'
  | 'food'
  | 'dailyLife'
  | 'culture';

export type VocabularyGoal =
  | 'understandReading'
  | 'speakNaturally'
  | 'understandListening'
  | 'businessVocabulary'
  | 'activateRecognizedWords'
  | 'dailyUsefulWords';

export type Interest = {
  code: InterestCode;
  label: string;
  description: string;
};

export type MemoryStage =
  | 'new'
  | 'seen'
  | 'recognized'
  | 'understoodInContext'
  | 'meaningRecalled'
  | 'recognizedInListening'
  | 'usedInGuidedSentence'
  | 'usedFreely'
  | 'automaticActiveVocabulary';

export type GrammarType =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'phrasalVerb'
  | 'idiom'
  | 'collocation'
  | 'phrase';

export type WordMetadata = {
  wordId: string;
  frequencyRank: number;
  usefulnessScore: number;
  difficulty: number;
  concreteness: number;
  polysemyLevel: number;
  grammarType: GrammarType;
  topicTags: InterestCode[];
  collocations: string[];
  exampleContexts: string[];
};

export type UserWordState = {
  wordId: string;
  language: LanguageCode;
  level: LevelCode;
  memoryStage: MemoryStage;
  recognitionScore: number;
  meaningRecallScore: number;
  contextualUnderstandingScore: number;
  listeningRecognitionScore: number;
  usageRecallScore: number;
  speakingActivationScore: number;
  confidenceScore: number;
  difficulty: number;
  stability: number;
  lastSeenAt?: string;
  nextReviewAt?: string;
  exposures: number;
  correctAnswers: number;
  wrongAnswers: number;
  averageResponseTimeMs?: number;
  lastReviewType?: ReviewContextType;
};

export type WordSelectionScore = {
  word: Word;
  metadata?: WordMetadata;
  score: number;
  reasons: string[];
};

export type MemoryHook = {
  wordId: string;
  visualAssociation: string;
  emotionalCue: string;
  bodyActionCue: string;
  miniStory: string;
  absurdImage?: string;
  collocations: string[];
  contrasts: string[];
};

export type ReviewContextType =
  | 'story'
  | 'microContext'
  | 'listening'
  | 'personal'
  | 'contrast'
  | 'production';

export type ReviewAttemptInput = {
  wordId: string;
  correct: boolean;
  responseTimeMs: number;
  confidence: 'low' | 'medium' | 'high';
  hintUsed: boolean;
  reviewType: ReviewContextType;
};

export type ReviewScheduleResult = {
  wordId: string;
  nextReviewAt: string;
  intervalDays: number;
  stability: number;
};
