import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { supportedLanguages } from '../constants/languages';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'NativeLanguage'>;

export function NativeLanguageScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const selected = useAppStore((state) => state.nativeLanguage);
  const setNativeLanguage = useAppStore((state) => state.setNativeLanguage);

  return (
    <Screen>
      <StepHeader title={t('nativeLanguage')} subtitle="Used later for translations, explanations, and contrastive examples." />
      {supportedLanguages.map((language) => (
        <OptionCard
          key={language.code}
          title={language.nativeName}
          subtitle={language.englishName}
          selected={selected === language.code}
          onPress={() => {
            setNativeLanguage(language.code);
            navigation.navigate('TargetLanguage');
          }}
        />
      ))}
    </Screen>
  );
}
