import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarChart3, BookOpenText, Brain, Focus, Settings } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StatTile } from '../components/StatTile';
import { StepHeader } from '../components/StepHeader';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { targetLanguage, level, completedLessons, focusSecondsToday } = useAppStore();

  return (
    <Screen>
      <StepHeader title={t('homeTitle')} subtitle={`${targetLanguage.toUpperCase()} · ${level}`} />
      <View style={styles.stats}>
        <StatTile label="Lessons" value={String(completedLessons.length)} />
        <StatTile label="Focus min" value={String(Math.floor(focusSecondsToday / 60))} />
      </View>
      <AppButton
        title={t('chooseWords')}
        onPress={() => navigation.navigate('VocabularySelection')}
        icon={<BookOpenText size={19} color={theme.colors.surface} strokeWidth={2.2} />}
      />
      <AppButton
        title={t('review')}
        onPress={() => navigation.navigate('Review')}
        variant="secondary"
        icon={<Brain size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title={t('focus')}
        onPress={() => navigation.navigate('FocusSession')}
        variant="secondary"
        icon={<Focus size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title={t('progress')}
        onPress={() => navigation.navigate('Progress')}
        variant="secondary"
        icon={<BarChart3 size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
      <AppButton
        title={t('settings')}
        onPress={() => navigation.navigate('Settings')}
        variant="secondary"
        icon={<Settings size={19} color={theme.colors.primary} strokeWidth={2.2} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
});
