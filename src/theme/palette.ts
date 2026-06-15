export const fluentPalette = {
  green: {
    700: '#15803D',
    600: '#16A34A',
    500: '#22C55E',
    200: '#BBF7D0',
    100: '#DCFCE7',
    50: '#F0FDF4',
  },
  blue: {
    700: '#1D4ED8',
    500: '#3B82F6',
    200: '#BFDBFE',
    100: '#DBEAFE',
    50: '#EFF6FF',
  },
  purple: {
    700: '#6D28D9',
    500: '#8B5CF6',
    200: '#DDD6FE',
    100: '#EDE9FE',
    50: '#F5F3FF',
  },
  yellow: {
    600: '#CA8A04',
    500: '#FACC15',
    200: '#FEF08A',
    100: '#FEF9C3',
    50: '#FEFCE8',
  },
  red: {
    600: '#DC2626',
    500: '#EF4444',
    200: '#FECACA',
    100: '#FEE2E2',
    50: '#FEF2F2',
  },
  slate: {
    950: '#020617',
    900: '#0F172A',
    800: '#1E293B',
    700: '#334155',
    500: '#64748B',
    300: '#CBD5E1',
    200: '#E2E8F0',
    100: '#F1F5F9',
    50: '#F8FAFC',
    0: '#FFFFFF',
  },
  gradient: {
    smartStart: '#22C55E',
    smartEnd: '#3B82F6',
  },
} as const;

export type FluentPalette = typeof fluentPalette;
