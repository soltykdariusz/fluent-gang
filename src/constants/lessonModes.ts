import { LessonMode } from '../types/lesson';

export const lessonModes: Array<{
  mode: LessonMode;
  title: string;
  description: string;
}> = [
  { mode: 'news', title: 'News', description: 'A short article-style text with clear context.' },
  { mode: 'sport', title: 'Sport', description: 'Vocabulary in a dynamic sports story.' },
  { mode: 'lifestyle', title: 'Lifestyle', description: 'General daily-life context and practical examples.' },
  {
    mode: 'superMemory',
    title: 'Super Memory',
    description: 'A vivid, funny story using strong associations and memory hooks.',
  },
];
