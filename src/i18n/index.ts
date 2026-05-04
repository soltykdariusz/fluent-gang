import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      appName: 'Fluent Gang',
      slogan: 'You can be fluent.',
      start: 'Start learning',
      continue: 'Continue',
      welcomeBody: 'Build vocabulary through context, memory, listening, quizzes, and review.',
      onboardingTitle: 'Set your learning path',
      interfaceLanguage: 'Interface language',
      nativeLanguage: 'Native language',
      targetLanguage: 'Learning language',
      level: 'Level',
      homeTitle: 'Today in Fluent Gang',
      chooseWords: 'Choose 5 words',
      lessonMode: 'Lesson mode',
      generateLesson: 'Generate lesson',
      reading: 'Reading',
      contextQuiz: 'Context quiz',
      definitions: 'Definitions',
      definitionQuiz: 'Definition quiz',
      shadowing: 'Shadowing',
      progress: 'Progress',
      focus: 'Focus',
      review: 'Review',
      settings: 'Settings',
      saveProgress: 'Save progress',
      true: 'True',
      false: 'False',
      next: 'Next',
    },
  },
  pl: {
    translation: {
      appName: 'Fluent Gang',
      slogan: 'You can be fluent.',
      start: 'Zacznij naukę',
      continue: 'Dalej',
      welcomeBody: 'Buduj słownictwo przez kontekst, pamięć, słuchanie, quizy i powtórki.',
      onboardingTitle: 'Ustaw swoją ścieżkę nauki',
      interfaceLanguage: 'Język interfejsu',
      nativeLanguage: 'Język ojczysty',
      targetLanguage: 'Język nauki',
      level: 'Poziom',
      homeTitle: 'Dzisiaj we Fluent Gang',
      chooseWords: 'Wybierz 5 słów',
      lessonMode: 'Tryb lekcji',
      generateLesson: 'Wygeneruj lekcję',
      reading: 'Czytanie',
      contextQuiz: 'Quiz kontekstowy',
      definitions: 'Definicje',
      definitionQuiz: 'Quiz definicji',
      shadowing: 'Shadowing',
      progress: 'Postęp',
      focus: 'Skupienie',
      review: 'Powtórki',
      settings: 'Ustawienia',
      saveProgress: 'Zapisz postęp',
      true: 'Prawda',
      false: 'Fałsz',
      next: 'Dalej',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  lng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
