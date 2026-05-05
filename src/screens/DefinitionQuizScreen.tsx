import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, ChevronLeft, ChevronRight, Mic2, X } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { QuizNavButton } from '../components/QuizNavButton';
import { QuizProgress } from '../components/QuizProgress';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DefinitionQuiz'>;

export function DefinitionQuizScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { lesson, contextSummary } = route.params;
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = lesson.definitionQuiz[currentIndex];
  const score = lesson.definitionQuiz.filter((question) => answers[question.id] === question.answer).length;
  const complete = Object.keys(answers).length === lesson.definitionQuiz.length;
  const selectedAnswer = answers[question.id];
  const answeredCurrent = selectedAnswer !== undefined;
  const isLastQuestion = currentIndex === lesson.definitionQuiz.length - 1;

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
        contextSummary,
        definitionSummary: {
          answers,
          score,
          total: lesson.definitionQuiz.length,
        },
      });
    }
  };

  return (
    <Screen>
      <StepHeader
        title={t('definitionQuiz')}
        subtitle={complete ? `Score: ${score}/${lesson.definitionQuiz.length}` : 'One definition check per practiced word.'}
      />
      <QuizProgress current={currentIndex + 1} total={lesson.definitionQuiz.length} />
      <View style={styles.question}>
        <Text style={styles.wordLabel}>{question.wordText ?? 'Word'}</Text>
        <Text style={styles.statement}>{question.statement}</Text>
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
        {answeredCurrent ? <Text style={styles.explanation}>{question.explanation}</Text> : null}
      </View>
      <View style={styles.navRow}>
        <QuizNavButton
          title="Back"
          onPress={() => setCurrentIndex((value) => Math.max(0, value - 1))}
          disabled={currentIndex === 0}
          icon={<ChevronLeft size={17} color={theme.colors.primary} strokeWidth={2.4} />}
        />
        <QuizNavButton
          title={isLastQuestion ? t('shadowing') : t('next')}
          onPress={goNext}
          disabled={!answeredCurrent || (isLastQuestion && !complete)}
          variant="solid"
          icon={
            isLastQuestion ? (
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
});
