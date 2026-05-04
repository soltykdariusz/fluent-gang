import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { levels } from '../constants/languages';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelSelection'>;

export function LevelSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const selected = useAppStore((state) => state.level);
  const setLevel = useAppStore((state) => state.setLevel);

  return (
    <Screen>
      <StepHeader title={t('level')} subtitle="No placement test for MVP. Pick your level and move up or down anytime." />
      {levels.map((level) => (
        <OptionCard
          key={level.code}
          title={level.label}
          subtitle={level.description}
          selected={selected === level.code}
          onPress={() => {
            setLevel(level.code);
            navigation.navigate('Home');
          }}
        />
      ))}
    </Screen>
  );
}
