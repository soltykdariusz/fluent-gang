import { X } from 'lucide-react-native';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { navigateHome } from '../navigation/rootNavigation';
import { lessonRoutes } from '../navigation/routeGroups';
import { stopSentenceAudio } from '../services/soundService';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

export function LessonExitButton() {
  const appTheme = useTheme();
  const currentRouteName = useAppStore((state) => state.currentRouteName) as keyof RootStackParamList | undefined;

  if (
    !currentRouteName ||
    !lessonRoutes.includes(currentRouteName) ||
    currentRouteName === 'SessionSummary' ||
    currentRouteName === 'ModuleRunner'
  ) {
    return null;
  }

  const exitToHome = () => {
    stopSentenceAudio();
    navigateHome();
  };

  const confirmExit = () => {
    Alert.alert('Exit workout?', 'What should we do with this active session?', [
      { text: 'Continue workout', style: 'cancel' },
      { text: 'Save progress and exit', onPress: exitToHome },
      { text: 'Discard session', style: 'destructive', onPress: exitToHome },
    ]);
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={confirmExit}
      style={[styles.button, { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface }]}
    >
      <X size={22} color={appTheme.colors.primary} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 58,
    right: theme.spacing.md,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
