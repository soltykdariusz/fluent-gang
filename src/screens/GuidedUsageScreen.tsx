import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, ChevronLeft, ChevronRight, Mic2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { QuizNavButton } from '../components/QuizNavButton';
import { QuizProgress } from '../components/QuizProgress';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GuidedUsage'>;

export function GuidedUsageScreen({ navigation, route }: Props) {
  const { lesson, contextSummary, definitionSummary } = route.params;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercise = lesson.miniUsageExercises[currentIndex];
  const selectedOptionId = answers[exercise.id];
  const answeredCurrent = selectedOptionId !== undefined;
  const correctCurrent = selectedOptionId === exercise.correctOptionId;
  const isLastExercise = currentIndex === lesson.miniUsageExercises.length - 1;

  const goNext = () => {
    if (!isLastExercise) {
      setCurrentIndex((value) => value + 1);
      return;
    }
    navigation.navigate('Shadowing', { lesson, contextSummary, definitionSummary });
  };

  return (
    <Screen>
      <StepHeader
        title="Mini Usage"
        subtitle="Tap one answer. This should feel easy: recognition first, activation next."
      />
      <QuizProgress current={currentIndex + 1} total={lesson.miniUsageExercises.length} />
      <View style={styles.card}>
        <Text style={styles.typeLabel}>
          {exercise.type === 'insert_word' ? 'Insert Word Exercise' : 'Correct Usage Exercise'}
        </Text>
        <Text style={styles.prompt}>{exercise.prompt}</Text>
        <View style={styles.options}>
          {exercise.options.map((option) => {
            const selected = selectedOptionId === option.id;
            const correct = option.id === exercise.correctOptionId;
            return (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                onPress={() => setAnswers({ ...answers, [exercise.id]: option.id })}
                style={[
                  styles.option,
                  selected ? styles.selectedOption : null,
                  answeredCurrent && correct ? styles.correctOption : null,
                ]}
              >
                <Text style={[styles.optionText, selected || (answeredCurrent && correct) ? styles.optionTextSelected : null]}>
                  {option.text}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {answeredCurrent ? (
          <View style={styles.feedbackBox}>
            <Mascot
              state={correctCurrent ? 'happy' : 'oops'}
              message={correctCurrent ? 'That pattern is getting easier.' : 'Almost. Tiny correction, then keep going.'}
              size={42}
              loop={false}
            />
            <CheckCircle2 size={18} color={theme.colors.primary} strokeWidth={2.2} />
            <Text style={styles.feedback}>
              {correctCurrent ? exercise.feedbackCorrect : exercise.feedbackIncorrect}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.navRow}>
        <QuizNavButton
          title="Back"
          onPress={() => setCurrentIndex((value) => Math.max(0, value - 1))}
          disabled={currentIndex === 0}
          icon={<ChevronLeft size={17} color={theme.colors.primary} strokeWidth={2.4} />}
        />
        <QuizNavButton
          title={isLastExercise ? 'Shadowing' : 'Next'}
          onPress={goNext}
          disabled={!answeredCurrent}
          variant="solid"
          icon={
            isLastExercise ? (
              <Mic2 size={18} color={theme.colors.surface} strokeWidth={2.2} />
            ) : (
              <ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />
            )
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  typeLabel: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: theme.colors.primarySoft,
    color: theme.colors.primary,
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '900',
  },
  prompt: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '900',
  },
  options: {
    gap: theme.spacing.sm,
  },
  option: {
    minHeight: 54,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
  },
  correctOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  optionTextSelected: {
    color: theme.colors.primary,
    fontWeight: '900',
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.sm,
  },
  feedback: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
});
