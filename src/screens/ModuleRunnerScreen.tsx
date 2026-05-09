import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Play, Volume2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { ChoiceExercise } from '../components/workout/ChoiceExercise';
import { DialogueScene } from '../components/workout/DialogueScene';
import { ModuleProgress } from '../components/workout/ModuleProgress';
import { getWorkoutModule } from '../data/mockWorkoutModules';
import { theme } from '../theme/theme';
import { useTheme } from '../theme/ThemeProvider';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ModuleRunner'>;

export function ModuleRunnerScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { lesson, module: moduleType, completedModules = [] } = route.params;
  const module = useMemo(() => getWorkoutModule(lesson, moduleType), [lesson, moduleType]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visibleDialogueCount, setVisibleDialogueCount] = useState(1);
  const [showExtraDialogue, setShowExtraDialogue] = useState(false);
  const round = module.rounds[roundIndex];
  const roundDialogueLines = showExtraDialogue
    ? [...(round.dialogueLines ?? []), ...(round.extraDialogueLines ?? [])]
    : round.dialogueLines ?? [];
  const dialogueLines =
    moduleType === 'speak'
      ? module.rounds
          .slice(0, roundIndex + 1)
          .flatMap((item) => item.dialogueLines ?? [])
      : roundDialogueLines;
  const selectedChoiceId = answers[round.id];
  const hasChoices = Boolean(round.choices?.length);
  const answered = selectedChoiceId !== undefined;
  const visibleDialogueTotal = moduleType === 'speak' ? dialogueLines.length : visibleDialogueCount;
  const allDialogueVisible = dialogueLines.length === 0 || visibleDialogueTotal >= dialogueLines.length;
  const isLastRound = roundIndex === module.rounds.length - 1;
  const dialogueBased = dialogueLines.length > 0;

  const choose = (choiceId: string) => {
    if (choiceId === 'not-sure' && round.extraDialogueLines?.length && !showExtraDialogue) {
      setShowExtraDialogue(true);
      setVisibleDialogueCount((round.dialogueLines ?? []).length + 1);
      return;
    }

    setAnswers({ ...answers, [round.id]: choiceId });
  };

  const advanceDialogue = () => {
    if (!allDialogueVisible) {
      setVisibleDialogueCount((value) => value + 1);
    }
  };

  const goNext = () => {
    if (!isLastRound) {
      setRoundIndex((value) => value + 1);
      setVisibleDialogueCount(1);
      setShowExtraDialogue(false);
      return;
    }

    navigation.replace('WordPreview', {
      lesson,
      completedModules: Array.from(new Set([...completedModules, moduleType])),
    });
  };

  const canContinue = !hasChoices || answered;
  const selectedCorrect = selectedChoiceId === round.correctChoiceId;
  const feedback = selectedCorrect ? round.feedbackCorrect : round.feedbackIncorrect;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: appTheme.colors.background }]}>
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={[styles.kicker, { color: appTheme.colors.muted }]}>Word Gym</Text>
            <Text style={[styles.title, { color: appTheme.colors.text }]}>{module.title}</Text>
          </View>
          <View style={[styles.wordPill, { backgroundColor: appTheme.colors.primarySoft }]}>
            <Text style={[styles.wordPillText, { color: appTheme.colors.primary }]}>{round.targetWord}</Text>
          </View>
        </View>

        <ModuleProgress current={roundIndex + 1} total={module.rounds.length} />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {dialogueBased ? (
            <Pressable accessibilityRole="button" onPress={advanceDialogue} style={styles.dialogueTapArea}>
              <DialogueScene lines={dialogueLines} visibleCount={visibleDialogueTotal} />
            </Pressable>
          ) : null}

          {moduleType === 'speak' && !dialogueBased ? (
            <View style={[styles.audioMock, { backgroundColor: appTheme.colors.primarySoft }]}>
              <Volume2 size={24} color={appTheme.colors.primary} strokeWidth={2.2} />
              <HighlightedText
                text={round.content}
                terms={[round.targetWord]}
                style={[styles.speakSentence, { color: appTheme.colors.text }]}
                highlightStyle={[styles.highlight, { color: appTheme.colors.primary }]}
              />
              <View style={styles.speedRow}>
                {['0.75x', '1x', '1.25x'].map((speed) => (
                  <View key={speed} style={[styles.speedPill, { borderColor: appTheme.colors.border }]}>
                    <Text style={[styles.speedText, { color: appTheme.colors.primary }]}>{speed}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {!dialogueBased && moduleType !== 'speak' ? (
            <View style={styles.simpleScene}>
              <Text style={[styles.prompt, { color: appTheme.colors.text }]}>{round.prompt}</Text>
              <HighlightedText
                text={round.content}
                terms={[round.targetWord]}
                style={[styles.contentText, { color: appTheme.colors.text }]}
                highlightStyle={[styles.highlight, { color: appTheme.colors.primary }]}
              />
            </View>
          ) : null}

          {dialogueBased && allDialogueVisible && hasChoices ? (
            <View style={styles.questionBlock}>
              <Text style={[styles.prompt, { color: appTheme.colors.text }]}>{round.prompt}</Text>
            </View>
          ) : null}

          {allDialogueVisible && round.choices ? (
            <ChoiceExercise
              choices={round.choices}
              selectedChoiceId={selectedChoiceId}
              correctChoiceId={round.correctChoiceId}
              onChoose={choose}
            />
          ) : null}

          {answered && feedback ? (
            <View style={[styles.feedback, { backgroundColor: appTheme.colors.primarySoft }]}>
              <Text style={[styles.feedbackText, { color: appTheme.colors.primary }]}>{feedback}</Text>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.bottomAction}>
          {!allDialogueVisible ? (
            <AppButton
              title="Next"
              onPress={advanceDialogue}
              icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
            />
          ) : (
            <AppButton
              title={isLastRound ? 'Finish machine' : moduleType === 'speak' ? 'Continue' : 'Next set'}
              onPress={goNext}
              disabled={!canContinue}
              icon={
                moduleType === 'speak' ? (
                  <Play size={17} color={theme.colors.surface} strokeWidth={2.4} />
                ) : (
                  <ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />
                )
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  kicker: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  wordPill: {
    minHeight: 38,
    alignSelf: 'flex-start',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  wordPillText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  simpleScene: {
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  prompt: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '900',
    textAlign: 'center',
  },
  dialogueTapArea: {
    gap: theme.spacing.sm,
  },
  questionBlock: {
    marginTop: theme.spacing.sm,
  },
  contentText: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '500',
  },
  highlight: {
    fontWeight: '900',
  },
  audioMock: {
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  speakSentence: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '700',
    textAlign: 'center',
  },
  speedRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  speedPill: {
    minWidth: 58,
    minHeight: 34,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  speedText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '900',
  },
  feedback: {
    minHeight: 48,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  feedbackText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
  bottomAction: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
});
