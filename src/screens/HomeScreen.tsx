import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarChart3, BookOpenText, Brain, Focus, Settings } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { DailyProgressRing } from '../components/DailyProgressRing';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { StatTile } from '../components/StatTile';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { targetLanguage, level, completedLessons, focusSecondsToday } = useAppStore();
  const defaultSessionSize = 5;
  const trainedLastSession = Math.min(defaultSessionSize, completedLessons[0]?.practicedWordIds.length ?? 0);
  const sessionProgress = defaultSessionSize > 0 ? trainedLastSession / defaultSessionSize : 0;

  return (
    <Screen>
      <StepHeader title={t('homeTitle')} subtitle="Ready for today’s words?" />
      <View style={styles.messagePanel}>
        <Mascot state="idle" message="Ready for today’s words? Let’s rescue a few and make them active." size={52} />
        <Text style={styles.panelTitle}>3 words need rescue today</Text>
        <Text style={styles.panelCopy}>You’re building active vocabulary, not just collecting words.</Text>
      </View>
      <View style={styles.profilePanel}>
        <View style={styles.profileCopy}>
          <Text style={styles.panelTitle}>{targetLanguage.toUpperCase()} · {level}</Text>
          <Text style={styles.panelCopy}>Default session: 5 words · Active vocabulary: 0</Text>
          <Text style={styles.panelCopy}>Words in training: {completedLessons.length * 5}</Text>
        </View>
        <DailyProgressRing progress={sessionProgress} label={`${trainedLastSession}/5 words`} />
      </View>
      <View style={styles.stats}>
        <StatTile label="Words to rescue" value="3" />
        <StatTile label="Focus min" value={String(Math.floor(focusSecondsToday / 60))} />
      </View>
      <View style={styles.workoutPanel}>
        <Text style={styles.panelTitle}>Today’s Vocabulary Workout</Text>
        <Text style={styles.panelCopy}>Choose 3, 5, or 8 words · 3 words to rescue · Estimated time: 4-12 minutes</Text>
      </View>
      <AppButton
        title="Start workout"
        onPress={() => navigation.navigate('SessionSize')}
        icon={<BookOpenText size={19} color={theme.colors.surface} strokeWidth={2.2} />}
      />
      <AppButton
        title="Continue previous session"
        onPress={() => navigation.navigate('SessionSize')}
        variant="secondary"
        icon={<BookOpenText size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title="Review due words"
        onPress={() => navigation.navigate('Review')}
        variant="secondary"
        icon={<Brain size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title={t('focus')}
        onPress={() => navigation.navigate('FocusSession')}
        variant="secondary"
        icon={<Focus size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title="View vocabulary progress"
        onPress={() => navigation.navigate('Progress')}
        variant="secondary"
        icon={<BarChart3 size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title={t('settings')}
        onPress={() => navigation.navigate('Settings')}
        variant="secondary"
        icon={<Settings size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  workoutPanel: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    gap: 4,
  },
  messagePanel: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.md,
    gap: 4,
  },
  profilePanel: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  profileCopy: {
    flex: 1,
    gap: 5,
  },
  panelTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  panelCopy: {
    color: theme.colors.muted,
    fontSize: 14,
  },
});
