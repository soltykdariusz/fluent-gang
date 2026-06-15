import { ReviewContextType } from '../types/vocabulary';

const reviewSequence: ReviewContextType[] = [
  'story',
  'microContext',
  'listening',
  'personal',
  'contrast',
  'production',
];

export function getNextReviewContext(exposures: number): ReviewContextType {
  return reviewSequence[exposures % reviewSequence.length];
}

export function getReviewContextDescription(type: ReviewContextType): string {
  switch (type) {
    case 'story':
      return 'A short story using the word in a memorable scene.';
    case 'microContext':
      return 'One or two quick sentences with clear context.';
    case 'listening':
      return 'A narrator-friendly context for recognition by ear.';
    case 'personal':
      return 'A context connected to the user’s likely life or interests.';
    case 'contrast':
      return 'A contrast with a similar, opposite, or commonly confused word.';
    case 'production':
      return 'A prompt that asks the user to produce language with the word.';
  }
}
