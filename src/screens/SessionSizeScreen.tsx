import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CircleDot, Dumbbell, Flame, Zap } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Mascot } from '../components/Mascot';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
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
    size: 1,
    title: 'Solo workout',
    subtitle: '1 word. One focused rep.',
    icon: <CircleDot size={20} color={theme.colors.primary} strokeWidth={2.2} />,
  },
  {
    size: 3,
    title: 'Quick workout',
    subtitle: '3 words. Fast and light.',
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
      <Mascot
        state="encourage"
        message="Choose how many words you want in this session. Short is good. Consistent is better."
        size={74}
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
