import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../theme/theme';

type QuizNavButtonProps = {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: 'ghost' | 'solid';
};

export function QuizNavButton({ title, onPress, icon, disabled, variant = 'ghost' }: QuizNavButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'solid' && styles.solid,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {icon}
      <Text style={[styles.text, variant === 'solid' && styles.solidText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 104,
    minHeight: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  solid: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  disabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  solidText: {
    color: theme.colors.surface,
  },
});
