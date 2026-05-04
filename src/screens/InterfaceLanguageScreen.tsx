import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { OptionCard } from '../components/OptionCard';
import { Screen } from '../components/Screen';
import { StepHeader } from '../components/StepHeader';
import { supportedLanguages } from '../constants/languages';
import { useAppStore } from '../store/useAppStore';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'InterfaceLanguage'>;

export function InterfaceLanguageScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const selected = useAppStore((state) => state.interfaceLanguage);
  const setInterfaceLanguage = useAppStore((state) => state.setInterfaceLanguage);

  return (
    <Screen>
      <StepHeader title={t('interfaceLanguage')} subtitle="MVP includes English and Polish copy. The structure is ready for more UI languages." />
      {supportedLanguages.map((language) => (
        <OptionCard
          key={language.code}
          title={language.nativeName}
          subtitle={language.englishName}
          selected={selected === language.code}
          onPress={() => {
            setInterfaceLanguage(language.code);
            navigation.navigate('NativeLanguage');
          }}
        />
      ))}
    </Screen>
  );
}
