import {
  MemoryStage,
  ReviewAttemptInput,
  UserWordState,
} from '../types/vocabulary';
import { LanguageCode, LevelCode } from '../types/language';
import { scheduleNextReview } from './spacedRepetitionService';

export function createInitialUserWordState(
  wordId: string,
  language: LanguageCode,
  level: LevelCode,
  memoryStage: MemoryStage = 'new',
): UserWordState {
  return {
    wordId,
    language,
    level,
    memoryStage,
    recognitionScore: memoryStage === 'recognized' ? 0.35 : 0.1,
    meaningRecallScore: 0,
    contextualUnderstandingScore: 0,
    listeningRecognitionScore: 0,
    usageRecallScore: 0,
    speakingActivationScore: 0,
    confidenceScore: 0.2,
    difficulty: 0.5,
    stability: 1,
    exposures: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  };
}

export function updateUserWordStateFromAttempt(
  currentState: UserWordState,
  attempt: ReviewAttemptInput,
): UserWordState {
  const schedule = scheduleNextReview(attempt, currentState);
  const delta = attempt.correct ? 0.12 : -0.08;
  const confidenceDelta = attempt.confidence === 'high' ? 0.1 : attempt.confidence === 'medium' ? 0.04 : -0.04;
  const nextContextualScore = clamp(currentState.contextualUnderstandingScore + delta);
  const nextMeaningScore = clamp(currentState.meaningRecallScore + (attempt.reviewType === 'production' ? delta : delta / 2));

  return {
    ...currentState,
    memoryStage: resolveMemoryStage(currentState, nextContextualScore, nextMeaningScore, attempt.correct),
    contextualUnderstandingScore: nextContextualScore,
    meaningRecallScore: nextMeaningScore,
    recognitionScore: clamp(currentState.recognitionScore + (attempt.correct ? 0.08 : -0.03)),
    confidenceScore: clamp(currentState.confidenceScore + confidenceDelta),
    stability: schedule.stability,
    lastSeenAt: new Date().toISOString(),
    nextReviewAt: schedule.nextReviewAt,
    exposures: currentState.exposures + 1,
    correctAnswers: currentState.correctAnswers + (attempt.correct ? 1 : 0),
    wrongAnswers: currentState.wrongAnswers + (attempt.correct ? 0 : 1),
    averageResponseTimeMs: currentState.averageResponseTimeMs
      ? Math.round((currentState.averageResponseTimeMs + attempt.responseTimeMs) / 2)
      : attempt.responseTimeMs,
    lastReviewType: attempt.reviewType,
  };
}

function resolveMemoryStage(
  state: UserWordState,
  contextualUnderstandingScore: number,
  meaningRecallScore: number,
  correct: boolean,
): MemoryStage {
  if (!correct) return state.memoryStage === 'seen' ? 'seen' : 'recognized';
  if (meaningRecallScore >= 0.8 && contextualUnderstandingScore >= 0.8) return 'usedInGuidedSentence';
  if (meaningRecallScore >= 0.55) return 'meaningRecalled';
  if (contextualUnderstandingScore >= 0.45) return 'understoodInContext';
  return 'recognized';
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}
