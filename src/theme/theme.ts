const base = {
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
  },
};

export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: '#F8FAF7',
    surface: '#FFFFFF',
    text: '#17211A',
    muted: '#6D776F',
    primary: '#235C48',
    primarySoft: '#D9EFE5',
    accent: '#F0B44D',
    border: '#DDE5DE',
    danger: '#B43A3A',
    success: '#267A4D',
  },
  ...base,
};

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: '#0F1712',
    surface: '#16221A',
    text: '#EEF5EF',
    muted: '#A3B0A7',
    primary: '#7CC9A5',
    primarySoft: '#203B2E',
    accent: '#D8A84B',
    border: '#2A3A30',
    danger: '#EF8B8B',
    success: '#7CC9A5',
  },
  ...base,
};

export type AppTheme = typeof lightTheme | typeof darkTheme;
export type ThemePreference = 'system' | 'light' | 'dark';

export const theme = lightTheme;
