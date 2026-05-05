import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { vocabularyGoals } from '../constants/vocabularyGoals';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VocabularyGoalSelection'>;

export function VocabularyGoalSelectionScreen({ navigation }: Props) {
  const vocabularyGoal = useAppStore((state) => state.vocabularyGoal);
  const setVocabularyGoal = useAppStore((state) => state.setVocabularyGoal);

  return (
    <Screen>
      <StepHeader
        title="Vocabulary goal"
        subtitle="Choose what today’s vocabulary workouts should optimize for."
      />
      {vocabularyGoals.map((goal) => (
        <OptionCard
          key={goal.code}
          title={goal.label}
          subtitle={goal.description}
          selected={vocabularyGoal === goal.code}
          onPress={() => setVocabularyGoal(goal.code)}
        />
      ))}
      <AppButton title="Continue" onPress={() => navigation.navigate('DailyWordGoal')} />
    </Screen>
  );
}
