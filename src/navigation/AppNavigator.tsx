import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './rootNavigation';
import { useTheme } from '../theme/ThemeProvider';
import { RootStackParamList } from '../types/navigation';
import { AdGateScreen } from '../screens/AdGateScreen';
import { ContextQuizScreen } from '../screens/ContextQuizScreen';
import { DefinitionQuizScreen } from '../screens/DefinitionQuizScreen';
import { DefinitionsScreen } from '../screens/DefinitionsScreen';
import { FocusSessionScreen } from '../screens/FocusSessionScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InterfaceLanguageScreen } from '../screens/InterfaceLanguageScreen';
import { LearningGuideScreen } from '../screens/LearningGuideScreen';
import { LessonGenerationScreen } from '../screens/LessonGenerationScreen';
import { LessonModeSelectionScreen } from '../screens/LessonModeSelectionScreen';
import { LevelSelectionScreen } from '../screens/LevelSelectionScreen';
import { NativeLanguageScreen } from '../screens/NativeLanguageScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { ReadingLessonScreen } from '../screens/ReadingLessonScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ShadowingScreen } from '../screens/ShadowingScreen';
import { TargetLanguageScreen } from '../screens/TargetLanguageScreen';
import { VocabularySelectionScreen } from '../screens/VocabularySelectionScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="InterfaceLanguage" component={InterfaceLanguageScreen} />
        <Stack.Screen name="NativeLanguage" component={NativeLanguageScreen} />
        <Stack.Screen name="TargetLanguage" component={TargetLanguageScreen} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VocabularySelection" component={VocabularySelectionScreen} />
        <Stack.Screen name="LessonModeSelection" component={LessonModeSelectionScreen} />
        <Stack.Screen name="AdGate" component={AdGateScreen} />
        <Stack.Screen name="LessonGeneration" component={LessonGenerationScreen} />
        <Stack.Screen name="ReadingLesson" component={ReadingLessonScreen} />
        <Stack.Screen name="ContextQuiz" component={ContextQuizScreen} />
        <Stack.Screen name="Definitions" component={DefinitionsScreen} />
        <Stack.Screen name="DefinitionQuiz" component={DefinitionQuizScreen} />
        <Stack.Screen name="Shadowing" component={ShadowingScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="FocusSession" component={FocusSessionScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="LearningGuide" component={LearningGuideScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
