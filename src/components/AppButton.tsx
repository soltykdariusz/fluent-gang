import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../theme/theme';
import { useTheme } from '../theme/ThemeProvider';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  icon?: ReactNode;
};

export function AppButton({ title, onPress, variant = 'primary', disabled, icon }: AppButtonProps) {
  const appTheme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            variant === 'secondary' ? appTheme.colors.primarySoft : appTheme.colors.primary,
        },
        disabled
          ? {
              backgroundColor: appTheme.colors.border,
              borderColor: appTheme.colors.border,
            }
          : null,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          {
            color: disabled
              ? appTheme.colors.muted
              : variant === 'secondary'
                ? appTheme.colors.primary
                : appTheme.colors.surface,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
