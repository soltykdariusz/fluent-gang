import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      appName: 'Fluent Gang',
      slogan: 'You can be fluent.',
      start: 'Start building my vocabulary',
      continue: 'Continue',
      welcomeBody: 'Grow active vocabulary through context, memory, and daily word workouts.',
      onboardingTitle: 'Set your learning path',
      interfaceLanguage: 'Interface language',
      nativeLanguage: 'Native language',
      targetLanguage: 'Learning language',
      level: 'Level',
      homeTitle: 'Today’s Vocabulary Workout',
      chooseWords: 'Start today’s workout',
      lessonMode: 'Context mode',
      generateLesson: 'Generate context',
      reading: 'Context Exposure',
      contextQuiz: 'Context Check',
      definitions: 'Definitions',
      definitionQuiz: 'Meaning Check',
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
      start: 'Buduj słownictwo',
      continue: 'Dalej',
      welcomeBody: 'Rozwijaj aktywne słownictwo przez kontekst, pamięć i codzienne treningi słów.',
      onboardingTitle: 'Ustaw swoją ścieżkę nauki',
      interfaceLanguage: 'Język interfejsu',
      nativeLanguage: 'Język ojczysty',
      targetLanguage: 'Język nauki',
      level: 'Poziom',
      homeTitle: 'Dzisiejszy trening słownictwa',
      chooseWords: 'Zacznij trening',
      lessonMode: 'Tryb kontekstu',
      generateLesson: 'Wygeneruj kontekst',
      reading: 'Ekspozycja kontekstowa',
      contextQuiz: 'Sprawdzenie kontekstu',
      definitions: 'Definicje',
      definitionQuiz: 'Sprawdzenie znaczenia',
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
