import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dumbbell, MessageCircle, Sparkles, Wand2 } from 'lucide-react-native';
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
    standardContext: <Wand2 size={20} color={theme.colors.primary} strokeWidth={2.1} />,
    funnyStory: <Sparkles size={20} color={theme.colors.primary} strokeWidth={2.1} />,
    dialogue: <MessageCircle size={20} color={theme.colors.primary} strokeWidth={2.1} />,
    superMemory: <Dumbbell size={20} color={theme.colors.primary} strokeWidth={2.1} />,
  };

  return (
    <Screen>
      <StepHeader title="Context mode" subtitle="Choose how Fluent Gang should build your vocabulary scene." />
      {lessonModes.map((mode) => (
        <OptionCard
          key={mode.mode}
          title={mode.title}
          subtitle={mode.description}
          icon={iconByMode[mode.mode]}
          onPress={() =>
            navigation.navigate('AdGate', {
              selectedWords: route.params.selectedWords,
              sessionSize: route.params.sessionSize,
              mode: mode.mode,
            })
          }
        />
      ))}
    </Screen>
  );
}
