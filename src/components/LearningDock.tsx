import { BarChart3, Dumbbell, Home, RotateCcw, Settings } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { navigateHome, navigateProgress, navigateReview, navigateSettings, navigateWorkout } from '../navigation/rootNavigation';
import { lessonRoutes, onboardingRoutes } from '../navigation/routeGroups';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

const tabs: Array<{
  route: keyof RootStackParamList;
  label: string;
  onPress: () => void;
  icon: typeof Home;
}> = [
  { route: 'Home', label: 'Home', onPress: navigateHome, icon: Home },
  { route: 'VocabularySelection', label: 'Workout', onPress: navigateWorkout, icon: Dumbbell },
  { route: 'Review', label: 'Review', onPress: navigateReview, icon: RotateCcw },
  { route: 'Progress', label: 'Progress', onPress: navigateProgress, icon: BarChart3 },
  { route: 'Settings', label: 'Settings', onPress: navigateSettings, icon: Settings },
];

export function LearningDock() {
  const appTheme = useTheme();
  const currentRouteName = useAppStore((state) => state.currentRouteName) as keyof RootStackParamList | undefined;

  if (!currentRouteName || onboardingRoutes.includes(currentRouteName) || lessonRoutes.includes(currentRouteName)) {
    return null;
  }

  return (
    <View style={[styles.wrap, { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface }]}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.route === currentRouteName || (tab.route === 'VocabularySelection' && currentRouteName === 'LearningGuide');
        return (
          <Pressable key={tab.label} accessibilityRole="button" onPress={tab.onPress} style={styles.tab}>
            <Icon size={21} color={active ? appTheme.colors.primary : appTheme.colors.muted} strokeWidth={2.2} />
            <Text style={[styles.label, { color: active ? appTheme.colors.primary : appTheme.colors.muted }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 78,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
  },
});
