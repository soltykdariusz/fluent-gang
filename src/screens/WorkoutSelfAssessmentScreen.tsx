import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { WordSelfAssessmentStatus } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutSelfAssessment'>;

const statusOptions: Array<{
  label: string;
  status: WordSelfAssessmentStatus;
}> = [
  { label: 'Still new', status: 'new' },
  { label: 'I recognize it', status: 'recognized' },
  { label: 'I can use it', status: 'active' },
];

export function WorkoutSelfAssessmentScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { lesson } = route.params;
  const setWordAssessments = useAppStore((state) => state.setWordAssessments);
  const [assessments, setAssessments] = useState<Record<string, WordSelfAssessmentStatus>>(route.params.assessments ?? {});
  const solo = lesson.words.length === 1;

  const saveProgress = () => {
    setWordAssessments(assessments);
    // TODO: Persist word self-assessment to Supabase word state.
    navigation.navigate('Home');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: appTheme.colors.text }]}>
          {solo ? lesson.words[0].text : 'How do these words feel now?'}
        </Text>
        <Text style={[styles.subtitle, { color: appTheme.colors.muted }]}>
          {solo ? 'How does this word feel now?' : 'Pick one feeling per word.'}
        </Text>
      </View>

      {lesson.words.map((word) => (
        <View key={word.id} style={[styles.wordBlock, { backgroundColor: appTheme.colors.surface }]}>
          {!solo ? <Text style={[styles.word, { color: appTheme.colors.text }]}>{word.text}</Text> : null}
          <View style={styles.options}>
            {statusOptions.map((option) => {
              const selected = assessments[word.id] === option.status;
              return (
                <Pressable
                  key={option.status}
                  accessibilityRole="button"
                  onPress={() => setAssessments({ ...assessments, [word.id]: option.status })}
                  style={[
                    styles.option,
                    { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.background },
                    selected ? { borderColor: appTheme.colors.primary, backgroundColor: appTheme.colors.primarySoft } : null,
                  ]}
                >
                  <Text style={[styles.optionText, { color: selected ? appTheme.colors.primary : appTheme.colors.text }]}>
                    {option.label}
                  </Text>
                  {selected ? <Check size={16} color={appTheme.colors.primary} strokeWidth={2.4} /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}

      <AppButton title="Save progress" onPress={saveProgress} />
      <AppButton title="Skip" variant="secondary" onPress={() => navigation.navigate('Home')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  wordBlock: {
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  word: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  options: {
    gap: theme.spacing.sm,
  },
  option: {
    minHeight: 48,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  optionText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
});
