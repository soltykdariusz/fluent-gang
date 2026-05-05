import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { GuideMascot } from '../components/GuideMascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FreeOrPremium'>;

export function FreeOrPremiumScreen({ navigation }: Props) {
  const setOnboardingComplete = useAppStore((state) => state.setOnboardingComplete);

  const finish = () => {
    setOnboardingComplete(true);
    navigation.replace('Home');
  };

  return (
    <Screen>
      <StepHeader title="Super Fluent Gang" subtitle="Premium will remove friction later. MVP stays open." />
      <GuideMascot message="You’re not memorizing. You’re activating vocabulary." />
      <AppButton title="Learn for free" onPress={finish} />
      <AppButton title="Premium placeholder" onPress={finish} variant="secondary" />
    </Screen>
  );
}
