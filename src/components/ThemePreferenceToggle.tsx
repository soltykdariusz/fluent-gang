import { Moon, Monitor, Sun } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/ThemeProvider';
import { ThemePreference } from '../theme/theme';

const options: Array<{
  value: ThemePreference;
  label: string;
  icon: 'system' | 'light' | 'dark';
}> = [
  { value: 'system', label: 'System', icon: 'system' },
  { value: 'light', label: 'Light', icon: 'light' },
  { value: 'dark', label: 'Dark', icon: 'dark' },
];

export function ThemePreferenceToggle() {
  const theme = useTheme();
  const themePreference = useAppStore((state) => state.themePreference);
  const setThemePreference = useAppStore((state) => state.setThemePreference);

  const iconColor = (selected: boolean) =>
    selected ? theme.colors.surface : theme.colors.primary;

  return (
    <View style={[styles.wrap, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>Theme</Text>
      <View style={[styles.toggle, { backgroundColor: theme.colors.primarySoft }]}>
        {options.map((option) => {
          const selected = themePreference === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              onPress={() => setThemePreference(option.value)}
              style={[
                styles.option,
                selected && { backgroundColor: theme.colors.primary },
              ]}
            >
              {option.icon === 'system' ? (
                <Monitor size={15} color={iconColor(selected)} strokeWidth={2.2} />
              ) : null}
              {option.icon === 'light' ? (
                <Sun size={15} color={iconColor(selected)} strokeWidth={2.2} />
              ) : null}
              {option.icon === 'dark' ? (
                <Moon size={15} color={iconColor(selected)} strokeWidth={2.2} />
              ) : null}
              <Text
                style={[
                  styles.optionText,
                  { color: selected ? theme.colors.surface : theme.colors.primary },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.hint, { color: theme.colors.muted }]}>
        System follows your phone. Light and Dark override it.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '900',
  },
  toggle: {
    minHeight: 42,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 4,
    gap: 4,
  },
  option: {
    flex: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '900',
  },
  hint: {
    fontSize: 12,
    lineHeight: 17,
  },
});
