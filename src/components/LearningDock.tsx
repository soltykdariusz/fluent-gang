import { useEffect, useMemo, useRef } from 'react';
import { Home, Pause, Play } from 'lucide-react-native';
import { Animated, DimensionValue, Pressable, StyleSheet, Text, View } from 'react-native';
import { levelWordTargets, nextLevelByLevel } from '../constants/progress';
import { navigateHome, navigateLearningGuide } from '../navigation/rootNavigation';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { useTheme } from '../theme/ThemeProvider';

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
}

export function LearningDock() {
  const appTheme = useTheme();
  const {
    level,
    completedLessons,
    focusTargetSeconds,
    focusRemainingSeconds,
    focusRunning,
    celebrationPulse,
    tickFocusSession,
    startFocusSession,
    pauseFocusSession,
  } = useAppStore();
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!focusRunning) return undefined;
    const interval = setInterval(tickFocusSession, 1000);
    return () => clearInterval(interval);
  }, [focusRunning, tickFocusSession]);

  useEffect(() => {
    if (celebrationPulse === 0) return;
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.18, duration: 220, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 180, useNativeDriver: false }),
        Animated.timing(glow, { toValue: 0, duration: 900, useNativeDriver: false }),
      ]),
    ]).start();
  }, [celebrationPulse, glow, scale]);

  const learnedWordCount = useMemo(() => {
    return new Set(completedLessons.flatMap((lesson) => lesson.practicedWordIds)).size;
  }, [completedLessons]);

  const target = levelWordTargets[level];
  const nextLevel = nextLevelByLevel[level];
  const progress = Math.min(1, learnedWordCount / target);
  const progressPercent = Math.round(progress * 100);
  const elapsedSeconds = focusTargetSeconds - focusRemainingSeconds;
  const elapsedPercent = Math.min(1, elapsedSeconds / focusTargetSeconds);
  const ringFillHeight: DimensionValue = `${Math.max(8, progress * 100)}%`;
  const glowColor = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [appTheme.colors.surface, appTheme.mode === 'dark' ? '#26361F' : '#FFF1C7'],
  });

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.dock,
          {
            backgroundColor: glowColor,
            borderColor: appTheme.colors.border,
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          onPress={navigateHome}
          style={({ pressed }) => [
            styles.homeButton,
            {
              borderColor: appTheme.colors.border,
              backgroundColor: appTheme.colors.surface,
            },
            pressed && styles.pressed,
          ]}
        >
          <Home size={21} color={appTheme.colors.primary} strokeWidth={2.2} />
        </Pressable>

        <View style={styles.timerArea}>
          <Pressable
            accessibilityRole="button"
            onPress={focusRunning ? pauseFocusSession : startFocusSession}
            style={styles.timerControl}
          >
            <View style={styles.timerLine}>
              {focusRunning ? (
                <Pause size={14} color={appTheme.colors.muted} strokeWidth={2.2} />
              ) : (
                <Play size={14} color={appTheme.colors.muted} strokeWidth={2.2} />
              )}
              <Text style={[styles.timer, { color: appTheme.colors.muted }]}>{formatSeconds(focusRemainingSeconds)}</Text>
            </View>
            <View style={[styles.timeTrack, { backgroundColor: appTheme.colors.primarySoft }]}>
              <View style={[styles.timeFill, { backgroundColor: appTheme.colors.primary, width: `${elapsedPercent * 100}%` }]} />
            </View>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={navigateLearningGuide}
            style={styles.brandLine}
          >
            <View style={[styles.logoMark, { backgroundColor: appTheme.colors.primary }]}>
              <Text style={[styles.logoText, { color: appTheme.colors.surface }]}>FG</Text>
            </View>
            <Text style={[styles.brandText, { color: appTheme.colors.muted }]}>You will be fluent</Text>
          </Pressable>
        </View>

        <View style={styles.levelArea}>
          <View
            style={[
              styles.ring,
              {
                borderColor: appTheme.colors.primary,
                backgroundColor: appTheme.colors.surface,
              },
            ]}
          >
            <View style={[styles.ringFill, { backgroundColor: appTheme.colors.primarySoft, height: ringFillHeight }]} />
            <Text style={[styles.ringText, { color: appTheme.colors.primary }]}>{progressPercent}%</Text>
          </View>
          <Text style={[styles.levelText, { color: appTheme.colors.text }]}>
            {level}-{nextLevel}
          </Text>
          <Text style={[styles.wordText, { color: appTheme.colors.muted }]}>
            {learnedWordCount}/{target}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  dock: {
    minHeight: 96,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  timerArea: {
    flex: 1,
    gap: 5,
  },
  timerControl: {
    gap: 5,
  },
  timerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timer: {
    color: '#9AA69D',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
  },
  timeTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primarySoft,
    overflow: 'hidden',
  },
  timeFill: {
    height: 6,
    borderRadius: 3,
  },
  brandLine: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoMark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 9,
    fontWeight: '900',
  },
  brandText: {
    fontSize: 11,
    fontWeight: '800',
  },
  homeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
  levelArea: {
    width: 62,
    alignItems: 'center',
    gap: 3,
  },
  ring: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  ringFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  ringText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  levelText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  wordText: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
  },
});
