import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Mascot } from '../components/Mascot';
import { Screen } from '../components/Screen';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutFinish'>;

export function WorkoutFinishScreen({ navigation, route }: Props) {
  const { lesson, completedModules = [] } = route.params;

  return (
    <Screen scroll={false}>
      <View style={styles.content}>
        <Mascot state="celebrate" size={104} />
        <Text style={styles.title}>Nice workout</Text>
        <Text style={styles.subtitle}>How do these words feel now?</Text>
      </View>
      <View style={styles.actions}>
        <AppButton
          title="Rate words"
          onPress={() => navigation.navigate('WorkoutSelfAssessment', { lesson, completedModules })}
          icon={<ChevronRight size={17} color={theme.colors.surface} strokeWidth={2.4} />}
        />
        <AppButton
          title="Not now"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
