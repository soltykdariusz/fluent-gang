import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { AppButton } from '../components/AppButton';
import { GuideMascot } from '../components/GuideMascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WeeklySummary'>;

export function WeeklySummaryScreen({ navigation }: Props) {
  const preferredSessionSize = useAppStore((state) => state.preferredSessionSize);
  const weeklyWords = preferredSessionSize * 7;

  return (
    <Screen>
      <StepHeader title="Your first week" subtitle={`One ${preferredSessionSize}-word session a day can create ${weeklyWords} first exposures in a week.`} />
      <GuideMascot message="You can do one session, many sessions, or only reviews. The workout size stays flexible." />
      <Text>New words are only the start. Reviews rescue them before they fade.</Text>
      <AppButton title="Continue" onPress={() => navigation.navigate('FreeOrPremium')} />
    </Screen>
  );
}
