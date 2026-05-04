import { LessonResult } from '../types/lesson';

export async function saveLessonResult(result: LessonResult): Promise<void> {
  // TODO: Persist to Supabase tables: lessons, user_word_progress, review_schedule.
  console.log('Mock lesson result saved', result);
}
