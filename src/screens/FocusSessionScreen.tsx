import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pause, Play, RotateCcw } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FocusSession'>;

export function FocusSessionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const {
    focusTargetSeconds,
    focusRemainingSeconds,
    focusRunning,
    setFocusTargetMinutes,
    startFocusSession,
    pauseFocusSession,
    resetFocusSession,
  } = useAppStore();
  const selectedMinutes = Math.floor(focusTargetSeconds / 60);

  return (
    <Screen>
      <StepHeader title={t('focus')} subtitle="Set a learning sprint. The countdown stays visible at the bottom while you move through lessons." />
      <Text style={styles.timer}>{Math.floor(focusRemainingSeconds / 60)}:{String(focusRemainingSeconds % 60).padStart(2, '0')}</Text>
      <View style={styles.options}>
        {[10, 15, 25, 45].map((minutes) => (
          <AppButton
            key={minutes}
            title={`${minutes} min`}
            onPress={() => setFocusTargetMinutes(minutes)}
            variant={selectedMinutes === minutes ? 'primary' : 'secondary'}
          />
        ))}
      </View>
      <AppButton
        title={focusRunning ? 'Pause timer' : 'Start timer'}
        onPress={focusRunning ? pauseFocusSession : startFocusSession}
        icon={
          focusRunning ? (
            <Pause size={18} color={theme.colors.surface} strokeWidth={2.2} />
          ) : (
            <Play size={18} color={theme.colors.surface} strokeWidth={2.2} />
          )
        }
      />
      <AppButton
        title="Reset timer"
        onPress={resetFocusSession}
        variant="secondary"
        icon={<RotateCcw size={18} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton title="Back home" onPress={() => navigation.navigate('Home')} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  timer: {
    color: theme.colors.text,
    fontSize: 56,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: theme.spacing.xl,
  },
  options: {
    gap: theme.spacing.sm,
  },
});
