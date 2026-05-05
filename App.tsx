import { StatusBar } from 'expo-status-bar';
import './src/i18n';
import { View, StyleSheet } from 'react-native';
import { LearningDock } from './src/components/LearningDock';
import { FloatingMenu } from './src/components/FloatingMenu';
import { LessonExitButton } from './src/components/LessonExitButton';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';

function AppShell() {
  const theme = useTheme();

  return (
    <View style={styles.app}>
      <AppNavigator />
      <LearningDock />
      <FloatingMenu />
      <LessonExitButton />
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
