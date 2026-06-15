import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { isAuthenticated, isOnboardingComplete } = useAppStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        navigation.replace('Auth');
        return;
      }
      navigation.replace(isOnboardingComplete ? 'Home' : 'Welcome');
    }, 800);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, isOnboardingComplete, navigation]);

  return (
    <Screen scroll={false}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>FG</Text>
        </View>
        <Text style={styles.brand}>Fluent Gang</Text>
        <Text style={styles.copy}>Extend your active vocabulary every day.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.colors.surface,
    fontSize: 30,
    fontWeight: '900',
  },
  brand: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: '900',
  },
  copy: {
    color: theme.colors.muted,
    fontSize: 15,
  },
});
