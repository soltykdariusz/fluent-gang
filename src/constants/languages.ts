import { Language, Level } from '../types/language';

export const supportedLanguages: Language[] = [
  { code: 'en', englishName: 'English', nativeName: 'English', isInitialTarget: true },
  { code: 'es', englishName: 'Spanish', nativeName: 'Español', isInitialTarget: true },
  { code: 'fr', englishName: 'French', nativeName: 'Français', isInitialTarget: true },
  { code: 'de', englishName: 'German', nativeName: 'Deutsch', isInitialTarget: true },
  { code: 'it', englishName: 'Italian', nativeName: 'Italiano', isInitialTarget: true },
  { code: 'pt', englishName: 'Portuguese', nativeName: 'Português', isInitialTarget: true },
  { code: 'pl', englishName: 'Polish', nativeName: 'Polski', isInitialTarget: true },
  { code: 'ja', englishName: 'Japanese', nativeName: '日本語', isInitialTarget: true },
  { code: 'ko', englishName: 'Korean', nativeName: '한국어', isInitialTarget: true },
  { code: 'zh', englishName: 'Chinese', nativeName: '中文', isInitialTarget: true },
];

export const levels: Level[] = [
  { code: 'A1', label: 'A1 Beginner', description: 'Simple daily words and short phrases.' },
  { code: 'A2', label: 'A2 Elementary', description: 'Common situations, routines, and basic opinions.' },
  { code: 'B1', label: 'B1 Intermediate', description: 'Everyday topics, stories, and practical vocabulary.' },
  { code: 'B2', label: 'B2 Upper intermediate', description: 'More precise vocabulary and longer context.' },
  { code: 'C1', label: 'C1 Advanced', description: 'Nuance, idioms, and complex topics.' },
  { code: 'C2', label: 'C2 Mastery', description: 'Native-like expression and subtle meaning.' },
];
