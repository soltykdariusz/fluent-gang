import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { createCustomWord } from '../services/vocabularyService';
import { selectWordsForVocabularyGrowth } from '../services/wordSelectionService';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { SelectedWord, Word, WordDiscoveryStatus } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VocabularySelection'>;

export function VocabularySelectionScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { targetLanguage, level, selectedInterests } = useAppStore();
  const sessionSize = route.params?.sessionSize ?? 5;
  const proposedScores = useMemo(
    () =>
      selectWordsForVocabularyGrowth({
        language: targetLanguage,
        level,
        interests: selectedInterests,
        limit: Math.max(sessionSize + 3, 8),
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
      <StepHeader title="Word proposal" subtitle={`${selectedWords.length}/${sessionSize} selected. Definitions are rescue tools, not the lesson.`} />
      {availableWords.map((word) => (
        <View key={word.id} style={styles.wordCard}>
          <OptionCard
            title={word.text}
            subtitle={proposedScores.find((item) => item.word.id === word.id)?.reasons.join(' · ') || word.level}
            selected={(wordStatuses[word.id] ?? 'new') !== 'known'}
            onPress={() => setWordStatus(word, 'new')}
          />
          <View style={styles.statusRow}>
            <AppButton title="Learn" onPress={() => setWordStatus(word, 'new')} variant={(wordStatuses[word.id] ?? 'new') === 'new' ? 'primary' : 'secondary'} />
            <AppButton title="Known" onPress={() => setWordStatus(word, 'known')} variant={(wordStatuses[word.id] ?? 'new') === 'known' ? 'primary' : 'secondary'} />
            <AppButton title="Reinforce" onPress={() => setWordStatus(word, 'recognized')} variant={(wordStatuses[word.id] ?? 'new') === 'recognized' ? 'primary' : 'secondary'} />
          </View>
          {visibleHints[word.id] ? (
            <Text style={styles.hint}>Hint: {word.definition ?? `A quick meaning for "${word.text}" will be generated.`}</Text>
          ) : null}
          <AppButton title="Replace" onPress={() => setWordStatus(word, 'known')} variant="secondary" />
          <AppButton
            title={visibleHints[word.id] ? 'Hide hint' : 'Hint'}
            onPress={() => setVisibleHints({ ...visibleHints, [word.id]: !visibleHints[word.id] })}
            variant="secondary"
          />
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
    gap: theme.spacing.sm,
  },
  statusRow: {
    gap: theme.spacing.sm,
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
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
});
