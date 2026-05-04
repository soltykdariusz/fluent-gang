import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import i18n from '../i18n';
import { ThemePreference } from '../theme/theme';
import { InterfaceLanguageCode, LanguageCode, LevelCode } from '../types/language';
import { LessonResult } from '../types/lesson';

type AppState = {
  interfaceLanguage: InterfaceLanguageCode;
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  level: LevelCode;
  completedLessons: LessonResult[];
  focusSecondsToday: number;
  focusTargetSeconds: number;
  focusRemainingSeconds: number;
  focusRunning: boolean;
  celebrationPulse: number;
  themePreference: ThemePreference;
  setInterfaceLanguage: (language: InterfaceLanguageCode) => void;
  setNativeLanguage: (language: LanguageCode) => void;
  setTargetLanguage: (language: LanguageCode) => void;
  setLevel: (level: LevelCode) => void;
  addLessonResult: (result: LessonResult) => void;
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
      interfaceLanguage: 'en',
      nativeLanguage: 'pl',
      targetLanguage: 'en',
      level: 'A1',
      completedLessons: [],
      focusSecondsToday: 0,
      focusTargetSeconds: 25 * 60,
      focusRemainingSeconds: 25 * 60,
      focusRunning: false,
      celebrationPulse: 0,
      themePreference: 'system',
      setInterfaceLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ interfaceLanguage: language });
      },
      setNativeLanguage: (language) => set({ nativeLanguage: language }),
      setTargetLanguage: (language) => set({ targetLanguage: language }),
      setLevel: (level) => set({ level }),
      addLessonResult: (result) =>
        set((state) => ({
          completedLessons: [result, ...state.completedLessons],
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
        interfaceLanguage: state.interfaceLanguage,
        nativeLanguage: state.nativeLanguage,
        targetLanguage: state.targetLanguage,
        level: state.level,
        completedLessons: state.completedLessons,
        focusSecondsToday: state.focusSecondsToday,
        focusTargetSeconds: state.focusTargetSeconds,
        focusRemainingSeconds: state.focusRemainingSeconds,
        focusRunning: state.focusRunning,
        themePreference: state.themePreference,
      }),
    },
  ),
);
