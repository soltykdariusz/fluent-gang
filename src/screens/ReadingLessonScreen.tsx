import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { HighlightedText } from '../components/HighlightedText';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ReadingLesson'>;

export function ReadingLessonScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { lesson } = route.params;

  return (
    <Screen>
      <StepHeader title={lesson.title} subtitle={`${t('reading')} / listening placeholder`} />
      <View style={styles.panel}>
        <HighlightedText
          text={lesson.readingText}
          terms={lesson.words.map((word) => word.text)}
          style={styles.text}
          highlightStyle={styles.highlight}
        />
      </View>
      <AppButton title="Play audio placeholder" onPress={() => undefined} variant="secondary" />
      <AppButton title={t('contextQuiz')} onPress={() => navigation.navigate('ContextQuiz', { lesson })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  text: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 28,
  },
  highlight: {
    fontWeight: '900',
    color: theme.colors.primary,
  },
});
