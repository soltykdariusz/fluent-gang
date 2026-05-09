import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { AppButton } from '../components/AppButton';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { createCustomWord } from '../services/vocabularyService';
import { selectWordsForVocabularyGrowth } from '../services/wordSelectionService';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { SelectedWord, Word, WordDiscoveryStatus } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VocabularySelection'>;

export function VocabularySelectionScreen({ navigation, route }: Props) {
  const appTheme = useTheme();
  const { targetLanguage, level, selectedInterests } = useAppStore();
  const sessionSize = route.params?.sessionSize ?? 5;
  const proposedScores = useMemo(
    () =>
      selectWordsForVocabularyGrowth({
        language: targetLanguage,
        level,
        interests: selectedInterests,
        limit: sessionSize === 1 ? 1 : Math.max(sessionSize + 3, 8),
      }),
    [level, selectedInterests, sessionSize, targetLanguage],
  );
  const proposed = proposedScores.map((item) => item.word);
  const [wordStatuses, setWordStatuses] = useState<Record<string, WordDiscoveryStatus>>(
    Object.fromEntries(proposed.map((word) => [word.id, 'new' as WordDiscoveryStatus])),
  );
  const [customWords, setCustomWords] = useState<Word[]>([]);
  const [customWord, setCustomWord] = useState('');
  const [visibleHints, setVisibleHints] = useState<Record<string, boolean>>({});
  const availableWords = [...proposed, ...customWords];
  const selectedWords: SelectedWord[] = availableWords
    .map((word) => ({
      ...word,
      discoveryStatus: wordStatuses[word.id] ?? 'new',
    }))
    .filter((word) => word.discoveryStatus !== 'known')
    .slice(0, sessionSize);

  const setWordStatus = (word: Word, status: WordDiscoveryStatus) => {
    setWordStatuses({ ...wordStatuses, [word.id]: status });
  };

  const addCustomWord = () => {
    if (!customWord.trim()) return;
    const word = createCustomWord(customWord, targetLanguage, level);
    setCustomWords([...customWords, word]);
    setWordStatuses({ ...wordStatuses, [word.id]: 'new' });
    setCustomWord('');
  };

  return (
    <Screen>
      <Mascot
        state="thinking"
        message={`These are my proposals for you. Check if they fit. ${selectedWords.length}/${sessionSize} selected.`}
        size={74}
      />
      {availableWords.map((word) => (
        <View key={word.id} style={[styles.wordCard, { backgroundColor: appTheme.colors.surface }]}>
          <View style={styles.wordHeader}>
            <View style={styles.wordCopy}>
              <Text style={[styles.wordText, { color: appTheme.colors.text }]}>{word.text}</Text>
              <Text style={[styles.wordMeta, { color: appTheme.colors.muted }]}>
                {proposedScores.find((item) => item.word.id === word.id)?.reasons.join(' · ') || word.level}
              </Text>
            </View>
            <Text style={[styles.levelPill, { color: appTheme.colors.primary, backgroundColor: appTheme.colors.primarySoft }]}>
              {word.level}
            </Text>
          </View>
          <View style={[styles.segmented, { backgroundColor: appTheme.colors.background }]}>
            {[
              { label: 'Learn', status: 'new' as WordDiscoveryStatus },
              { label: 'Known', status: 'known' as WordDiscoveryStatus },
              { label: 'Reinforce', status: 'recognized' as WordDiscoveryStatus },
            ].map((item) => {
              const selected = (wordStatuses[word.id] ?? 'new') === item.status;
              return (
                <Pressable
                  key={item.status}
                  accessibilityRole="button"
                  onPress={() => setWordStatus(word, item.status)}
                  style={[styles.segment, selected ? { backgroundColor: appTheme.colors.primary } : null]}
                >
                  <Text style={[styles.segmentText, { color: selected ? appTheme.colors.surface : appTheme.colors.muted }]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <AnimatedReveal visible={Boolean(visibleHints[word.id])}>
            <Text style={[styles.hint, { color: appTheme.colors.text, backgroundColor: appTheme.colors.warningSoft }]}>
              Hint: {word.definition ?? `A quick meaning for "${word.text}" will be generated.`}
            </Text>
          </AnimatedReveal>
          <View style={styles.inlineActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setVisibleHints({ ...visibleHints, [word.id]: !visibleHints[word.id] })}
              style={styles.inlineAction}
            >
              <Text style={[styles.inlineActionText, { color: appTheme.colors.accent }]}>
                {visibleHints[word.id] ? 'Hide hint' : 'Hint'}
              </Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => setWordStatus(word, 'known')} style={styles.inlineAction}>
              <Text style={[styles.inlineActionText, { color: appTheme.colors.muted }]}>Replace</Text>
            </Pressable>
          </View>
        </View>
      ))}
      <View style={styles.customRow}>
        <TextInput
          value={customWord}
          onChangeText={setCustomWord}
          placeholder="Add your own word"
          placeholderTextColor={theme.colors.muted}
          style={styles.input}
          autoCapitalize="none"
        />
        <AppButton title="Add" onPress={addCustomWord} />
      </View>
      <AppButton
        title="Use these words"
        onPress={() => navigation.navigate('WordPreview', { selectedWords, sessionSize })}
        disabled={selectedWords.length !== sessionSize}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  customRow: {
    gap: theme.spacing.sm,
  },
  wordCard: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  wordHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  wordCopy: {
    flex: 1,
    gap: 3,
  },
  wordText: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
  },
  wordMeta: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  levelPill: {
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '900',
  },
  segmented: {
    minHeight: 38,
    borderRadius: 999,
    flexDirection: 'row',
    padding: 3,
  },
  segment: {
    flex: 1,
    minHeight: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '900',
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
  },
  hint: {
    overflow: 'hidden',
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  inlineActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
  },
  inlineAction: {
    paddingVertical: 2,
  },
  inlineActionText: {
    fontSize: 13,
    fontWeight: '900',
  },
});
