import { RootStackParamList } from '../types/navigation';

export const onboardingRoutes: Array<keyof RootStackParamList> = [
  'Splash',
  'Auth',
  'Welcome',
  'Onboarding',
  'InterfaceLanguage',
  'NativeLanguage',
  'TargetLanguage',
  'LevelSelection',
  'InterestSelection',
  'VocabularyGoalSelection',
  'DailyWordGoal',
  'ReminderPermission',
  'WeeklySummary',
  'FreeOrPremium',
];

export const lessonRoutes: Array<keyof RootStackParamList> = [
  'SessionSize',
  'VocabularySelection',
  'WordPreview',
  'LessonModeSelection',
  'AdGate',
  'LessonGeneration',
  'ReadingLesson',
  'ContextQuiz',
  'QuizResult',
  'Definitions',
  'DefinitionQuiz',
  'GuidedUsage',
  'Shadowing',
  'PracticeMode',
  'WorkoutFinish',
  'WorkoutSelfAssessment',
  'SessionSummary',
];
