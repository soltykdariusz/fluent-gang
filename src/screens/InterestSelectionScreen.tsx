import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { interests } from '../constants/interests';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'InterestSelection'>;

export function InterestSelectionScreen({ navigation }: Props) {
  const selectedInterests = useAppStore((state) => state.selectedInterests);
  const toggleInterest = useAppStore((state) => state.toggleInterest);

  return (
    <Screen>
      <StepHeader
        title="Interests"
        subtitle="Choose topics that should shape your vocabulary contexts."
      />
      {interests.map((interest) => (
        <OptionCard
          key={interest.code}
          title={interest.label}
          subtitle={interest.description}
          selected={selectedInterests.includes(interest.code)}
          onPress={() => toggleInterest(interest.code)}
        />
      ))}
      <AppButton
        title="Continue"
        onPress={() => navigation.navigate('VocabularyGoalSelection')}
        disabled={selectedInterests.length === 0}
      />
    </Screen>
  );
}
