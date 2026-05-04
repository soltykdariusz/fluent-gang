import { mockWords } from '../data/mockWords';
import { LanguageCode, LevelCode } from '../types/language';
import { Word } from '../types/lesson';

export function getProposedWords(language: LanguageCode, level: LevelCode): Word[] {
  const exactMatches = mockWords.filter((word) => word.language === language && word.level === level);
  const fallback = mockWords.filter((word) => word.language === 'en');
  return (exactMatches.length >= 5 ? exactMatches : fallback).slice(0, 5);
}

export function createCustomWord(text: string, language: LanguageCode, level: LevelCode): Word {
  return {
    id: `custom-${Date.now()}`,
    text: text.trim(),
    language,
    level,
  };
}
