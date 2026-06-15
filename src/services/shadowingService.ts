import type { GeneratedLesson } from '../types/lesson';

export type ShadowingPracticeItem = {
  wordId: string;
  targetWord: string;
  sentences: string[];
  audioUrl?: string;
};

export function getShadowingPracticeItems(lesson: GeneratedLesson): ShadowingPracticeItem[] {
  if (lesson.shadowingSets.length > 0) {
    return lesson.shadowingSets.map((set) => ({
      wordId: set.wordId,
      targetWord: set.targetWord,
      sentences: getFiveSentences(set.sentences, set.targetWord),
      audioUrl: set.audioUrl,
    }));
  }

  return lesson.words.map((word) => ({
    wordId: word.id,
    targetWord: word.text,
    sentences: getFiveSentences([word.example], word.text),
    audioUrl: lesson.audioUrl,
  }));
}

function getFiveSentences(sentences: Array<string | undefined>, targetWord: string) {
  const cleanSentences = sentences.filter((sentence): sentence is string => Boolean(sentence?.trim()));
  const fallbackSentences = [
    `Say ${targetWord} today.`,
    `Use ${targetWord} once.`,
    `${targetWord} feels easier now.`,
    `I can say ${targetWord}.`,
    `${targetWord} is my word now.`,
  ];

  return [...cleanSentences, ...fallbackSentences].slice(0, 5);
}
