import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RotateCcw, Trophy } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { DailyProgressRing } from '../components/DailyProgressRing';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { navigateHome } from '../navigation/rootNavigation';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SessionSummary'>;

const stageLine = 'New -> Seen -> Recognized -> Understood -> Recalled -> Used -> Active';

export function SessionSummaryScreen({ navigation, route }: Props) {
  const { lesson, contextSummary, definitionSummary } = route.params;
  const improved = Math.min(
    lesson.words.length,
    (contextSummary?.score ?? 0) + Math.floor((definitionSummary?.score ?? 0) / 2),
  );
  const needsReview = Math.max(0, lesson.words.length - improved);

  return (
    <Screen>
      <StepHeader
        title="Word Workout complete"
        subtitle={`You trained ${lesson.words.length} words today. ${improved} moved closer to active vocabulary.`}
      />
      <Mascot state="celebrate" message="Workout complete. These words are no longer random; they have context now." />
      <View style={styles.panel}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCopy}>
            <Text style={styles.panelTitle}>Daily workout complete</Text>
            <Text style={styles.panelText}>{needsReview} words will return tomorrow. We rescue them before they fade.</Text>
          </View>
          <DailyProgressRing progress={1} label="5/5 words" />
        </View>
      </View>
      {lesson.words.map((word) => (
        <View key={word.id} style={styles.wordRow}>
          <Text style={styles.word}>{word.text}</Text>
          <Text style={styles.stage}>{stageLine}</Text>
        </View>
      ))}
      <AppButton
        title="Finish"
        onPress={navigateHome}
        icon={<Trophy size={18} color={theme.colors.surface} strokeWidth={2.2} />}
      />
      <AppButton
        title="Start another workout"
        onPress={() => navigation.navigate('SessionSize')}
        variant="secondary"
        icon={<RotateCcw size={18} color={theme.colors.primary} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  summaryCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  panelTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  panelText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  wordRow: {
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },
  word: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  stage: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
});
