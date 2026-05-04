import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Crown, Sparkles } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AdGate'>;

const DEV_AD_SECONDS = 2;

export function AdGateScreen({ navigation, route }: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(DEV_AD_SECONDS);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      navigation.replace('LessonGeneration', route.params);
      return undefined;
    }

    const timeout = setTimeout(() => {
      setRemainingSeconds((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigation, remainingSeconds, route.params]);

  return (
    <Screen scroll={false}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Sparkles size={34} color={theme.colors.primary} strokeWidth={2.1} />
        </View>
        <StepHeader
          title="Sponsor moment"
          subtitle="Free plan placeholder. In production this becomes a 15-second ad before generated lessons."
        />
        <Text style={styles.counter}>{remainingSeconds}s</Text>
        <AppButton
          title="Premium skips this"
          onPress={() => navigation.replace('LessonGeneration', route.params)}
          variant="secondary"
          icon={<Crown size={18} color={theme.colors.primary} strokeWidth={2.2} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  iconCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    color: theme.colors.primary,
    fontSize: 52,
    lineHeight: 58,
    fontWeight: '900',
  },
});
