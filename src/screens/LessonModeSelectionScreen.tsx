import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dumbbell, Newspaper, Sparkles, Trophy } from 'lucide-react-native';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { lessonModes } from '../constants/lessonModes';
import { theme } from '../theme/theme';
import { LessonMode } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LessonModeSelection'>;

export function LessonModeSelectionScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const iconByMode: Record<LessonMode, ReactNode> = {
    news: <Newspaper size={20} color={theme.colors.primary} strokeWidth={2.1} />,
    sport: <Trophy size={20} color={theme.colors.primary} strokeWidth={2.1} />,
    lifestyle: <Sparkles size={20} color={theme.colors.primary} strokeWidth={2.1} />,
    superMemory: <Dumbbell size={20} color={theme.colors.primary} strokeWidth={2.1} />,
  };

  return (
    <Screen>
      <StepHeader title={t('lessonMode')} subtitle="Choose the content style for these five words." />
      {lessonModes.map((mode) => (
        <OptionCard
          key={mode.mode}
          title={mode.title}
          subtitle={mode.description}
          icon={iconByMode[mode.mode]}
          onPress={() =>
            navigation.navigate('AdGate', {
              selectedWords: route.params.selectedWords,
              mode: mode.mode,
            })
          }
        />
      ))}
    </Screen>
  );
}
