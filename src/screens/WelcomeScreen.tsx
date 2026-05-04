import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <Screen scroll={false}>
      <View style={styles.hero}>
        <Text style={styles.brand}>{t('appName')}</Text>
        <Text style={styles.slogan}>{t('slogan')}</Text>
        <Text style={styles.body}>{t('welcomeBody')}</Text>
      </View>
      <AppButton title={t('start')} onPress={() => navigation.navigate('Onboarding')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  brand: {
    color: theme.colors.text,
    fontSize: 44,
    lineHeight: 50,
    fontWeight: '900',
  },
  slogan: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  body: {
    color: theme.colors.muted,
    fontSize: 17,
    lineHeight: 25,
  },
});
