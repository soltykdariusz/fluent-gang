import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2 } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SessionSummary'>;

export function SessionSummaryScreen({ navigation, route }: Props) {
  const { lesson, contextSummary } = route.params;
  const latestLesson = useAppStore((state) => state.completedLessons[0]);
  const trainedWords = lesson.words.length;
  const correctAnswers = contextSummary?.score ?? 0;
  const totalAnswers = contextSummary?.total ?? lesson.contextQuiz.length;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const durationSeconds = latestLesson?.lessonId === lesson.id ? latestLesson.durationSeconds : 600;
  const points = trainedWords * 10 + correctAnswers * 8 + Math.max(0, accuracy - 70);

  return (
    <Screen>
      <View style={styles.hero}>
        <AnimatedLogo />
        <Text style={styles.title}>Session complete</Text>
        <Text style={styles.subtitle}>Your words got a little stronger.</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatTile label="Points" value={String(points)} />
        <StatTile label="Accuracy" value={`${accuracy}%`} />
        <StatTile label="Time" value={formatDuration(durationSeconds)} />
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>
          {trainedWords} words trained. They will return soon, before they fade.
        </Text>
      </View>

      <View style={styles.actionWrap}>
        <AppButton
          title="Koniec"
          onPress={() => navigation.navigate('StreakCelebration')}
          icon={<CheckCircle2 size={18} color={theme.colors.surface} strokeWidth={2.2} />}
        />
      </View>
    </Screen>
  );
}

function AnimatedLogo() {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 680,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 680,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View style={[styles.logo, { transform: [{ scale: pulse }] }]}>
      <Text style={styles.logoText}>FG</Text>
    </Animated.View>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.lg,
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  logoText: {
    color: theme.colors.surface,
    fontSize: 38,
    fontWeight: '900',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statTile: {
    flex: 1,
    minHeight: 86,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  statValue: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  note: {
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.md,
  },
  noteText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionWrap: {
    marginTop: 'auto',
    paddingTop: theme.spacing.md,
  },
});
