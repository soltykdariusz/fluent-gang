import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WordPreview'>;

export function WordPreviewScreen({ navigation, route }: Props) {
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const { selectedWords, sessionSize } = route.params;

  return (
    <Screen>
      <StepHeader
        title="Ready to start?"
        subtitle="Your words are set. Quick meanings are optional rescue tools."
      />
      {selectedWords.map((word) => (
        <View key={word.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.word}>{word.text}</Text>
              <Text style={styles.status}>{word.discoveryStatus === 'recognized' ? 'Reinforcement' : 'New for lesson'}</Text>
            </View>
            <View style={styles.audioCircle}>
              <Volume2 size={18} color={theme.colors.primary} strokeWidth={2.2} />
            </View>
          </View>
          {expandedHints[word.id] ? (
            <Text style={styles.definition}>{word.definition ?? `A quick meaning for "${word.text}".`}</Text>
          ) : null}
            <AppButton
              title={expandedHints[word.id] ? 'Hide quick meaning' : 'Quick meaning'}
              onPress={() =>
                setExpandedHints({
                  ...expandedHints,
                  [word.id]: !expandedHints[word.id],
                })
              }
              variant="secondary"
            />
        </View>
      ))}
      <AppButton
        title="Start workout"
        onPress={() => navigation.navigate('AdGate', { selectedWords, sessionSize, mode: 'standardContext' })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  word: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  status: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  audioCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  definition: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '700',
  },
  example: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
