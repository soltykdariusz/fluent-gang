import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { GuideMascot } from '../components/GuideMascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ReminderPermission'>;

export function ReminderPermissionScreen({ navigation }: Props) {
  const setRemindersEnabled = useAppStore((state) => state.setRemindersEnabled);

  return (
    <Screen>
      <StepHeader title="Let’s build your vocabulary habit together." subtitle="Would you like reminders for your daily word workout?" />
      <GuideMascot message="These words are waiting to be rescued. A gentle reminder can help." />
      <AppButton
        title="Allow reminders"
        onPress={() => {
          setRemindersEnabled(true);
          navigation.navigate('WeeklySummary');
        }}
      />
      <AppButton
        title="Maybe later"
        variant="secondary"
        onPress={() => {
          setRemindersEnabled(false);
          navigation.navigate('WeeklySummary');
        }}
      />
    </Screen>
  );
}
