import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpenText, Brain } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import mockWorkoutWords from '../data/mockWorkoutWords.json';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { SelectedWord } from '../types/lesson';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { focusRunning } = useAppStore();
  const workoutWord = mockWorkoutWords[0] as SelectedWord;

  return (
    <Screen>
      <View style={styles.heroScene}>
        <Mascot
          state="idle"
          message={focusRunning ? 'Good. Stay with the words. One clean sentence at a time.' : 'Hey. Start a short focus sprint, then rescue a few words.'}
          size={74}
        />
      </View>
      <AppButton
        title="Start workout"
        onPress={() => navigation.navigate('WordPreview', { selectedWords: [workoutWord], sessionSize: 1 })}
        icon={<BookOpenText size={19} color={theme.colors.surface} strokeWidth={2.2} />}
      />
      <AppButton
        title="Review words to rescue"
        onPress={() => navigation.navigate('Review')}
        variant="secondary"
        icon={<Brain size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroScene: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
});
