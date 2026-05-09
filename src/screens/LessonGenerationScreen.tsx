import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Sparkles } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { generateLesson } from '../services/openaiLessonService';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LessonGeneration'>;

export function LessonGenerationScreen({ navigation, route }: Props) {
  const { targetLanguage, nativeLanguage, level } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateLesson({
      words: route.params.selectedWords,
      mode: route.params.mode,
      targetLanguage,
      nativeLanguage,
      level,
      sessionSize: route.params.sessionSize,
    })
      .then((lesson) => {
        const startModule = route.params.startModule ?? 'context';
        navigation.replace('ModuleRunner', { lesson, module: startModule, completedModules: [] });
      })
      .catch(() => setError('Could not generate lesson. Please try again.'));
  }, [
    level,
    nativeLanguage,
    navigation,
    route.params.mode,
    route.params.selectedWords,
    route.params.sessionSize,
    route.params.startModule,
    targetLanguage,
  ]);

  return (
    <Screen scroll={false}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Sparkles size={34} color={theme.colors.primary} strokeWidth={2.1} />
        </View>
        <StepHeader title="Building your Word Workout" subtitle="Creating one simple context sentence for each word." />
        <Mascot state="thinking" message="I’m building tiny contexts. One word, one clear sentence." />
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  iconCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: theme.spacing.sm,
  },
  error: {
    color: theme.colors.danger,
    fontSize: 15,
  },
});
