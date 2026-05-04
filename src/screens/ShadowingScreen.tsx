import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, Gauge, Subtitles } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { saveLessonResult } from '../services/progressService';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Shadowing'>;

export function ShadowingScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { lesson } = route.params;
  const addLessonResult = useAppStore((state) => state.addLessonResult);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [speed, setSpeed] = useState(1);

  const finishLesson = async () => {
    const result = {
      lessonId: lesson.id,
      completedAt: new Date().toISOString(),
      contextScore: lesson.contextQuiz.length,
      definitionScore: lesson.definitionQuiz.length,
      practicedWordIds: lesson.words.map((word) => word.id),
      durationSeconds: 600,
    };
    addLessonResult(result);
    await saveLessonResult(result);
    navigation.navigate('Home');
  };

  return (
    <Screen>
      <StepHeader title={t('shadowing')} subtitle="Prepared for playback speed, subtitles, recording, and pronunciation feedback." />
      <View style={styles.controls}>
        <View style={styles.labelRow}>
          <Subtitles size={18} color={theme.colors.primary} strokeWidth={2.2} />
          <Text style={styles.label}>Subtitles</Text>
        </View>
        <Switch value={showSubtitles} onValueChange={setShowSubtitles} />
      </View>
      <View style={styles.speedRow}>
        {[0.75, 1, 1.25].map((value) => (
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
          <HighlightedText
            text={lesson.shadowingText}
            terms={lesson.words.map((word) => word.text)}
            style={styles.script}
            highlightStyle={styles.highlight}
          />
        </View>
      ) : null}
      <AppButton
        title={t('saveProgress')}
        onPress={finishLesson}
        icon={<CheckCircle2 size={18} color={theme.colors.surface} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  controls: {
    minHeight: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
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
  script: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 32,
  },
  scriptPanel: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  highlight: {
    color: theme.colors.primary,
    fontWeight: '900',
  },
});
