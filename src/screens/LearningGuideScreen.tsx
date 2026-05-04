import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpenCheck, Clock3, RotateCcw, Volume2 } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LearningGuide'>;

const guideItems = [
  {
    icon: <Clock3 size={20} color={theme.colors.primary} strokeWidth={2.2} />,
    title: 'Focus first',
    copy: 'Set a small session and keep moving. Short focused work beats chaotic long sessions.',
  },
  {
    icon: <BookOpenCheck size={20} color={theme.colors.primary} strokeWidth={2.2} />,
    title: 'Learn in context',
    copy: 'Read the whole story before judging a word. Meaning sticks better inside a scene.',
  },
  {
    icon: <Volume2 size={20} color={theme.colors.primary} strokeWidth={2.2} />,
    title: 'Say it out loud',
    copy: 'Shadowing turns passive recognition into active language.',
  },
  {
    icon: <RotateCcw size={20} color={theme.colors.primary} strokeWidth={2.2} />,
    title: 'Return later',
    copy: 'Reviews make the word stronger after your brain starts to forget it.',
  },
];

export function LearningGuideScreen({ navigation }: Props) {
  return (
    <Screen>
      <StepHeader title="You will be fluent" subtitle="A simple learning rhythm for Fluent Gang." />
      {guideItems.map((item) => (
        <View key={item.title} style={styles.item}>
          <View style={styles.iconWrap}>{item.icon}</View>
          <View style={styles.copy}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.copy}</Text>
          </View>
        </View>
      ))}
      <AppButton title="Back home" onPress={() => navigation.navigate('Home')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  text: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
