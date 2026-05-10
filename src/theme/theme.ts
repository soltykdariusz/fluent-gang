import { fluentPalette } from './palette';

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
    background: fluentPalette.slate[0],
    surface: fluentPalette.slate[0],
    text: fluentPalette.slate[900],
    muted: fluentPalette.slate[500],
    primary: fluentPalette.green[500],
    primaryPressed: fluentPalette.green[600],
    primarySoft: fluentPalette.green[100],
    accent: fluentPalette.blue[500],
    accentPressed: fluentPalette.blue[700],
    accentSoft: fluentPalette.blue[50],
    ai: fluentPalette.purple[500],
    aiSoft: fluentPalette.purple[50],
    warning: fluentPalette.yellow[500],
    warningSoft: fluentPalette.yellow[50],
    playfulMint: fluentPalette.green[50],
    playfulSky: fluentPalette.blue[50],
    playfulCoral: fluentPalette.red[50],
    playfulGrape: fluentPalette.purple[50],
    border: fluentPalette.slate[200],
    danger: fluentPalette.red[500],
    dangerSoft: fluentPalette.red[50],
    success: fluentPalette.green[500],
    gradientStart: fluentPalette.gradient.smartStart,
    gradientEnd: fluentPalette.gradient.smartEnd,
  },
  ...base,
};

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: fluentPalette.slate[950],
    surface: fluentPalette.slate[900],
    text: fluentPalette.slate[50],
    muted: fluentPalette.slate[300],
    primary: fluentPalette.green[500],
    primaryPressed: fluentPalette.green[600],
    primarySoft: '#123A24',
    accent: fluentPalette.blue[500],
    accentPressed: fluentPalette.blue[700],
    accentSoft: '#10233F',
    ai: fluentPalette.purple[500],
    aiSoft: '#251A44',
    warning: fluentPalette.yellow[500],
    warningSoft: '#332B08',
    playfulMint: '#102A1B',
    playfulSky: '#10233F',
    playfulCoral: '#351516',
    playfulGrape: '#251A44',
    border: fluentPalette.slate[800],
    danger: fluentPalette.red[500],
    dangerSoft: '#351516',
    success: fluentPalette.green[500],
    gradientStart: fluentPalette.gradient.smartStart,
    gradientEnd: fluentPalette.gradient.smartEnd,
  },
  ...base,
};

export type AppTheme = typeof lightTheme | typeof darkTheme;
export type ThemePreference = 'system' | 'light' | 'dark';

export const theme = lightTheme;
