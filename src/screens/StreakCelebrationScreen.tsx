import { Flame, Home } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { navigateHome } from '../navigation/rootNavigation';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';

export function StreakCelebrationScreen() {
  const completedLessons = useAppStore((state) => state.completedLessons);
  const streakDays = Math.max(1, getUniqueCompletionDays(completedLessons.map((lesson) => lesson.completedAt)));

  return (
    <Screen>
      <Mascot
        state="celebrate"
        message="Nice work. Come back tomorrow and rescue the next words."
        size={78}
      />

      <View style={styles.streakCard}>
        <View style={styles.flameCircle}>
          <Flame size={42} color={theme.colors.warning} fill={theme.colors.warning} strokeWidth={2.1} />
        </View>
        <Text style={styles.kicker}>Current streak</Text>
        <Text style={styles.title}>Day {streakDays}</Text>
        <Text style={styles.subtitle}>Small sessions. Strong vocabulary.</Text>
      </View>

      <View style={styles.nextBox}>
        <Text style={styles.nextText}>Next: words to rescue will wait for you on Home.</Text>
      </View>

      <View style={styles.actionWrap}>
        <AppButton
          title="Dalej"
          onPress={navigateHome}
          icon={<Home size={18} color={theme.colors.surface} strokeWidth={2.2} />}
        />
      </View>
    </Screen>
  );
}

function getUniqueCompletionDays(completedAtDates: string[]) {
  return new Set(completedAtDates.map((date) => date.slice(0, 10))).size;
}

const styles = StyleSheet.create({
  streakCard: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  },
  flameCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: theme.colors.warningSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  kicker: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  nextBox: {
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.accentSoft,
    padding: theme.spacing.md,
  },
  nextText: {
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
