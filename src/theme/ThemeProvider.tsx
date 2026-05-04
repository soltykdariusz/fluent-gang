import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { AppTheme, darkTheme, lightTheme } from './theme';

const ThemeContext = createContext<AppTheme>(lightTheme);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const themePreference = useAppStore((state) => state.themePreference);
  const theme = useMemo(() => {
    const resolvedMode = themePreference === 'system' ? systemScheme : themePreference;
    return resolvedMode === 'dark' ? darkTheme : lightTheme;
  }, [systemScheme, themePreference]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
