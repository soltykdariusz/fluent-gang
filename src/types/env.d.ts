declare namespace NodeJS {
  export interface ProcessEnv {
    EXPO_PUBLIC_SUPABASE_URL?: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY?: string;
  }
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
