import {
  GeneratedLesson,
  LessonMode,
  QuizSummary,
  SelectedWord,
  SessionSize,
  WordSelfAssessmentStatus,
} from './lesson';

export type WorkoutModule =
  | 'context'
  | 'the_news'
  | 'use'
  | 'speak'
  | 'argue'
  | 'ask'
  | 'super_memo'
  | 'feel'
  | 'same_different'
  | 'best_sentence'
  | 'fast_flash';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  InterfaceLanguage: undefined;
  NativeLanguage: undefined;
  TargetLanguage: undefined;
  LevelSelection: undefined;
  InterestSelection: undefined;
  VocabularyGoalSelection: undefined;
  DailyWordGoal: undefined;
  ReminderPermission: undefined;
  WeeklySummary: undefined;
  FreeOrPremium: undefined;
  Home: undefined;
  SessionSize: undefined;
  VocabularySelection: {
    sessionSize: SessionSize;
  };
  WordPreview: {
    selectedWords?: SelectedWord[];
    sessionSize?: SessionSize;
    lesson?: GeneratedLesson;
    completedModules?: WorkoutModule[];
  };
  LessonModeSelection: {
    selectedWords: SelectedWord[];
    sessionSize: SessionSize;
  };
  AdGate: {
    selectedWords: SelectedWord[];
    mode: LessonMode;
    sessionSize: SessionSize;
    startModule?: WorkoutModule;
  };
  LessonGeneration: {
    selectedWords: SelectedWord[];
    mode: LessonMode;
    sessionSize: SessionSize;
    startModule?: WorkoutModule;
  };
  ReadingLesson: {
    lesson: GeneratedLesson;
    completedModules?: WorkoutModule[];
  };
  ContextQuiz: {
    lesson: GeneratedLesson;
    completedModules?: WorkoutModule[];
  };
  QuizResult: {
    lesson: GeneratedLesson;
    contextSummary: QuizSummary;
  };
  Definitions: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
  };
  DefinitionQuiz: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
  };
  GuidedUsage: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
    definitionSummary?: QuizSummary;
    completedModules?: WorkoutModule[];
  };
  Shadowing: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
    definitionSummary?: QuizSummary;
    completedModules?: WorkoutModule[];
  };
  PracticeMode: {
    lesson: GeneratedLesson;
    module: Extract<WorkoutModule, 'feel' | 'same_different' | 'best_sentence' | 'fast_flash'>;
    completedModules?: WorkoutModule[];
  };
  ModuleRunner: {
    lesson: GeneratedLesson;
    module: WorkoutModule;
    completedModules?: WorkoutModule[];
  };
  WorkoutFinish: {
    lesson: GeneratedLesson;
    completedModules?: WorkoutModule[];
  };
  WorkoutSelfAssessment: {
    lesson: GeneratedLesson;
    completedModules?: WorkoutModule[];
    assessments?: Record<string, WordSelfAssessmentStatus>;
  };
  SessionSummary: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
    definitionSummary?: QuizSummary;
  };
  StreakCelebration: undefined;
  Review: undefined;
  FocusSession: undefined;
  Progress: undefined;
  LearningGuide: undefined;
  Settings: undefined;
};
