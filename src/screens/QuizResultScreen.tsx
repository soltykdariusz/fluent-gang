import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListChecks } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StatTile } from '../components/StatTile';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizResult'>;

export function QuizResultScreen({ navigation, route }: Props) {
  const { lesson, contextSummary } = route.params;
  const strengthenedCount = contextSummary.score;
  const needsPractice = lesson.words.filter((word) => {
    const question = lesson.contextQuiz.find((item) => item.wordId === word.id);
    return question ? contextSummary.answers[question.id] !== question.answer : false;
  });

  return (
    <Screen>
      <StepHeader
        title="Quiz result"
        subtitle={`You trained ${lesson.words.length} words. ${strengthenedCount} are stronger now. ${needsPractice.length} will come back soon.`}
      />
      <View style={styles.stats}>
        <StatTile label="Score" value={`${contextSummary.score}/${contextSummary.total}`} />
        <StatTile label="Words" value={String(lesson.words.length)} />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Needs more practice</Text>
        {needsPractice.length === 0 ? (
          <Text style={styles.wordText}>Clean round. Every word moved forward.</Text>
        ) : (
          needsPractice.map((word) => (
            <Text key={word.id} style={styles.wordText}>
              {word.text}
            </Text>
          ))
        )}
      </View>
      <Text style={styles.note}>Consistency beats intensity. These words will be scheduled for review after the lesson.</Text>
      <AppButton
        title="Optional definition rescue"
        onPress={() => navigation.navigate('Definitions', { lesson, contextSummary })}
        icon={<ListChecks size={18} color={theme.colors.surface} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  panel: {
    gap: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  panelTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  wordText: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  note: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
