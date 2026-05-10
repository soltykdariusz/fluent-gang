import { X } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';
import { ModuleProgress } from './ModuleProgress';

type Props = {
  current: number;
  total: number;
  showLabel?: boolean;
  onExit: () => void;
};

export function ExerciseTopBar({ current, total, showLabel = false, onExit }: Props) {
  const appTheme = useTheme();

  return (
    <View style={styles.wrap}>
      <ModuleProgress current={current} total={total} showLabel={showLabel} style={styles.progress} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close exercise"
        onPress={onExit}
        style={({ pressed }) => [
          styles.exitButton,
          { borderColor: appTheme.colors.border, backgroundColor: appTheme.colors.surface },
          pressed ? styles.pressed : null,
        ]}
      >
        <X size={22} color={appTheme.colors.primary} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  progress: {
    flex: 1,
  },
  exitButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
});
