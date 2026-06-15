import { VocabularyGoal } from '../types/vocabulary';

export const vocabularyGoals: Array<{
  code: VocabularyGoal;
  label: string;
  description: string;
}> = [
  {
    code: 'understandReading',
    label: 'Understand more when reading',
    description: 'Grow vocabulary for articles, books, posts, and messages.',
  },
  {
    code: 'speakNaturally',
    label: 'Speak more naturally',
    description: 'Move words from recognition into active speech.',
  },
  {
    code: 'understandListening',
    label: 'Understand podcasts and videos',
    description: 'Strengthen listening recognition and shadowing.',
  },
  {
    code: 'businessVocabulary',
    label: 'Grow business vocabulary',
    description: 'Use words in work, clients, meetings, and delivery contexts.',
  },
  {
    code: 'activateRecognizedWords',
    label: 'Activate words I recognize',
    description: 'Turn familiar passive words into usable vocabulary.',
  },
  {
    code: 'dailyUsefulWords',
    label: 'Learn useful daily words',
    description: 'Build practical words for everyday life.',
  },
];
