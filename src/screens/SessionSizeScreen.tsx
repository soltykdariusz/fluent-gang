import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Zap, Dumbbell, Flame } from 'lucide-react-native';
import { ReactNode } from 'react';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { SessionSize } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SessionSize'>;

const options: Array<{
  size: SessionSize;
  title: string;
  subtitle: string;
  icon: ReactNode;
}> = [
  {
    size: 3,
    title: 'Quick workout',
    subtitle: '3 words. Fast rescue, low friction.',
    icon: <Zap size={20} color={theme.colors.primary} strokeWidth={2.2} />,
  },
  {
    size: 5,
    title: 'Standard workout',
    subtitle: '5 words. Recommended default.',
    icon: <Dumbbell size={20} color={theme.colors.primary} strokeWidth={2.2} />,
  },
  {
    size: 8,
    title: 'Deep workout',
    subtitle: '8 words. More focus, more activation.',
    icon: <Flame size={20} color={theme.colors.primary} strokeWidth={2.2} />,
  },
];

export function SessionSizeScreen({ navigation }: Props) {
  return (
    <Screen>
      <StepHeader
        title="Choose your workout size"
        subtitle="A session can be quick, standard, or deep. You can do one, many, or only reviews."
      />
      {options.map((option) => (
        <OptionCard
          key={option.size}
          title={option.title}
          subtitle={option.subtitle}
          icon={option.icon}
          selected={option.size === 5}
          onPress={() => navigation.navigate('VocabularySelection', { sessionSize: option.size })}
        />
      ))}
    </Screen>
  );
}
