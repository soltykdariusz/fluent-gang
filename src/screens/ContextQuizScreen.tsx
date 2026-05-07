import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, ChevronRight, ListChecks, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { QuizProgress } from '../components/QuizProgress';
import { Screen } from '../components/Screen';
import { playFailureSound, playSuccessSound } from '../services/soundService';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ContextQuiz'>;

export function ContextQuizScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { lesson, completedModules = [] } = route.params;
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const question = lesson.contextQuiz[currentIndex];
  const score = lesson.contextQuiz.filter((question) => answers[question.id] === question.answer).length;
  const complete = Object.keys(answers).length === lesson.contextQuiz.length;
  const selectedAnswer = answers[question.id];
  const answeredCurrent = selectedAnswer !== undefined;
  const isLastQuestion = currentIndex === lesson.contextQuiz.length - 1;

  const answerQuestion = (answer: boolean) => {
    if (answeredCurrent) {
      return;
    }

    setAnswers({ ...answers, [question.id]: answer });
    if (answer !== question.answer) {
      playFailureSound();
      return;
    }
    playSuccessSound();
  };

  const goNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    if (complete) {
      navigation.replace('WordPreview', {
        lesson,
        completedModules: Array.from(new Set([...completedModules, 'check'])),
      });
    }
  };

  return (
    <Screen>
      <Text style={styles.instruction}>Check.</Text>
      <QuizProgress current={currentIndex + 1} total={lesson.contextQuiz.length} />
      <View style={styles.question}>
        <Text style={styles.wordLabel}>{question.wordText ?? 'Word'}</Text>
        {question.baseSentence ? <Text style={styles.baseSentence}>{question.baseSentence}</Text> : null}
        <Text style={styles.statement}>{question.questionText ?? question.statement}</Text>
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            disabled={answeredCurrent}
            onPress={() => answerQuestion(true)}
            style={[
              styles.answerButton,
              { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface },
              getAnswerStyle({
                answer: true,
                selectedAnswer,
                correctAnswer: question.answer,
                colors: appTheme.colors,
              }),
            ]}
          >
            <Check
              size={34}
              color={getAnswerIconColor({
                answer: true,
                selectedAnswer,
                correctAnswer: question.answer,
                colors: appTheme.colors,
              })}
              strokeWidth={2.8}
            />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={answeredCurrent}
            onPress={() => answerQuestion(false)}
            style={[
              styles.answerButton,
              { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface },
              getAnswerStyle({
                answer: false,
                selectedAnswer,
                correctAnswer: question.answer,
                colors: appTheme.colors,
              }),
            ]}
          >
            <X
              size={34}
              color={getAnswerIconColor({
                answer: false,
                selectedAnswer,
                correctAnswer: question.answer,
                colors: appTheme.colors,
              })}
              strokeWidth={2.8}
            />
          </Pressable>
        </View>
      </View>
      {answeredCurrent ? (
        <View style={styles.continueWrap}>
          <AppButton
            title={isLastQuestion ? 'Continue' : 'Next'}
            onPress={goNext}
            icon={
              isLastQuestion ? (
                <ListChecks size={18} color={theme.colors.surface} strokeWidth={2.2} />
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
  question: {
    gap: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  statement: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '700',
  },
  baseSentence: {
    color: theme.colors.primary,
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '900',
  },
  wordLabel: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: theme.colors.primarySoft,
    color: theme.colors.primary,
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    fontSize: 13,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
  },
  answerButton: {
    width: 82,
    height: 64,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  continueWrap: {
    marginTop: 'auto',
    paddingTop: theme.spacing.md,
  },
});

type AnswerStyleInput = {
  answer: boolean;
  selectedAnswer?: boolean;
  correctAnswer: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
};

function getAnswerStyle({ answer, selectedAnswer, correctAnswer, colors }: AnswerStyleInput) {
  if (selectedAnswer === undefined) {
    return null;
  }

  if (answer === correctAnswer) {
    return { borderColor: colors.primary, backgroundColor: colors.primarySoft };
  }

  if (selectedAnswer === answer && selectedAnswer !== correctAnswer) {
    return { borderColor: colors.danger, backgroundColor: colors.dangerSoft };
  }

  return { opacity: 0.45 };
}

function getAnswerIconColor({ answer, selectedAnswer, correctAnswer, colors }: AnswerStyleInput) {
  if (selectedAnswer === undefined) {
    return colors.accent;
  }

  if (answer === correctAnswer) {
    return colors.primary;
  }

  if (selectedAnswer === answer && selectedAnswer !== correctAnswer) {
    return colors.danger;
  }

  return colors.muted;
}
