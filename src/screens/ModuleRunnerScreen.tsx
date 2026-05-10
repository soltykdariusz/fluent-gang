import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, ChevronRight, Newspaper, Play, Volume2, X } from 'lucide-react-native';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import chameleonAvatar from '../../assets/mascots/chameleon-avatar.png';
import rayAvatar from '../../assets/mascots/ray-avatar.png';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { ChoiceExercise } from '../components/workout/ChoiceExercise';
import { DialogueScene } from '../components/workout/DialogueScene';
import { ExerciseTopBar } from '../components/workout/ExerciseTopBar';
import { getWorkoutModule } from '../data/mockWorkoutModules';
import { playSentenceAudio, stopSentenceAudio } from '../services/soundService';
import { theme } from '../theme/theme';
import { useTheme } from '../theme/ThemeProvider';
import { RootStackParamList } from '../types/navigation';
import { ChoiceOption, WorkoutRound } from '../types/workout';

type Props = NativeStackScreenProps<RootStackParamList, 'ModuleRunner'>;

export function ModuleRunnerScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { lesson, module: moduleType, completedModules = [] } = route.params;
  const module = useMemo(() => getWorkoutModule(lesson, moduleType), [lesson, moduleType]);
  const isContextModule = moduleType === 'context';
  const isNewsModule = moduleType === 'the_news';
  const [roundIndex, setRoundIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [rejectedChoices, setRejectedChoices] = useState<Record<string, string[]>>({});
  const [visibleDialogueCount, setVisibleDialogueCount] = useState(isContextModule ? 0 : 1);
  const [showContextQuestion, setShowContextQuestion] = useState(false);
  const [showNewsStory, setShowNewsStory] = useState(false);
  const [visibleNewsStoryPartCount, setVisibleNewsStoryPartCount] = useState(0);
  const [showNewsQuestion, setShowNewsQuestion] = useState(false);
  const [showExtraDialogue, setShowExtraDialogue] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isNewsTyping, setIsNewsTyping] = useState(false);
  const [isTitleAudioActive, setIsTitleAudioActive] = useState(false);
  const [activeNewsStoryAudioPart, setActiveNewsStoryAudioPart] = useState<number | null>(null);
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
  const rejectedChoicesForRound = rejectedChoices[round.id] ?? [];
  const hasChoices = Boolean(round.choices?.length);
  const answered = selectedChoiceId !== undefined;
  const visibleDialogueTotal = moduleType === 'speak' ? dialogueLines.length : visibleDialogueCount;
  const allDialogueVisible = dialogueLines.length === 0 || visibleDialogueTotal >= dialogueLines.length;
  const isLastRound = roundIndex === module.rounds.length - 1;
  const dialogueBased = dialogueLines.length > 0;
  const showQuestion = !isContextModule || showContextQuestion;
  const contextProgressTotal = Math.max(1, dialogueLines.length + 2);
  const contextProgressCurrent = isContextModule
    ? showContextQuestion
      ? contextProgressTotal
      : Math.min(visibleDialogueTotal + 1, contextProgressTotal - 1)
    : roundIndex + 1;
  const newsStoryPartTotal = isNewsModule ? getNewsStoryParts(round).length : 0;
  const newsProgressCurrent = showNewsQuestion ? newsStoryPartTotal + 2 : visibleNewsStoryPartCount + 1;
  const displayedProgressCurrent = isContextModule ? contextProgressCurrent : isNewsModule ? newsProgressCurrent : roundIndex + 1;
  const displayedProgressTotal = isContextModule ? contextProgressTotal : isNewsModule ? newsStoryPartTotal + 2 : module.rounds.length;
  const usesCompactProgress = isContextModule || isNewsModule;

  useEffect(() => {
    if (isContextModule || isNewsModule) {
      setIsNarrating(true);
      setIsTitleAudioActive(true);
      void playSentenceAudio(
        isNewsModule ? round.headline ?? 'The News' : round.sceneTitle ?? 'In context',
        '',
        () => {
          setIsTitleAudioActive(false);
          setIsNarrating(false);
        },
      );
    }
  }, [isContextModule, isNewsModule, round.headline, round.id, round.sceneTitle]);

  useEffect(() => {
    if (!isContextModule && !isNewsModule) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 120);

    return () => clearTimeout(timeout);
  }, [
    answered,
    isContextModule,
    isNewsModule,
    round.id,
    showContextQuestion,
    showNewsQuestion,
    showNewsStory,
    visibleDialogueTotal,
    visibleNewsStoryPartCount,
  ]);

  const choose = (choiceId: string) => {
    if (choiceId === 'not-sure' && round.extraDialogueLines?.length && !showExtraDialogue) {
      setShowExtraDialogue(true);
      setVisibleDialogueCount((round.dialogueLines ?? []).length + 1);
      return;
    }

    if ((isContextModule || isNewsModule) && choiceId !== round.correctChoiceId) {
      setRejectedChoices((value) => ({
        ...value,
        [round.id]: Array.from(new Set([...(value[round.id] ?? []), choiceId])),
      }));
      return;
    }

    setAnswers({ ...answers, [round.id]: choiceId });
  };

  const advanceDialogue = () => {
    if (!allDialogueVisible) {
      setVisibleDialogueCount((value) => value + 1);
      return;
    }

    if (isContextModule && !showContextQuestion) {
      setShowContextQuestion(true);
    }
  };

  const advanceNews = () => {
    if (visibleNewsStoryPartCount < newsStoryPartTotal) {
      setIsNarrating(true);
      setIsNewsTyping(true);
      setShowNewsStory(true);
      setVisibleNewsStoryPartCount((value) => value + 1);
      return;
    }

    if (!showNewsQuestion) {
      setShowNewsQuestion(true);
    }
  };

  const goNext = () => {
    stopSentenceAudio();
    setIsTitleAudioActive(false);
    setActiveNewsStoryAudioPart(null);
    setIsNarrating(false);

    if (!isLastRound) {
      setRoundIndex((value) => value + 1);
      setVisibleDialogueCount(isContextModule ? 0 : 1);
      setShowContextQuestion(false);
      setShowNewsStory(false);
      setVisibleNewsStoryPartCount(0);
      setShowNewsQuestion(false);
      setShowExtraDialogue(false);
      setIsNewsTyping(false);
      setRejectedChoices({});
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
  const bottomButtonTitle = isNewsModule
    ? isLastRound
      ? 'Back to gym'
      : 'Next story'
    : isLastRound
      ? 'Finish machine'
      : moduleType === 'speak'
        ? 'Continue'
        : 'Next set';
  const handleContextAudioStart = useCallback(() => setIsNarrating(true), []);
  const handleContextAudioEnd = useCallback(() => setIsNarrating(false), []);
  const handleNewsStoryAudioStart = useCallback((partIndex: number) => {
    setIsNarrating(true);
    setActiveNewsStoryAudioPart(partIndex);
  }, []);
  const handleNewsStoryAudioEnd = useCallback(() => {
    setActiveNewsStoryAudioPart(null);
    setIsNarrating(false);
  }, []);
  const handleNewsStoryTypingStart = useCallback(() => setIsNewsTyping(true), []);
  const handleNewsStoryTypingEnd = useCallback(() => setIsNewsTyping(false), []);
  const toggleTitleAudio = useCallback(
    (text: string) => {
      if (isTitleAudioActive) {
        stopSentenceAudio();
        setIsTitleAudioActive(false);
        setIsNarrating(false);
        return;
      }

      setIsTitleAudioActive(true);
      void playSentenceAudio(text, '', () => setIsTitleAudioActive(false));
    },
    [isTitleAudioActive],
  );
  const toggleNewsStoryAudio = useCallback(
    (text: string, partIndex: number) => {
      if (activeNewsStoryAudioPart === partIndex) {
        stopSentenceAudio();
        setActiveNewsStoryAudioPart(null);
        setIsNarrating(false);
        return;
      }

      setActiveNewsStoryAudioPart(partIndex);
      void playSentenceAudio(text, '', () => setActiveNewsStoryAudioPart(null));
    },
    [activeNewsStoryAudioPart],
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safeArea, { backgroundColor: appTheme.colors.background }]}>
      <View style={styles.root}>
        {!isContextModule && !isNewsModule ? (
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={[styles.kicker, { color: appTheme.colors.muted }]}>Word Gym</Text>
              <Text style={[styles.title, { color: appTheme.colors.text }]}>{module.title}</Text>
            </View>
            <View style={[styles.wordPill, { backgroundColor: appTheme.colors.primarySoft }]}>
              <Text style={[styles.wordPillText, { color: appTheme.colors.primary }]}>{round.targetWord}</Text>
            </View>
          </View>
        ) : null}

        <ExerciseTopBar
          current={displayedProgressCurrent}
          total={displayedProgressTotal}
          showLabel={!usesCompactProgress}
          onExit={finishModule}
        />

        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isContextModule ? (
            <ContextSceneCard
              round={round}
              titleAudioActive={isTitleAudioActive}
              onTitleAudioToggle={toggleTitleAudio}
            />
          ) : null}

          {isNewsModule ? (
            <TheNewsRound
              round={round}
              visibleStoryPartCount={visibleNewsStoryPartCount}
              showQuestion={showNewsQuestion}
              selectedChoiceId={selectedChoiceId}
              onChoose={choose}
              onStoryAudioStart={handleNewsStoryAudioStart}
              onStoryAudioEnd={handleNewsStoryAudioEnd}
              onStoryTypingStart={handleNewsStoryTypingStart}
              onStoryTypingEnd={handleNewsStoryTypingEnd}
              titleAudioActive={isTitleAudioActive}
              activeStoryAudioPart={activeNewsStoryAudioPart}
              rejectedChoiceIds={rejectedChoicesForRound}
              onTitleAudioToggle={toggleTitleAudio}
              onStoryAudioToggle={toggleNewsStoryAudio}
            />
          ) : null}

          {dialogueBased ? (
            <Pressable
              accessibilityRole="button"
              onPress={isContextModule ? undefined : advanceDialogue}
              style={styles.dialogueTapArea}
            >
              <DialogueScene
                lines={dialogueLines}
                visibleCount={visibleDialogueTotal}
                highlightTerms={isContextModule ? [round.targetWord] : []}
                onLineAudioStart={isContextModule ? handleContextAudioStart : undefined}
                onLineAudioEnd={isContextModule ? handleContextAudioEnd : undefined}
              />
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

          {!dialogueBased && moduleType !== 'speak' && !isContextModule && !isNewsModule ? (
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

          {dialogueBased && allDialogueVisible && hasChoices && showQuestion ? (
            <View style={isContextModule ? styles.contextQuestionBlock : styles.questionBlock}>
              <Text style={[isContextModule ? styles.contextPrompt : styles.prompt, { color: appTheme.colors.text }]}>
                {round.prompt}
              </Text>
            </View>
          ) : null}

          {allDialogueVisible && showContextQuestion && round.choices && isContextModule ? (
            <ContextChoiceExercise
              choices={round.choices}
              selectedChoiceId={selectedChoiceId}
              rejectedChoiceIds={rejectedChoicesForRound}
              onChoose={choose}
            />
          ) : null}

          {allDialogueVisible && round.choices && !isContextModule && !isNewsModule ? (
            <ChoiceExercise
              choices={round.choices}
              selectedChoiceId={selectedChoiceId}
              correctChoiceId={round.correctChoiceId}
              onChoose={choose}
            />
          ) : null}

          {answered && feedback && !isNewsModule && !isContextModule ? (
            <View style={[styles.feedback, { backgroundColor: appTheme.colors.primarySoft }]}>
              <Text
                style={[
                  isContextModule ? styles.contextFeedbackText : styles.feedbackText,
                  { color: appTheme.colors.primary },
                ]}
              >
                {feedback}
              </Text>
            </View>
          ) : null}

        </ScrollView>

        <View
          style={[
            isContextModule || isNewsModule ? styles.contextBottomAction : styles.bottomAction,
            (isContextModule || isNewsModule) && answered
              ? [
                  styles.contextBottomActionAnswered,
                  { backgroundColor: selectedCorrect ? appTheme.colors.playfulMint : appTheme.colors.dangerSoft },
                ]
              : null,
          ]}
        >
          {isContextModule && (!allDialogueVisible || !showContextQuestion) ? (
            <AppButton
              title="Next"
              onPress={advanceDialogue}
              disabled={isNarrating}
              icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
            />
          ) : null}

          {isContextModule && answered && !isLastRound ? (
            <SuccessActionPanel>
              <View style={styles.stackedActionButtons}>
                <AppButton title="Another scene" onPress={goNext} />
                <AppButton title="Back to gym" variant="secondary" onPress={finishModule} />
              </View>
            </SuccessActionPanel>
          ) : null}

          {isContextModule && answered && isLastRound ? (
            <SuccessActionPanel>
              <AppButton title="Back to gym" onPress={finishModule} />
            </SuccessActionPanel>
          ) : null}

          {isNewsModule && !showNewsQuestion ? (
            <AppButton
              title="Next"
              onPress={advanceNews}
              disabled={isNarrating || isNewsTyping}
              icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
            />
          ) : null}

          {isNewsModule && showNewsQuestion && answered ? (
            <SuccessActionPanel>
              <View style={styles.stackedActionButtons}>
                <AppButton
                  title={bottomButtonTitle}
                  onPress={goNext}
                  icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
                />
                <AppButton title="Back to gym" variant="secondary" onPress={finishModule} />
              </View>
            </SuccessActionPanel>
          ) : null}

          {!isContextModule && !allDialogueVisible ? (
            <AppButton
              title="Next"
              onPress={advanceDialogue}
              icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
            />
          ) : null}

          {!isContextModule && !isNewsModule && allDialogueVisible ? (
            <AppButton
              title={bottomButtonTitle}
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
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );

  function finishModule() {
    stopSentenceAudio();
    setIsNarrating(false);
    setIsTitleAudioActive(false);
    setActiveNewsStoryAudioPart(null);
    navigation.replace('WordPreview', {
      lesson,
      completedModules: Array.from(new Set([...completedModules, moduleType])),
    });
  }
}

function ContextSceneCard({
  round,
  titleAudioActive,
  onTitleAudioToggle,
}: {
  round: WorkoutRound;
  titleAudioActive: boolean;
  onTitleAudioToggle: (text: string) => void;
}) {
  const appTheme = useTheme();
  const sceneColor = getContextSceneColor(round.sceneType);

  return (
    <View style={styles.contextSceneWrap}>
      <View
        style={[
          styles.contextSceneCard,
          { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
        ]}
      >
        <View style={[styles.contextSceneBackdrop, { backgroundColor: sceneColor }]}>
          <View style={styles.contextAvatars}>
            <Image source={chameleonAvatar} resizeMode="cover" style={[styles.contextAvatarImage, styles.contextAvatarLeft]} />
            <Image source={rayAvatar} resizeMode="cover" style={[styles.contextAvatarImage, styles.contextAvatarRight]} />
          </View>
        </View>
      </View>
      <ModuleAudioTitle
        text={round.sceneTitle ?? 'In context'}
        active={titleAudioActive}
        onToggle={onTitleAudioToggle}
        textStyle={styles.contextSceneTitle}
      />
    </View>
  );
}

function TheNewsRound({
  round,
  visibleStoryPartCount,
  showQuestion,
  selectedChoiceId,
  onChoose,
  onStoryAudioStart,
  onStoryAudioEnd,
  onStoryTypingStart,
  onStoryTypingEnd,
  titleAudioActive,
  activeStoryAudioPart,
  rejectedChoiceIds,
  onTitleAudioToggle,
  onStoryAudioToggle,
}: {
  round: WorkoutRound;
  visibleStoryPartCount: number;
  showQuestion: boolean;
  selectedChoiceId?: string;
  onChoose: (choiceId: string) => void;
  onStoryAudioStart: (partIndex: number) => void;
  onStoryAudioEnd: () => void;
  onStoryTypingStart: () => void;
  onStoryTypingEnd: () => void;
  titleAudioActive: boolean;
  activeStoryAudioPart: number | null;
  rejectedChoiceIds: string[];
  onTitleAudioToggle: (text: string) => void;
  onStoryAudioToggle: (text: string, partIndex: number) => void;
}) {
  const appTheme = useTheme();
  const answered = selectedChoiceId !== undefined;
  const storyParts = getNewsStoryParts(round);
  const proposedAnswer = round.choices?.find((choice) => choice.id === round.correctChoiceId) ?? round.choices?.[0];
  const incorrectAnswer = round.choices?.find((choice) => choice.id !== round.correctChoiceId);
  const proposedAnswerId = proposedAnswer?.id ?? round.correctChoiceId ?? 'yes';
  const incorrectAnswerId = incorrectAnswer?.id ?? 'not-ok';
  const proposedRejected = rejectedChoiceIds.includes(proposedAnswerId);
  const incorrectRejected = rejectedChoiceIds.includes(incorrectAnswerId);

  return (
    <View style={styles.newsWrap}>
      <View style={styles.newsIntro}>
        <View style={[styles.newsIconFrame, { backgroundColor: appTheme.colors.warningSoft }]}>
          <Newspaper size={38} color={appTheme.colors.primary} strokeWidth={2.1} />
        </View>
        <ModuleAudioTitle
          text={round.headline ?? 'The News'}
          active={titleAudioActive}
          onToggle={onTitleAudioToggle}
          textStyle={styles.newsHeadline}
        />
      </View>

      <AnimatedReveal visible={visibleStoryPartCount > 0} duration={420}>
        <View
          style={[
            styles.newsCard,
            { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
          ]}
        >
          {storyParts.slice(0, visibleStoryPartCount).map((storyPart, index) => (
            <View key={`${round.id}-story-${index}`} style={styles.newsStoryRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Play news story part ${index + 1}`}
                onPress={() => {
                  onStoryAudioToggle(storyPart, index);
                }}
                style={({ pressed }) => [styles.newsStoryAudio, pressed ? styles.pressed : null]}
              >
                <Volume2
                  size={19}
                  color={activeStoryAudioPart === index ? appTheme.colors.accent : appTheme.colors.muted}
                  strokeWidth={2.4}
                />
              </Pressable>
              <NewsStoryText
                text={storyPart}
                targetWord={round.targetWord}
                onTypingStart={() => {
                  onStoryTypingStart();
                  onStoryAudioStart(index);
                  void playSentenceAudio(storyPart, '', onStoryAudioEnd);
                }}
                onTypingComplete={onStoryTypingEnd}
              />
            </View>
          ))}
        </View>
      </AnimatedReveal>

      {showQuestion ? (
        <View style={styles.newsQuestionBlock}>
          <Text style={[styles.newsQuestion, { color: appTheme.colors.text }]}>{round.prompt}</Text>
          {proposedAnswer ? (
            <Text style={[styles.newsProposedAnswer, { color: appTheme.colors.text }]}>
              {proposedAnswer.text}
            </Text>
          ) : null}
          <View style={styles.newsBinaryRow}>
            <Pressable
              accessibilityRole="button"
              disabled={answered || proposedRejected}
              onPress={() => onChoose(proposedAnswerId)}
              style={({ pressed }) => [
                styles.newsBinaryButton,
                {
                  backgroundColor: proposedRejected
                    ? appTheme.colors.border
                    : selectedChoiceId === proposedAnswerId
                    ? appTheme.colors.primarySoft
                    : appTheme.colors.surface,
                  borderColor: selectedChoiceId === proposedAnswerId ? appTheme.colors.primarySoft : appTheme.colors.border,
                  opacity: proposedRejected ? 0.62 : 1,
                },
                pressed && !answered && !proposedRejected ? styles.pressed : null,
              ]}
            >
              <Check
                size={24}
                color={selectedChoiceId === proposedAnswerId ? appTheme.colors.primary : appTheme.colors.muted}
                strokeWidth={2.6}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              disabled={answered || incorrectRejected}
              onPress={() => onChoose(incorrectAnswerId)}
              style={({ pressed }) => [
                styles.newsBinaryButton,
                {
                  backgroundColor: incorrectRejected
                    ? appTheme.colors.border
                    : selectedChoiceId === incorrectAnswerId
                    ? appTheme.colors.dangerSoft
                    : appTheme.colors.surface,
                  borderColor: selectedChoiceId === incorrectAnswerId ? appTheme.colors.dangerSoft : appTheme.colors.border,
                  opacity: incorrectRejected ? 0.62 : 1,
                },
                pressed && !answered && !incorrectRejected ? styles.pressed : null,
              ]}
            >
              <X
                size={24}
                color={appTheme.colors.muted}
                strokeWidth={2.6}
              />
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

function TypewriterText({
  text,
  style,
}: {
  text: string;
  style: StyleProp<TextStyle>;
}) {
  const appTheme = useTheme();
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    setVisibleText('');

    let index = 0;
    const intervalId = setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 18);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <View style={styles.typewriterLayer}>
      <Text style={[style, styles.typewriterGhost, { color: appTheme.colors.muted }]}>{text}</Text>
      <Text style={[style, styles.typewriterTyped]}>{visibleText}</Text>
    </View>
  );
}

function ModuleAudioTitle({
  text,
  active,
  onToggle,
  textStyle,
}: {
  text: string;
  active: boolean;
  onToggle: (text: string) => void;
  textStyle: StyleProp<TextStyle>;
}) {
  const appTheme = useTheme();

  return (
    <View style={styles.moduleTitleWrap}>
      <View style={styles.moduleTitleRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Play ${text}`}
          onPress={() => onToggle(text)}
          style={({ pressed }) => [styles.contextTitleAudio, pressed ? styles.pressed : null]}
        >
          <Volume2
            size={18}
            color={active ? appTheme.colors.accent : appTheme.colors.muted}
            strokeWidth={2.4}
          />
        </Pressable>
        <TypewriterText text={text} style={[textStyle, { color: getInkColor(appTheme) }]} />
      </View>
    </View>
  );
}

function NewsStoryText({
  text,
  targetWord,
  onTypingStart,
  onTypingComplete,
}: {
  text: string;
  targetWord: string;
  onTypingStart?: () => void;
  onTypingComplete?: () => void;
}) {
  const appTheme = useTheme();
  const [visibleText, setVisibleText] = useState('');
  const onTypingStartRef = useRef(onTypingStart);
  const onTypingCompleteRef = useRef(onTypingComplete);
  const intervalMs = getNewsTypewriterInterval(text);

  useEffect(() => {
    onTypingStartRef.current = onTypingStart;
    onTypingCompleteRef.current = onTypingComplete;
  }, [onTypingComplete, onTypingStart]);

  useEffect(() => {
    setVisibleText('');
    onTypingStartRef.current?.();

    let index = 0;
    const intervalId = setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(intervalId);
        onTypingCompleteRef.current?.();
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, text]);

  return (
    <View style={styles.newsTextLayer}>
      <HighlightedText
        text={text}
        terms={[targetWord]}
        style={[styles.newsSentence, styles.newsSentenceGhost, { color: appTheme.colors.muted }]}
        highlightStyle={[styles.newsHighlight, { color: appTheme.colors.muted }]}
      />
      <HighlightedText
        text={visibleText}
        terms={[targetWord]}
        style={[styles.newsSentence, styles.newsSentenceTyped, { color: getInkColor(appTheme) }]}
        highlightStyle={[styles.newsHighlight, { color: appTheme.colors.accent }]}
      />
    </View>
  );
}

function getInkColor(appTheme: ReturnType<typeof useTheme>) {
  return appTheme.mode === 'light' ? '#263247' : appTheme.colors.text;
}

function getNewsStoryParts(round: WorkoutRound) {
  const story = round.story?.length ? round.story : [round.content];
  const splitIndex = Math.ceil(story.length / 2);
  return [story.slice(0, splitIndex).join(' '), story.slice(splitIndex).join(' ')].filter(Boolean);
}

function getNewsTypewriterInterval(text: string) {
  const wordCount = Math.max(1, text.trim().split(/\s+/).length);
  const estimatedSpeechMs = Math.max(1_200, (wordCount / 130) * 60_000 - 4_500);
  return Math.max(16, Math.min(95, Math.round(estimatedSpeechMs / Math.max(1, text.length))));
}

function getContextSceneColor(sceneType?: string) {
  if (sceneType === 'doctor') return '#FFF3E6';
  if (sceneType === 'mechanic') return '#EEF6FF';
  if (sceneType === 'kitchen') return '#FFF8DB';
  if (sceneType === 'street') return '#F2F7F3';
  if (sceneType === 'class') return '#F6F0FF';
  return '#FFF3E6';
}

function SuccessActionPanel({ children }: { children: ReactNode }) {
  const appTheme = useTheme();

  return (
    <View style={styles.contextActionStack}>
      <View style={styles.contextBottomFeedbackRow}>
        <Check size={22} color={appTheme.colors.primary} strokeWidth={2.8} />
        <Text style={[styles.contextBottomFeedbackText, { color: appTheme.colors.primary }]}>Excellent!</Text>
      </View>
      {children}
    </View>
  );
}

function ContextChoiceExercise({
  choices,
  selectedChoiceId,
  rejectedChoiceIds,
  onChoose,
}: {
  choices: ChoiceOption[];
  selectedChoiceId?: string;
  rejectedChoiceIds: string[];
  onChoose: (choiceId: string) => void;
}) {
  const appTheme = useTheme();
  const answered = selectedChoiceId !== undefined;

  return (
    <View style={styles.contextOptions}>
      {choices.map((choice) => {
        const selected = selectedChoiceId === choice.id;
        const rejected = rejectedChoiceIds.includes(choice.id);

        return (
          <Pressable
            key={choice.id}
            accessibilityRole="button"
            disabled={answered || rejected}
            onPress={() => onChoose(choice.id)}
            style={({ pressed }) => [
              styles.contextOption,
              { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
              rejected ? { backgroundColor: appTheme.colors.border, opacity: 0.62 } : null,
              selected ? { backgroundColor: appTheme.colors.primarySoft, borderColor: appTheme.colors.primarySoft } : null,
              pressed && !answered && !rejected ? styles.pressed : null,
            ]}
          >
            <Text
              style={[
                styles.contextOptionText,
                {
                  color: rejected
                    ? appTheme.colors.muted
                    : selected
                      ? appTheme.colors.primary
                      : appTheme.colors.text,
                },
              ]}
            >
              {choice.text}
            </Text>
          </Pressable>
        );
      })}
    </View>
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
  contextSceneWrap: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  contextSceneCard: {
    width: '48%',
    maxWidth: 172,
    aspectRatio: 1.74,
    borderRadius: 18,
    padding: 0,
    overflow: 'visible',
  },
  contextSceneBackdrop: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  contextAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  contextAvatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  contextAvatarLeft: {
    marginTop: 20,
    marginLeft: -8,
  },
  contextAvatarRight: {
    marginTop: -20,
    marginRight: -8,
  },
  moduleTitleWrap: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  moduleTitleRow: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    maxWidth: '100%',
  },
  contextTitleAudio: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextSceneTitle: {
    minWidth: 150,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '500',
    textAlign: 'left',
  },
  typewriterLayer: {
    flexShrink: 1,
  },
  typewriterGhost: {
    opacity: 0.68,
  },
  typewriterTyped: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  contextQuestionBlock: {
    marginTop: theme.spacing.xs,
  },
  contextPrompt: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'left',
  },
  contextOptions: {
    gap: theme.spacing.sm,
  },
  contextOption: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  contextOptionText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },
  contextFeedbackText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  contextAgainText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  contextActionRow: {
    gap: theme.spacing.sm,
  },
  stackedActionButtons: {
    gap: theme.spacing.sm,
  },
  contextActionStack: {
    gap: theme.spacing.sm,
  },
  contextBottomFeedbackRow: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing.xs,
  },
  contextBottomFeedbackText: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    textAlign: 'left',
  },
  newsWrap: {
    gap: theme.spacing.md,
  },
  newsIntro: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
  },
  newsIconFrame: {
    width: 112,
    height: 78,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsCard: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  newsStoryAudio: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
  },
  newsStoryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  newsHeadline: {
    minWidth: 230,
    flexShrink: 1,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '500',
    textAlign: 'left',
  },
  newsStory: {
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
  },
  newsSentence: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  newsTextLayer: {
    flex: 1,
  },
  newsSentenceGhost: {
    opacity: 0.78,
  },
  newsSentenceTyped: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  newsHighlight: {
    fontWeight: '400',
  },
  newsQuestionBlock: {
    gap: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  newsQuestion: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
  },
  newsProposedAnswer: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  newsBinaryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  newsBinaryButton: {
    flex: 1,
    height: 62,
    maxWidth: 108,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsFeedback: {
    minHeight: 48,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  newsFeedbackText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
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
    paddingBottom: theme.spacing.xl + 20,
  },
  contextBottomAction: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xl + 20,
  },
  contextBottomActionAnswered: {
    marginHorizontal: -theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl + 20,
  },
  pressed: {
    opacity: 0.78,
  },
});
