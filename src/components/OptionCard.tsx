import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';
import { useTheme } from '../theme/ThemeProvider';

type OptionCardProps = {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onPress: () => void;
  icon?: ReactNode;
};

export function OptionCard({ title, subtitle, selected, onPress, icon }: OptionCardProps) {
  const appTheme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: selected ? appTheme.colors.primary : appTheme.colors.border,
          backgroundColor: selected ? appTheme.colors.primarySoft : appTheme.colors.surface,
        },
        pressed && styles.pressed,
      ]}
    >
      {icon ? <View style={[styles.iconWrap, { backgroundColor: appTheme.colors.primarySoft }]}>{icon}</View> : null}
      <View style={styles.copy}>
        <Text style={[styles.title, { color: appTheme.colors.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: appTheme.colors.muted }]}>{subtitle}</Text> : null}
      </View>
      {selected ? <Text style={[styles.check, { color: appTheme.colors.primary }]}>✓</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 68,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  pressed: {
    opacity: 0.84,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  check: {
    fontSize: 20,
    fontWeight: '800',
  },
});
