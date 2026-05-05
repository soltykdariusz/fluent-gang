import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { GuideMascot } from '../components/GuideMascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export function AuthScreen({ navigation }: Props) {
  const setAuthenticated = useAppStore((state) => state.setAuthenticated);
  const isOnboardingComplete = useAppStore((state) => state.isOnboardingComplete);

  const continueMock = () => {
    setAuthenticated(true);
    navigation.replace(isOnboardingComplete ? 'Home' : 'Welcome');
  };

  return (
    <Screen>
      <StepHeader title="Welcome to Fluent Gang" subtitle="Sign in later with Supabase. For MVP, continue with a mock account." />
      <GuideMascot message="Ready for today’s words? Let’s grow your active vocabulary." />
      <AppButton title="Login placeholder" onPress={continueMock} />
      <AppButton title="Sign up placeholder" onPress={continueMock} variant="secondary" />
    </Screen>
  );
}
