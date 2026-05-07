import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Lightbulb } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { QuizProgress } from '../components/QuizProgress';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ReadingLesson'>;

export function ReadingLessonScreen({ navigation, route }: Props) {
  const { lesson, completedModules = [] } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const sentence = lesson.contextSentences[currentIndex];
  const isLastSentence = currentIndex === lesson.contextSentences.length - 1;

  const continueFlow = () => {
    setHintVisible(false);
    if (!isLastSentence) {
      setCurrentIndex((value) => value + 1);
      return;
    }
    navigation.replace('WordPreview', {
      lesson,
      completedModules: Array.from(new Set([...completedModules, 'read'])),
    });
  };

  return (
    <Screen>
      <Text style={styles.instruction}>Read this sentence.</Text>
      <QuizProgress current={currentIndex + 1} total={lesson.contextSentences.length} />
      <View style={styles.panel}>
        <Text style={styles.count}>Word {currentIndex + 1}/{lesson.contextSentences.length}</Text>
        <HighlightedText
          text={sentence.sentence}
          terms={[sentence.targetWord]}
          style={styles.text}
          highlightStyle={styles.highlight}
        />
        {hintVisible ? (
          <View style={styles.hintRow}>
            <Lightbulb size={16} color={theme.colors.primary} strokeWidth={2.2} />
            <Text style={styles.hint}>{sentence.hint}</Text>
          </View>
        ) : null}
      </View>
      <AppButton
        title={hintVisible ? 'Hide hint' : 'Show hint'}
        onPress={() => setHintVisible((value) => !value)}
        variant="secondary"
        icon={<Lightbulb size={17} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title={isLastSentence ? 'Continue to True/False' : 'I understand'}
        onPress={continueFlow}
        icon={<ChevronRight size={18} color={theme.colors.surface} strokeWidth={2.2} />}
      />
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
  panel: {
    gap: theme.spacing.md,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  count: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
  text: {
    color: theme.colors.text,
    fontSize: 25,
    lineHeight: 36,
    fontWeight: '800',
  },
  highlight: {
    fontWeight: '900',
    color: theme.colors.primary,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.sm,
  },
  hint: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
});
