import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookMarked, Dumbbell } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Definitions'>;

export function DefinitionsScreen({ navigation, route }: Props) {
  const { lesson, contextSummary } = route.params;

  return (
    <Screen>
      <StepHeader title="Definition Confirmation" subtitle="Now confirm the meaning. Short, simple, and level-matched." />
      {lesson.words.map((word) => {
        const hook = lesson.memoryHooks.find((item) => item.wordId === word.id);
        const definition = lesson.definitions.find((item) => item.wordId === word.id);
        return (
          <View key={word.id} style={styles.card}>
            <View style={styles.wordRow}>
              <View style={styles.wordIcon}>
                <BookMarked size={18} color={theme.colors.primary} strokeWidth={2.2} />
              </View>
              <Text style={styles.word}>{word.text}</Text>
            </View>
            <Text style={styles.definition}>{definition?.simpleDefinition ?? word.simpleDefinition ?? word.definition}</Text>
            {definition?.commonPattern ?? word.commonPattern ? (
              <Text style={styles.pattern}>Pattern: {definition?.commonPattern ?? word.commonPattern}</Text>
            ) : null}
            <Text style={styles.example}>{definition?.exampleSentence ?? word.exampleSentence ?? word.example}</Text>
            {hook ? (
              <View style={styles.hookBox}>
                <Text style={styles.hookTitle}>Memory hook</Text>
                <Text style={styles.hookText}>{definition?.memoryHook ?? word.memoryHook ?? hook.visualAssociation}</Text>
              </View>
            ) : null}
          </View>
        );
      })}
      <AppButton
        title="Try mini usage"
        onPress={() => navigation.navigate('GuidedUsage', { lesson, contextSummary })}
        icon={<Dumbbell size={18} color={theme.colors.surface} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  word: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  wordIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  definition: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  example: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  pattern: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  hookBox: {
    gap: 4,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  hookTitle: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  hookText: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
});
