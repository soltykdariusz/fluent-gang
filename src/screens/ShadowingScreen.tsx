import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, ChevronLeft, ChevronRight, Gauge, Play, Subtitles } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { QuizNavButton } from '../components/QuizNavButton';
import { QuizProgress } from '../components/QuizProgress';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { saveLessonResult } from '../services/progressService';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Shadowing'>;

export function ShadowingScreen({ navigation, route }: Props) {
  const { lesson, contextSummary, definitionSummary } = route.params;
  const addLessonResult = useAppStore((state) => state.addLessonResult);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [speed, setSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [doneWords, setDoneWords] = useState<Record<string, boolean>>({});
  const shadowingSet = lesson.shadowingSets[currentIndex];
  const isLastWord = currentIndex === lesson.shadowingSets.length - 1;
  const currentDone = doneWords[shadowingSet.wordId] === true;

  const finishLesson = async () => {
    const result = {
      lessonId: lesson.id,
      completedAt: new Date().toISOString(),
      contextScore: contextSummary?.score ?? 0,
      definitionScore: definitionSummary?.score ?? 0,
      practicedWordIds: lesson.words.map((word) => word.id),
      durationSeconds: 600,
    };
    addLessonResult(result);
    await saveLessonResult(result);
    navigation.navigate('SessionSummary', { lesson, contextSummary, definitionSummary });
  };

  const goNext = () => {
    if (!isLastWord) {
      setCurrentIndex((value) => value + 1);
      return;
    }
    finishLesson();
  };

  return (
    <Screen>
      <StepHeader title="Shadowing" subtitle="One word at a time. Listen, repeat, and mark it done." />
      <QuizProgress current={currentIndex + 1} total={lesson.shadowingSets.length} />
      <View style={styles.wordPanel}>
        <Text style={styles.word}>{shadowingSet.targetWord}</Text>
        <View style={styles.controls}>
          <View style={styles.labelRow}>
            <Subtitles size={18} color={theme.colors.primary} strokeWidth={2.2} />
            <Text style={styles.label}>Subtitles</Text>
          </View>
          <Switch value={showSubtitles} onValueChange={setShowSubtitles} />
        </View>
        <AppButton
          title="Play placeholder"
          onPress={() => undefined}
          variant="secondary"
          icon={<Play size={17} color={theme.colors.primary} strokeWidth={2.2} />}
        />
        <View style={styles.speedRow}>
          {shadowingSet.playbackSpeedOptions.map((value) => (
            <AppButton
              key={value}
              title={`${value}x`}
              onPress={() => setSpeed(value)}
              variant={speed === value ? 'primary' : 'secondary'}
              icon={<Gauge size={16} color={speed === value ? theme.colors.surface : theme.colors.primary} strokeWidth={2.2} />}
            />
          ))}
        </View>
        {showSubtitles ? (
          <View style={styles.scriptPanel}>
            {shadowingSet.sentences.map((sentence) => (
              <HighlightedText
                key={sentence}
                text={sentence}
                terms={[shadowingSet.targetWord]}
                style={styles.script}
                highlightStyle={styles.highlight}
              />
            ))}
          </View>
        ) : null}
        <AppButton
          title={currentDone ? 'Done' : 'Mark this word as done'}
          onPress={() => setDoneWords({ ...doneWords, [shadowingSet.wordId]: true })}
          icon={<CheckCircle2 size={18} color={theme.colors.surface} strokeWidth={2.2} />}
        />
      </View>
      <View style={styles.navRow}>
        <QuizNavButton
          title="Back"
          onPress={() => setCurrentIndex((value) => Math.max(0, value - 1))}
          disabled={currentIndex === 0}
          icon={<ChevronLeft size={17} color={theme.colors.primary} strokeWidth={2.4} />}
        />
        <QuizNavButton
          title={isLastWord ? 'Summary' : 'Next word'}
          onPress={goNext}
          disabled={!currentDone}
          variant="solid"
          icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wordPanel: {
    gap: theme.spacing.md,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  word: {
    color: theme.colors.primary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  controls: {
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  speedRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  scriptPanel: {
    gap: theme.spacing.sm,
  },
  script: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
  },
  highlight: {
    color: theme.colors.primary,
    fontWeight: '900',
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
});
