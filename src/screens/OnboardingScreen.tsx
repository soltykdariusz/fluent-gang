import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { GuideMascot } from '../components/GuideMascot';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <Screen>
      <StepHeader title={t('onboardingTitle')} subtitle="Choose the basics now. You can change them later in Settings." />
      <GuideMascot message="You’re not starting a course. You’re setting up your vocabulary workout." />
      <AppButton title={t('interfaceLanguage')} onPress={() => navigation.navigate('InterfaceLanguage')} />
      <AppButton title={t('nativeLanguage')} onPress={() => navigation.navigate('NativeLanguage')} variant="secondary" />
      <AppButton title={t('targetLanguage')} onPress={() => navigation.navigate('TargetLanguage')} variant="secondary" />
      <AppButton title={t('level')} onPress={() => navigation.navigate('LevelSelection')} variant="secondary" />
      <AppButton title="Interests" onPress={() => navigation.navigate('InterestSelection')} variant="secondary" />
      <AppButton title={t('continue')} onPress={() => navigation.navigate('InterestSelection')} />
    </Screen>
  );
}
