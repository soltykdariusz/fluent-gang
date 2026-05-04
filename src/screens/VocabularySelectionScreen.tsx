import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { getProposedWords, createCustomWord } from '../services/vocabularyService';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { Word } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VocabularySelection'>;

export function VocabularySelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { targetLanguage, level } = useAppStore();
  const proposed = useMemo(() => getProposedWords(targetLanguage, level), [targetLanguage, level]);
  const [selectedWords, setSelectedWords] = useState<Word[]>(proposed);
  const [customWord, setCustomWord] = useState('');

  const toggleWord = (word: Word) => {
    const exists = selectedWords.some((selected) => selected.id === word.id);
    if (exists) {
      setSelectedWords(selectedWords.filter((selected) => selected.id !== word.id));
      return;
    }
    if (selectedWords.length < 5) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const addCustomWord = () => {
    if (!customWord.trim() || selectedWords.length >= 5) return;
    setSelectedWords([...selectedWords, createCustomWord(customWord, targetLanguage, level)]);
    setCustomWord('');
  };

  return (
    <Screen>
      <StepHeader title={t('chooseWords')} subtitle={`${selectedWords.length}/5 selected. Accept the proposal, replace words, or add your own.`} />
      {proposed.map((word) => (
        <OptionCard
          key={word.id}
          title={word.text}
          subtitle={word.translation}
          selected={selectedWords.some((selected) => selected.id === word.id)}
          onPress={() => toggleWord(word)}
        />
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
        <AppButton title="Add" onPress={addCustomWord} disabled={selectedWords.length >= 5} />
      </View>
      <AppButton
        title={t('continue')}
        onPress={() => navigation.navigate('LessonModeSelection', { selectedWords })}
        disabled={selectedWords.length !== 5}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  customRow: {
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
});
