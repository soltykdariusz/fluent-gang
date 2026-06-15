import { StatusBar } from 'expo-status-bar';
import './src/i18n';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LearningDock } from './src/components/LearningDock';
import { FloatingMenu } from './src/components/FloatingMenu';
import { LessonExitButton } from './src/components/LessonExitButton';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppStore } from './src/store/useAppStore';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';

function AppShell() {
  const theme = useTheme();
  const [moreOpen, setMoreOpen] = useState(false);
  const focusRunning = useAppStore((state) => state.focusRunning);
  const tickFocusSession = useAppStore((state) => state.tickFocusSession);

  useEffect(() => {
    if (!focusRunning) {
      return undefined;
    }

    const interval = setInterval(tickFocusSession, 1000);
    return () => clearInterval(interval);
  }, [focusRunning, tickFocusSession]);

  return (
    <View style={styles.app}>
      <AppNavigator />
      <LearningDock
        moreOpen={moreOpen}
        onToggleMore={() => setMoreOpen((value) => !value)}
        onCloseMore={() => setMoreOpen(false)}
      />
      <FloatingMenu open={moreOpen} onClose={() => setMoreOpen(false)} />
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
