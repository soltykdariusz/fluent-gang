import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, RotateCcw } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { QuizProgress } from '../components/QuizProgress';
import { Screen } from '../components/Screen';
import { getPracticeExercises, getPracticeTitle } from '../services/practiceModeService';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'PracticeMode'>;

export function PracticeModeScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { lesson, module, completedModules = [] } = route.params;
  const exercises = useMemo(() => getPracticeExercises(lesson, module), [lesson, module]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const exercise = exercises[currentIndex];
  const selectedOptionId = answers[exercise.wordId];
  const answeredCurrent = selectedOptionId !== undefined;
  const isLastExercise = currentIndex === exercises.length - 1;
  const title = getPracticeTitle(module);

  const answer = (optionId: string) => {
    setAnswers({ ...answers, [exercise.wordId]: optionId });
  };

  const goNext = () => {
    if (!isLastExercise) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    navigation.replace('WordPreview', {
      lesson,
      completedModules: Array.from(new Set([...completedModules, module])),
    });
  };

  return (
    <Screen>
      <Text style={[styles.title, { color: appTheme.colors.text }]}>{title}</Text>
      <QuizProgress current={currentIndex + 1} total={exercises.length} />
      <View style={[styles.panel, { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border }]}>
        <Text style={[styles.word, { color: appTheme.colors.primary }]}>{exercise.targetWord}</Text>
        <HighlightedText
          text={exercise.sentence}
          terms={[exercise.targetWord]}
          style={[styles.sentence, { color: appTheme.colors.text }]}
          highlightStyle={[styles.highlight, { color: appTheme.colors.primary }]}
        />
        {exercise.question ? <Text style={[styles.question, { color: appTheme.colors.text }]}>{exercise.question}</Text> : null}
      </View>

      <View style={styles.options}>
        {exercise.options.map((option) => {
          const selected = selectedOptionId === option.id;
          const correct = option.id === exercise.correctOptionId;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              onPress={() => answer(option.id)}
              style={[
                styles.option,
                { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
                selected ? { borderColor: appTheme.colors.primary, backgroundColor: appTheme.colors.primarySoft } : null,
                answeredCurrent && correct ? { borderColor: appTheme.colors.success, backgroundColor: appTheme.colors.primarySoft } : null,
              ]}
            >
              <Text style={[styles.optionText, { color: appTheme.colors.text }]}>{option.text}</Text>
            </Pressable>
          );
        })}
      </View>

      {answeredCurrent ? (
        <AppButton
          title={isLastExercise ? 'Done' : module === 'fastFlash' ? 'Next flash' : 'Continue'}
          onPress={goNext}
          icon={
            module === 'fastFlash' && !isLastExercise ? (
              <RotateCcw size={17} color={theme.colors.surface} strokeWidth={2.2} />
            ) : (
              <ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />
            )
          }
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
  },
  panel: {
    gap: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    padding: theme.spacing.md,
  },
  word: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '700',
  },
  sentence: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '400',
  },
  question: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
  },
  options: {
    gap: theme.spacing.sm,
  },
  option: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
});
