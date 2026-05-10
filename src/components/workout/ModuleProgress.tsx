import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  current: number;
  total: number;
  showLabel?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ModuleProgress({ current, total, showLabel = true, style }: Props) {
  const appTheme = useTheme();
  const progress = total > 0 ? current / total : 0;

  return (
    <View style={[styles.wrap, style]}>
      <View style={[styles.track, { backgroundColor: appTheme.colors.primarySoft }]}>
        <View style={[styles.fill, { backgroundColor: appTheme.colors.primary, width: `${progress * 100}%` }]} />
      </View>
      {showLabel ? (
        <Text style={[styles.label, { color: appTheme.colors.muted }]}>
          Set {current}/{total}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.xs,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textAlign: 'right',
  },
});
