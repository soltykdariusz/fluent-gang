import { StyleSheet, Text, View } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function FocusTimer() {
  const appTheme = useTheme();
  const focusTargetSeconds = useAppStore((state) => state.focusTargetSeconds);
  const focusRemainingSeconds = useAppStore((state) => state.focusRemainingSeconds);
  const elapsedSeconds = Math.max(0, focusTargetSeconds - focusRemainingSeconds);
  const progress = focusTargetSeconds > 0 ? Math.min(elapsedSeconds / focusTargetSeconds, 1) : 0;

  return (
    <View style={[styles.card, { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border }]}>
      <View style={[styles.ring, { borderColor: appTheme.colors.primarySoft }]}>
        <View style={[styles.dot, { backgroundColor: appTheme.colors.primary, opacity: 0.35 + progress * 0.65 }]} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.label, { color: appTheme.colors.muted }]}>Focus time</Text>
        <Text style={[styles.value, { color: appTheme.colors.text }]}>
          {formatSeconds(elapsedSeconds)} / {formatSeconds(focusTargetSeconds)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 68,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  ring: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  copy: {
    gap: 2,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '900',
  },
});
