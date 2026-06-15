import { Dumbbell, Ellipsis, Home, Pause, Play, RotateCcw } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { navigateHome, navigateReview, navigateWorkout } from '../navigation/rootNavigation';
import { lessonRoutes, onboardingRoutes } from '../navigation/routeGroups';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

const tabs: Array<{
  route: keyof RootStackParamList;
  label: string;
  icon: typeof Home;
}> = [
  { route: 'Home', label: 'Home', icon: Home },
  { route: 'VocabularySelection', label: 'Workout', icon: Dumbbell },
  { route: 'Review', label: 'Review', icon: RotateCcw },
  { route: 'FocusSession', label: '25:00', icon: Play },
  { route: 'Settings', label: 'More', icon: Ellipsis },
];

type LearningDockProps = {
  moreOpen: boolean;
  onToggleMore: () => void;
  onCloseMore: () => void;
};

export function LearningDock({ moreOpen, onToggleMore, onCloseMore }: LearningDockProps) {
  const appTheme = useTheme();
  const currentRouteName = useAppStore((state) => state.currentRouteName) as keyof RootStackParamList | undefined;
  const focusRemainingSeconds = useAppStore((state) => state.focusRemainingSeconds);
  const focusTargetSeconds = useAppStore((state) => state.focusTargetSeconds);
  const focusRunning = useAppStore((state) => state.focusRunning);
  const startFocusSession = useAppStore((state) => state.startFocusSession);
  const pauseFocusSession = useAppStore((state) => state.pauseFocusSession);
  const resetFocusSession = useAppStore((state) => state.resetFocusSession);

  if (!currentRouteName || onboardingRoutes.includes(currentRouteName) || lessonRoutes.includes(currentRouteName)) {
    return null;
  }

  return (
    <View style={[styles.wrap, { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface }]}>
      {tabs.map((tab) => {
        const isTimer = tab.route === 'FocusSession';
        const Icon = isTimer ? (focusRunning ? Pause : Play) : tab.icon;
        const active =
          tab.route === 'Settings'
            ? moreOpen || currentRouteName === 'Settings'
            : isTimer
              ? focusRunning || currentRouteName === 'FocusSession'
              : tab.route === currentRouteName || (tab.route === 'VocabularySelection' && currentRouteName === 'LearningGuide');
        const label = isTimer ? formatFocusTime(focusRemainingSeconds) : tab.label;
        const handlePress = () => {
          if (tab.route === 'Settings') {
            onToggleMore();
            return;
          }
          if (isTimer) {
            onCloseMore();
            if (focusRunning) {
              pauseFocusSession();
              return;
            }
            if (focusRemainingSeconds <= 0) {
              resetFocusSession();
              return;
            }
            startFocusSession();
            return;
          }
          onCloseMore();
          if (tab.route === 'Home') navigateHome();
          if (tab.route === 'VocabularySelection') navigateWorkout();
          if (tab.route === 'Review') navigateReview();
        };
        return (
          <Pressable key={tab.label} accessibilityRole="button" onPress={handlePress} style={styles.tab}>
            {isTimer ? (
              <View style={styles.timerIcon}>
                <Svg width={34} height={34} viewBox="0 0 34 34" style={styles.timerRing}>
                  <Circle cx="17" cy="17" r="14" stroke={appTheme.colors.border} strokeWidth="3" fill="none" />
                  <Circle
                    cx="17"
                    cy="17"
                    r="14"
                    stroke={active ? appTheme.colors.primary : appTheme.colors.muted}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - getTimerProgress(focusRemainingSeconds, focusTargetSeconds))}`}
                    rotation="-90"
                    origin="17, 17"
                  />
                </Svg>
                <Icon size={15} color={active ? appTheme.colors.primary : appTheme.colors.muted} strokeWidth={2.4} />
              </View>
            ) : (
              <Icon size={21} color={active ? appTheme.colors.primary : appTheme.colors.muted} strokeWidth={2.2} />
            )}
            <Text style={[styles.label, { color: active ? appTheme.colors.primary : appTheme.colors.muted }]}>
              {label}
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
  timerIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerRing: {
    position: 'absolute',
  },
});

function formatFocusTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function getTimerProgress(remainingSeconds: number, targetSeconds: number) {
  if (targetSeconds <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(1, remainingSeconds / targetSeconds));
}
