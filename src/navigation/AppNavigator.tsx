import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './rootNavigation';
import { useTheme } from '../theme/ThemeProvider';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';
import { AdGateScreen } from '../screens/AdGateScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { ContextQuizScreen } from '../screens/ContextQuizScreen';
import { DefinitionQuizScreen } from '../screens/DefinitionQuizScreen';
import { DefinitionsScreen } from '../screens/DefinitionsScreen';
import { FocusSessionScreen } from '../screens/FocusSessionScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { GuidedUsageScreen } from '../screens/GuidedUsageScreen';
import { InterfaceLanguageScreen } from '../screens/InterfaceLanguageScreen';
import { InterestSelectionScreen } from '../screens/InterestSelectionScreen';
import { LearningGuideScreen } from '../screens/LearningGuideScreen';
import { LessonGenerationScreen } from '../screens/LessonGenerationScreen';
import { LessonModeSelectionScreen } from '../screens/LessonModeSelectionScreen';
import { LevelSelectionScreen } from '../screens/LevelSelectionScreen';
import { NativeLanguageScreen } from '../screens/NativeLanguageScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { PracticeModeScreen } from '../screens/PracticeModeScreen';
import { ReadingLessonScreen } from '../screens/ReadingLessonScreen';
import { QuizResultScreen } from '../screens/QuizResultScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SessionSizeScreen } from '../screens/SessionSizeScreen';
import { SessionSummaryScreen } from '../screens/SessionSummaryScreen';
import { ShadowingScreen } from '../screens/ShadowingScreen';
import { StreakCelebrationScreen } from '../screens/StreakCelebrationScreen';
import { TargetLanguageScreen } from '../screens/TargetLanguageScreen';
import { VocabularySelectionScreen } from '../screens/VocabularySelectionScreen';
import { VocabularyGoalSelectionScreen } from '../screens/VocabularyGoalSelectionScreen';
import { DailyWordGoalScreen } from '../screens/DailyWordGoalScreen';
import { FreeOrPremiumScreen } from '../screens/FreeOrPremiumScreen';
import { ReminderPermissionScreen } from '../screens/ReminderPermissionScreen';
import { WeeklySummaryScreen } from '../screens/WeeklySummaryScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { WordPreviewScreen } from '../screens/WordPreviewScreen';
import { WorkoutFinishScreen } from '../screens/WorkoutFinishScreen';
import { WorkoutSelfAssessmentScreen } from '../screens/WorkoutSelfAssessmentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const theme = useTheme();
  const setCurrentRouteName = useAppStore((state) => state.setCurrentRouteName);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setCurrentRouteName(navigationRef.getCurrentRoute()?.name)}
      onStateChange={() => setCurrentRouteName(navigationRef.getCurrentRoute()?.name)}
    >
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="InterfaceLanguage" component={InterfaceLanguageScreen} />
        <Stack.Screen name="NativeLanguage" component={NativeLanguageScreen} />
        <Stack.Screen name="TargetLanguage" component={TargetLanguageScreen} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
        <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} />
        <Stack.Screen name="VocabularyGoalSelection" component={VocabularyGoalSelectionScreen} />
        <Stack.Screen name="DailyWordGoal" component={DailyWordGoalScreen} />
        <Stack.Screen name="ReminderPermission" component={ReminderPermissionScreen} />
        <Stack.Screen name="WeeklySummary" component={WeeklySummaryScreen} />
        <Stack.Screen name="FreeOrPremium" component={FreeOrPremiumScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SessionSize" component={SessionSizeScreen} />
        <Stack.Screen name="VocabularySelection" component={VocabularySelectionScreen} />
        <Stack.Screen name="WordPreview" component={WordPreviewScreen} />
        <Stack.Screen name="LessonModeSelection" component={LessonModeSelectionScreen} />
        <Stack.Screen name="AdGate" component={AdGateScreen} />
        <Stack.Screen name="LessonGeneration" component={LessonGenerationScreen} />
        <Stack.Screen name="ReadingLesson" component={ReadingLessonScreen} />
        <Stack.Screen name="ContextQuiz" component={ContextQuizScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        <Stack.Screen name="Definitions" component={DefinitionsScreen} />
        <Stack.Screen name="DefinitionQuiz" component={DefinitionQuizScreen} />
        <Stack.Screen name="GuidedUsage" component={GuidedUsageScreen} />
        <Stack.Screen name="Shadowing" component={ShadowingScreen} />
        <Stack.Screen name="PracticeMode" component={PracticeModeScreen} />
        <Stack.Screen name="WorkoutFinish" component={WorkoutFinishScreen} />
        <Stack.Screen name="WorkoutSelfAssessment" component={WorkoutSelfAssessmentScreen} />
        <Stack.Screen name="SessionSummary" component={SessionSummaryScreen} />
        <Stack.Screen name="StreakCelebration" component={StreakCelebrationScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="FocusSession" component={FocusSessionScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="LearningGuide" component={LearningGuideScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
