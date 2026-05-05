import { mockWords } from '../data/mockWords';
import { mockWordMetadata } from '../data/mockWordMetadata';
import { LanguageCode, LevelCode } from '../types/language';
import { Word } from '../types/lesson';
import { InterestCode, UserWordState, WordSelectionScore } from '../types/vocabulary';

type SelectWordsInput = {
  language: LanguageCode;
  level: LevelCode;
  interests: InterestCode[];
  userWordStates?: Record<string, UserWordState>;
  limit?: number;
};

export function scoreWord(
  word: Word,
  interests: InterestCode[],
  userWordState?: UserWordState,
): WordSelectionScore {
  const metadata = mockWordMetadata.find((item) => item.wordId === word.id);
  let score = 0;
  const reasons: string[] = [];

  if (metadata) {
    score += metadata.usefulnessScore * 40;
    score += Math.max(0, 1 - metadata.difficulty) * 18;
    score += Math.max(0, 1 - metadata.frequencyRank / 5000) * 18;

    const interestMatches = metadata.topicTags.filter((tag) => interests.includes(tag)).length;
    if (interestMatches > 0) {
      score += interestMatches * 12;
      reasons.push('matches interests');
    }

    if (metadata.polysemyLevel > 0.55) {
      score += 4;
      reasons.push('worth contextual practice');
    }
  } else {
    score += 30;
    reasons.push('fallback word');
  }

  if (!userWordState) {
    score += 16;
    reasons.push('new exposure');
  } else if (userWordState.nextReviewAt && new Date(userWordState.nextReviewAt) <= new Date()) {
    score += 22;
    reasons.push('due for review');
  } else if (userWordState.memoryStage === 'recognized') {
    score += 10;
    reasons.push('reinforcement candidate');
  }

  return { word, metadata, score, reasons };
}

export function selectWordsForVocabularyGrowth(input: SelectWordsInput): WordSelectionScore[] {
  const candidates = mockWords.filter(
    (word) => word.language === input.language && word.level === input.level,
  );
  const fallback = mockWords.filter((word) => word.language === 'en');
  const requestedLimit = input.limit ?? 6;
  const pool = candidates.length >= requestedLimit ? candidates : fallback;

  return pool
    .map((word) => scoreWord(word, input.interests, input.userWordStates?.[word.id]))
    .sort((a, b) => b.score - a.score)
    .slice(0, requestedLimit);
}
