import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Volume2 } from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { saveLessonResult } from '../services/progressService';
import { getShadowingPracticeItems } from '../services/shadowingService';
import { playSentenceAudio, playWordAudio } from '../services/soundService';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Shadowing'>;
type ShadowingPhase = 'word' | 'sentence';

export function ShadowingScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { lesson, contextSummary, definitionSummary, completedModules = [] } = route.params;
  const addLessonResult = useAppStore((state) => state.addLessonResult);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<ShadowingPhase>('word');
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const practiceItems = useMemo(() => getShadowingPracticeItems(lesson), [lesson]);
  const currentItem = practiceItems[currentIndex];
  const currentSentence = currentItem?.sentences[sentenceIndex];
  const visibleSentences = currentItem?.sentences.slice(0, sentenceIndex + 1) ?? [];
  const isLastWord = currentIndex === practiceItems.length - 1;
  const isLastSentence = sentenceIndex === (currentItem?.sentences.length ?? 1) - 1;

  useEffect(() => {
    if (!currentItem || phase !== 'word') {
      return;
    }

    void playWordAudio(currentItem);
  }, [currentItem, phase]);

  useEffect(() => {
    if (!currentItem || !currentSentence || phase !== 'sentence') {
      return;
    }

    void playSentenceAudio(currentSentence, currentItem.targetWord);
  }, [currentItem, currentSentence, phase]);

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
    navigation.replace('WordPreview', {
      lesson,
      completedModules: Array.from(new Set([...completedModules, 'speak'])),
    });
  };

  const goNext = () => {
    if (!currentItem) {
      void finishLesson();
      return;
    }

    if (phase === 'word') {
      setSentenceIndex(0);
      setPhase('sentence');
      return;
    }

    if (!isLastSentence) {
      setSentenceIndex((value) => value + 1);
      return;
    }

    if (!isLastWord) {
      setCurrentIndex((value) => value + 1);
      setSentenceIndex(0);
      setPhase('word');
      return;
    }

    void finishLesson();
  };

  return (
    <Screen scroll={false}>
      <View style={styles.main}>
        <View style={styles.mascotWrap}>
          <Mascot state="idle" size={124} />
        </View>

        <View style={styles.wordWrap}>
          <View style={styles.wordRow}>
            <Text style={[styles.word, { color: appTheme.colors.text }]}>{currentItem?.targetWord ?? 'Ready'}</Text>
            {currentItem && phase === 'word' ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Play ${currentItem.targetWord}`}
                onPress={() => {
                  void playWordAudio(currentItem);
                }}
                style={({ pressed }) => [
                  styles.audioButton,
                  { backgroundColor: appTheme.colors.primarySoft },
                  pressed ? styles.pressed : null,
                ]}
              >
                <Volume2 size={30} color={appTheme.colors.primary} strokeWidth={2.5} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {phase === 'sentence' && currentItem && currentSentence ? (
          <View style={styles.practiceWrap}>
            <Text style={[styles.repeatHint, { color: appTheme.colors.muted }]}>Repeat out loud</Text>
            {visibleSentences.map((sentence, index) => (
              <SentencePrompt
                key={`${currentItem.wordId}-${index}-${sentence}`}
                sentence={sentence}
                targetWord={currentItem.targetWord}
              />
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.continueWrap}>
        <AppButton
          title="Continue"
          onPress={goNext}
          icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
        />
      </View>
    </Screen>
  );
}

function SentencePrompt({ sentence, targetWord }: { sentence: string; targetWord: string }) {
  const appTheme = useTheme();
  const reveal = useRef(new Animated.Value(0)).current;
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    reveal.setValue(0);
    Animated.timing(reveal, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [reveal, sentence]);

  useEffect(() => {
    setVisibleText('');
    let index = 0;
    const intervalId = setInterval(() => {
      index += 1;
      setVisibleText(sentence.slice(0, index));
      if (index >= sentence.length) {
        clearInterval(intervalId);
      }
    }, 22);

    return () => clearInterval(intervalId);
  }, [sentence]);

  return (
    <Animated.View
      style={[
        styles.promptRow,
        {
          opacity: reveal,
          transform: [
            {
              translateY: reveal.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Mascot state="encourage" size={44} />
      <View style={[styles.speechWrap, { backgroundColor: theme.colors.surface, borderColor: appTheme.colors.border }]}>
        <View style={[styles.speechTail, { backgroundColor: theme.colors.surface, borderColor: appTheme.colors.border }]} />
        <View style={styles.sentenceRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Play sentence ${sentence}`}
            onPress={() => {
              void playSentenceAudio(sentence, targetWord);
            }}
            style={({ pressed }) => [styles.sentenceAudioButton, pressed ? styles.pressed : null]}
          >
            <Volume2 size={18} color={appTheme.colors.primary} strokeWidth={2.4} />
          </Pressable>
          <HighlightedText
            text={visibleText}
            terms={[targetWord]}
            style={[styles.sentence, { color: appTheme.colors.text }]}
            highlightStyle={[styles.sentenceHighlight, { color: appTheme.colors.primary }]}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.spacing.md,
  },
  mascotWrap: {
    alignItems: 'center',
    minHeight: 136,
  },
  wordWrap: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  wordRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  word: {
    fontSize: 42,
    lineHeight: 50,
    fontWeight: '400',
  },
  audioButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
  practiceWrap: {
    width: '100%',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  repeatHint: {
    paddingLeft: 54,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
  },
  promptRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  speechWrap: {
    alignSelf: 'flex-start',
    maxWidth: '78%',
    minHeight: 54,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  sentenceAudioButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTail: {
    position: 'absolute',
    left: -6,
    top: 21,
    width: 12,
    height: 12,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  sentence: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
  },
  sentenceHighlight: {
    fontWeight: '400',
  },
  continueWrap: {
    marginTop: 'auto',
    marginBottom: -72,
  },
});
