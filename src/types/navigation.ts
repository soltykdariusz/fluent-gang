import { GeneratedLesson, LessonMode, Word } from './lesson';

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  InterfaceLanguage: undefined;
  NativeLanguage: undefined;
  TargetLanguage: undefined;
  LevelSelection: undefined;
  Home: undefined;
  VocabularySelection: undefined;
  LessonModeSelection: {
    selectedWords: Word[];
  };
  AdGate: {
    selectedWords: Word[];
    mode: LessonMode;
  };
  LessonGeneration: {
    selectedWords: Word[];
    mode: LessonMode;
  };
  ReadingLesson: {
    lesson: GeneratedLesson;
  };
  ContextQuiz: {
    lesson: GeneratedLesson;
  };
  Definitions: {
    lesson: GeneratedLesson;
  };
  DefinitionQuiz: {
    lesson: GeneratedLesson;
  };
  Shadowing: {
    lesson: GeneratedLesson;
  };
  Review: undefined;
  FocusSession: undefined;
  Progress: undefined;
  LearningGuide: undefined;
  Settings: undefined;
};
