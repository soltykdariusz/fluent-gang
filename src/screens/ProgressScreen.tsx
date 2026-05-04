import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Progress'>;

export function ProgressScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const completedLessons = useAppStore((state) => state.completedLessons);

  return (
    <Screen>
      <StepHeader title={t('progress')} subtitle="Local MVP progress, ready to sync with Supabase." />
      {completedLessons.length === 0 ? <Text>No completed lessons yet.</Text> : null}
      {completedLessons.map((lesson) => (
        <View key={`${lesson.lessonId}-${lesson.completedAt}`} style={styles.card}>
          <Text style={styles.title}>{lesson.completedAt.slice(0, 10)}</Text>
          <Text style={styles.meta}>{lesson.practicedWordIds.length} words practiced</Text>
        </View>
      ))}
      <AppButton title="Back home" onPress={() => navigation.navigate('Home')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  meta: {
    color: theme.colors.muted,
    marginTop: 4,
  },
});
