import { ReviewAttemptInput, ReviewScheduleResult, UserWordState } from '../types/vocabulary';

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function scheduleNextReview(
  attempt: ReviewAttemptInput,
  currentState?: UserWordState,
): ReviewScheduleResult {
  const fast = attempt.responseTimeMs <= 3500;
  const confident = attempt.confidence === 'high';
  const currentStability = currentState?.stability ?? 1;

  let intervalDays = 1;
  let stability = currentStability;

  if (!attempt.correct) {
    intervalDays = currentState && currentState.wrongAnswers >= 2 ? 0 : 1;
    stability = Math.max(0.5, currentStability * 0.65);
  } else if (fast && confident && !attempt.hintUsed) {
    intervalDays = Math.min(30, Math.ceil(currentStability * 3));
    stability = currentStability + 1.4;
  } else {
    intervalDays = Math.min(7, Math.ceil(currentStability * 1.5));
    stability = currentStability + 0.5;
  }

  return {
    wordId: attempt.wordId,
    intervalDays,
    stability,
    nextReviewAt: addDays(intervalDays),
  };
}
