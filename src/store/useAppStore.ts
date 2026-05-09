import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import i18n from '../i18n';
import { ThemePreference } from '../theme/theme';
import { InterfaceLanguageCode, LanguageCode, LevelCode } from '../types/language';
import { LessonResult, WordSelfAssessmentStatus } from '../types/lesson';
import { InterestCode, VocabularyGoal } from '../types/vocabulary';

type AppState = {
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  currentRouteName?: string;
  interfaceLanguage: InterfaceLanguageCode;
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  level: LevelCode;
  selectedInterests: InterestCode[];
  vocabularyGoal: VocabularyGoal;
  preferredSessionSize: number;
  remindersEnabled?: boolean;
  completedLessons: LessonResult[];
  wordAssessments: Record<string, WordSelfAssessmentStatus>;
  focusSecondsToday: number;
  focusTargetSeconds: number;
  focusRemainingSeconds: number;
  focusRunning: boolean;
  celebrationPulse: number;
  themePreference: ThemePreference;
  setAuthenticated: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  setCurrentRouteName: (routeName?: string) => void;
  setInterfaceLanguage: (language: InterfaceLanguageCode) => void;
  setNativeLanguage: (language: LanguageCode) => void;
  setTargetLanguage: (language: LanguageCode) => void;
  setLevel: (level: LevelCode) => void;
  toggleInterest: (interest: InterestCode) => void;
  setVocabularyGoal: (goal: VocabularyGoal) => void;
  setPreferredSessionSize: (size: number) => void;
  setRemindersEnabled: (enabled: boolean) => void;
  addLessonResult: (result: LessonResult) => void;
  setWordAssessments: (assessments: Record<string, WordSelfAssessmentStatus>) => void;
  addFocusSeconds: (seconds: number) => void;
  setFocusTargetMinutes: (minutes: number) => void;
  startFocusSession: () => void;
  pauseFocusSession: () => void;
  resetFocusSession: () => void;
  tickFocusSession: () => void;
  setThemePreference: (preference: ThemePreference) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isOnboardingComplete: false,
      currentRouteName: undefined,
      interfaceLanguage: 'en',
      nativeLanguage: 'pl',
      targetLanguage: 'en',
      level: 'A1',
      selectedInterests: ['technology', 'business', 'dailyLife'],
      vocabularyGoal: 'activateRecognizedWords',
      preferredSessionSize: 5,
      remindersEnabled: undefined,
      completedLessons: [],
      wordAssessments: {},
      focusSecondsToday: 0,
      focusTargetSeconds: 15 * 60,
      focusRemainingSeconds: 15 * 60,
      focusRunning: false,
      celebrationPulse: 0,
      themePreference: 'system',
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setOnboardingComplete: (value) => set({ isOnboardingComplete: value }),
      setCurrentRouteName: (routeName) => set({ currentRouteName: routeName }),
      setInterfaceLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ interfaceLanguage: language });
      },
      setNativeLanguage: (language) => set({ nativeLanguage: language }),
      setTargetLanguage: (language) => set({ targetLanguage: language }),
      setLevel: (level) => set({ level }),
      toggleInterest: (interest) =>
        set((state) => ({
          selectedInterests: state.selectedInterests.includes(interest)
            ? state.selectedInterests.filter((item) => item !== interest)
            : [...state.selectedInterests, interest],
        })),
      setVocabularyGoal: (goal) => set({ vocabularyGoal: goal }),
      setPreferredSessionSize: (size) => set({ preferredSessionSize: size }),
      setRemindersEnabled: (enabled) => set({ remindersEnabled: enabled }),
      addLessonResult: (result) =>
        set((state) => ({
          completedLessons: [result, ...state.completedLessons],
        })),
      setWordAssessments: (assessments) =>
        set((state) => ({
          wordAssessments: {
            ...state.wordAssessments,
            ...assessments,
          },
        })),
      addFocusSeconds: (seconds) =>
        set((state) => ({
          focusSecondsToday: state.focusSecondsToday + seconds,
        })),
      setFocusTargetMinutes: (minutes) =>
        set({
          focusTargetSeconds: minutes * 60,
          focusRemainingSeconds: minutes * 60,
          focusRunning: false,
        }),
      startFocusSession: () =>
        set((state) => ({
          focusRunning: state.focusRemainingSeconds > 0,
        })),
      pauseFocusSession: () => set({ focusRunning: false }),
      resetFocusSession: () =>
        set((state) => ({
          focusRemainingSeconds: state.focusTargetSeconds,
          focusRunning: false,
        })),
      tickFocusSession: () =>
        set((state) => {
          if (!state.focusRunning || state.focusRemainingSeconds <= 0) {
            return state;
          }

          const nextRemaining = state.focusRemainingSeconds - 1;
          const elapsedBefore = state.focusTargetSeconds - state.focusRemainingSeconds;
          const elapsedAfter = state.focusTargetSeconds - nextRemaining;
          const crossedFiveMinuteMark =
            elapsedAfter > 0 &&
            elapsedAfter % (5 * 60) === 0 &&
            elapsedAfter !== elapsedBefore;

          return {
            focusRemainingSeconds: nextRemaining,
            focusRunning: nextRemaining > 0,
            focusSecondsToday: state.focusSecondsToday + 1,
            celebrationPulse: crossedFiveMinuteMark
              ? state.celebrationPulse + 1
              : state.celebrationPulse,
          };
        }),
      setThemePreference: (preference) => set({ themePreference: preference }),
    }),
    {
      name: 'fluent-gang-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isOnboardingComplete: state.isOnboardingComplete,
        interfaceLanguage: state.interfaceLanguage,
        nativeLanguage: state.nativeLanguage,
        targetLanguage: state.targetLanguage,
        level: state.level,
        selectedInterests: state.selectedInterests,
        vocabularyGoal: state.vocabularyGoal,
        preferredSessionSize: state.preferredSessionSize,
        remindersEnabled: state.remindersEnabled,
        completedLessons: state.completedLessons,
        wordAssessments: state.wordAssessments,
        focusSecondsToday: state.focusSecondsToday,
        focusTargetSeconds: state.focusTargetSeconds,
        focusRemainingSeconds: state.focusRemainingSeconds,
        focusRunning: state.focusRunning,
        themePreference: state.themePreference,
      }),
    },
  ),
);
