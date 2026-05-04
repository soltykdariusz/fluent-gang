import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookMarked, ListChecks } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Definitions'>;

export function DefinitionsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { lesson } = route.params;

  return (
    <Screen>
      <StepHeader title={t('definitions')} subtitle="Simple level-matched definitions with examples." />
      {lesson.words.map((word) => (
        <View key={word.id} style={styles.card}>
          <View style={styles.wordRow}>
            <View style={styles.wordIcon}>
              <BookMarked size={18} color={theme.colors.primary} strokeWidth={2.2} />
            </View>
            <Text style={styles.word}>{word.text}</Text>
          </View>
          <Text style={styles.definition}>{word.definition}</Text>
          <Text style={styles.example}>{word.example}</Text>
        </View>
      ))}
      <AppButton
        title={t('definitionQuiz')}
        onPress={() => navigation.navigate('DefinitionQuiz', { lesson })}
        icon={<ListChecks size={18} color={theme.colors.surface} strokeWidth={2.2} />}
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
});
