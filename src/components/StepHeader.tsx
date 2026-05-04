import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme/theme';
import { useTheme } from '../theme/ThemeProvider';

type StepHeaderProps = {
  title: string;
  subtitle?: string;
};

export function StepHeader({ title, subtitle }: StepHeaderProps) {
  const appTheme = useTheme();

  return (
    <>
      <Text style={[styles.title, { color: appTheme.colors.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: appTheme.colors.muted }]}>{subtitle}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 23,
  },
});
