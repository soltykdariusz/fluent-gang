import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

export function ReviewScreen({ navigation }: Props) {
  const { t } = useTranslation();
  return (
    <Screen>
      <StepHeader title={t('review')} subtitle="Spaced repetition queue placeholder." />
      <Text>Future reviews will be scheduled from user_word_progress using forgetting-curve intervals.</Text>
      <AppButton title="Back home" onPress={() => navigation.navigate('Home')} />
    </Screen>
  );
}
