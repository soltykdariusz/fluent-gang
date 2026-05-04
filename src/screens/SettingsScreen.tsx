import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { ThemePreferenceToggle } from '../components/ThemePreferenceToggle';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const {
    interfaceLanguage,
    nativeLanguage,
    targetLanguage,
    level,
  } = useAppStore();

  return (
    <Screen>
      <StepHeader title="Settings" subtitle={`${interfaceLanguage.toUpperCase()} UI · native ${nativeLanguage.toUpperCase()} · learning ${targetLanguage.toUpperCase()} · ${level}`} />
      <ThemePreferenceToggle />
      <AppButton title="Interface language" onPress={() => navigation.navigate('InterfaceLanguage')} variant="secondary" />
      <AppButton title="Native language" onPress={() => navigation.navigate('NativeLanguage')} variant="secondary" />
      <AppButton title="Learning language" onPress={() => navigation.navigate('TargetLanguage')} variant="secondary" />
      <AppButton title="Level" onPress={() => navigation.navigate('LevelSelection')} variant="secondary" />
      <AppButton title="Back home" onPress={() => navigation.navigate('Home')} />
    </Screen>
  );
}
