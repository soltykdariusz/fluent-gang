import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, ChevronLeft, ChevronRight, ListChecks, X } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Mascot } from '../components/Mascot';
import { QuizNavButton } from '../components/QuizNavButton';
import { QuizProgress } from '../components/QuizProgress';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ContextQuiz'>;

export function ContextQuizScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { lesson } = route.params;
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const question = lesson.contextQuiz[currentIndex];
  const score = lesson.contextQuiz.filter((question) => answers[question.id] === question.answer).length;
  const complete = Object.keys(answers).length === lesson.contextQuiz.length;
  const selectedAnswer = answers[question.id];
  const answeredCurrent = selectedAnswer !== undefined;
  const correctCurrent = selectedAnswer === question.answer;
  const isLastQuestion = currentIndex === lesson.contextQuiz.length - 1;

  const answerQuestion = (answer: boolean) => {
    setAnswers({ ...answers, [question.id]: answer });
  };

  const goNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    if (complete) {
      navigation.navigate('GuidedUsage', {
        lesson,
        contextSummary: {
          answers,
          score,
          total: lesson.contextQuiz.length,
        },
      });
    }
  };

  return (
    <Screen>
      <StepHeader
        title="True/False Check"
        subtitle={complete ? `Score: ${score}/${lesson.contextQuiz.length}` : 'One word at a time. You can go back before continuing.'}
      />
      <QuizProgress current={currentIndex + 1} total={lesson.contextQuiz.length} />
      <View style={styles.question}>
        <Text style={styles.wordLabel}>{question.wordText ?? 'Word'}</Text>
        {question.baseSentence ? <Text style={styles.baseSentence}>{question.baseSentence}</Text> : null}
        <Text style={styles.statement}>{question.questionText ?? question.statement}</Text>
        <View style={styles.row}>
          <AppButton
            title={t('true')}
            onPress={() => answerQuestion(true)}
            variant={selectedAnswer === true ? 'primary' : 'secondary'}
            icon={<Check size={17} color={selectedAnswer === true ? theme.colors.surface : theme.colors.primary} strokeWidth={2.4} />}
          />
          <AppButton
            title={t('false')}
            onPress={() => answerQuestion(false)}
            variant={selectedAnswer === false ? 'primary' : 'secondary'}
            icon={<X size={17} color={selectedAnswer === false ? theme.colors.surface : theme.colors.primary} strokeWidth={2.4} />}
          />
        </View>
        {answeredCurrent ? (
          <View style={styles.feedbackBox}>
            <Mascot
              state={correctCurrent ? 'happy' : 'oops'}
              message={correctCurrent ? 'Nice. The word moved a little closer to active vocabulary.' : 'Good attempt. Rescue the meaning and keep moving.'}
              size={44}
              loop={false}
            />
            <Text style={styles.feedbackTitle}>{correctCurrent ? 'Nice hit.' : 'Good try.'}</Text>
            <Text style={styles.explanation}>
              {correctCurrent
                ? question.feedbackCorrect ?? question.explanation
                : question.feedbackIncorrect ?? question.explanation}
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
          title={isLastQuestion ? 'Mini usage' : t('next')}
          onPress={goNext}
          disabled={!answeredCurrent || (isLastQuestion && !complete)}
          variant="solid"
          icon={
            isLastQuestion ? (
              <ListChecks size={18} color={theme.colors.surface} strokeWidth={2.2} />
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
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  explanation: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  feedbackBox: {
    gap: 3,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.sm,
  },
  feedbackTitle: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
});
