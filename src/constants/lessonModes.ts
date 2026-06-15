import { LessonMode } from '../types/lesson';

export const lessonModes: Array<{
  mode: LessonMode;
  title: string;
  description: string;
}> = [
  { mode: 'standardContext', title: 'Standard Context', description: 'A clear short vocabulary scene using all selected words naturally.' },
  { mode: 'funnyStory', title: 'Funny Story', description: 'A light, entertaining story that makes the words easier to remember.' },
  { mode: 'dialogue', title: 'Dialogue', description: 'A short natural conversation using all selected words.' },
  {
    mode: 'superMemory',
    title: 'Super Memory',
    description: 'A vivid, funny story using strong associations and memory hooks.',
  },
];
