import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { GuideMascot } from '../components/GuideMascot';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyWordGoal'>;

const goals = [
  { value: 3, title: 'Quick workout', subtitle: '3 words per session' },
  { value: 5, title: 'Standard workout', subtitle: '5 words per session. Recommended.' },
  { value: 8, title: 'Deep workout', subtitle: '8 words per session' },
];

export function DailyWordGoalScreen({ navigation }: Props) {
  const preferredSessionSize = useAppStore((state) => state.preferredSessionSize);
  const setPreferredSessionSize = useAppStore((state) => state.setPreferredSessionSize);

  return (
    <Screen>
      <StepHeader title="Preferred workout size" subtitle="How many words do you usually want in one session?" />
      <GuideMascot message="Standard workout is 5 words. You can still choose 3, 5, or 8 before each session." />
      {goals.map((goal) => (
        <OptionCard
          key={goal.value}
          title={goal.title}
          subtitle={goal.subtitle}
          selected={preferredSessionSize === goal.value}
          onPress={() => setPreferredSessionSize(goal.value)}
        />
      ))}
      <AppButton title="Continue" onPress={() => navigation.navigate('ReminderPermission')} />
    </Screen>
  );
}
