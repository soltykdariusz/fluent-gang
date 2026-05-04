export type LanguageCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'pl'
  | 'ja'
  | 'ko'
  | 'zh';

export type InterfaceLanguageCode = LanguageCode;

export type LevelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Language = {
  code: LanguageCode;
  englishName: string;
  nativeName: string;
  isInitialTarget: boolean;
};

export type Level = {
  code: LevelCode;
  label: string;
  description: string;
};
