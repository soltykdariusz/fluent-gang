import { GeneratedLesson, LessonMode, QuizSummary, SelectedWord, SessionSize } from './lesson';

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
    selectedWords: SelectedWord[];
    sessionSize: SessionSize;
  };
  LessonModeSelection: {
    selectedWords: SelectedWord[];
    sessionSize: SessionSize;
  };
  AdGate: {
    selectedWords: SelectedWord[];
    mode: LessonMode;
    sessionSize: SessionSize;
  };
  LessonGeneration: {
    selectedWords: SelectedWord[];
    mode: LessonMode;
    sessionSize: SessionSize;
  };
  ReadingLesson: {
    lesson: GeneratedLesson;
  };
  ContextQuiz: {
    lesson: GeneratedLesson;
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
  };
  Shadowing: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
    definitionSummary?: QuizSummary;
  };
  SessionSummary: {
    lesson: GeneratedLesson;
    contextSummary?: QuizSummary;
    definitionSummary?: QuizSummary;
  };
  Review: undefined;
  FocusSession: undefined;
  Progress: undefined;
  LearningGuide: undefined;
  Settings: undefined;
};
