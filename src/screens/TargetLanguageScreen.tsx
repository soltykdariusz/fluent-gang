import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { supportedLanguages } from '../constants/languages';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TargetLanguage'>;

export function TargetLanguageScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const selected = useAppStore((state) => state.targetLanguage);
  const setTargetLanguage = useAppStore((state) => state.setTargetLanguage);

  return (
    <Screen>
      <StepHeader title={t('targetLanguage')} subtitle="English is the first complete MVP target, but the architecture supports all listed languages." />
      {supportedLanguages.map((language) => (
        <OptionCard
          key={language.code}
          title={language.nativeName}
          subtitle={language.englishName}
          selected={selected === language.code}
          onPress={() => {
            setTargetLanguage(language.code);
            navigation.navigate('LevelSelection');
          }}
        />
      ))}
    </Screen>
  );
}
