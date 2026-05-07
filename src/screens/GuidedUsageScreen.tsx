import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Mic2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { QuizProgress } from '../components/QuizProgress';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GuidedUsage'>;

export function GuidedUsageScreen({ navigation, route }: Props) {
  const { lesson, completedModules = [] } = route.params;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercise = lesson.miniUsageExercises[currentIndex];
  const selectedOptionId = answers[exercise.id];
  const answeredCurrent = selectedOptionId !== undefined;
  const correctCurrent = selectedOptionId === exercise.correctOptionId;
  const isLastExercise = currentIndex === lesson.miniUsageExercises.length - 1;
  const selectedOptionText = exercise.options.find((option) => option.id === selectedOptionId)?.text;
  const displayedPrompt =
    exercise.type === 'insert_word' && selectedOptionText
      ? exercise.prompt.replace('______', selectedOptionText)
      : exercise.prompt;

  const goNext = () => {
    if (!isLastExercise) {
      setCurrentIndex((value) => value + 1);
      return;
    }
    navigation.replace('WordPreview', {
      lesson,
      completedModules: Array.from(new Set([...completedModules, 'use'])),
    });
  };

  return (
    <Screen>
      <Text style={styles.instruction}>Try.</Text>
      <QuizProgress current={currentIndex + 1} total={lesson.miniUsageExercises.length} />
      <View style={styles.card}>
        <Text style={styles.typeLabel}>
          {exercise.type === 'insert_word' ? 'Insert Word Exercise' : 'Correct Usage Exercise'}
        </Text>
        <Text style={styles.prompt}>{displayedPrompt}</Text>
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
          <View style={[styles.feedbackBox, { backgroundColor: correctCurrent ? theme.colors.playfulMint : theme.colors.playfulCoral }]}>
            <Mascot
              state={correctCurrent ? 'happy' : 'oops'}
              message={correctCurrent ? 'That pattern is getting easier.' : 'Tiny correction. Keep going.'}
              size={42}
              loop={false}
            />
            <Text style={styles.feedback}>
              {correctCurrent ? exercise.feedbackCorrect : exercise.feedbackIncorrect}
            </Text>
          </View>
        ) : null}
      </View>
      {answeredCurrent ? (
        <View style={styles.continueWrap}>
          <AppButton
            title={isLastExercise ? 'Continue' : 'Next'}
            onPress={goNext}
            icon={
              isLastExercise ? (
                <Mic2 size={18} color={theme.colors.surface} strokeWidth={2.2} />
              ) : (
                <ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />
              )
            }
          />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  instruction: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '900',
  },
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
    gap: theme.spacing.sm,
    borderRadius: 18,
    padding: theme.spacing.sm,
  },
  feedback: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  continueWrap: {
    marginTop: 'auto',
    paddingTop: theme.spacing.md,
  },
});
