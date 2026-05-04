import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = total > 0 ? current / total : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.label}>
        {current}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.xs,
  },
  track: {
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.primarySoft,
    overflow: 'hidden',
  },
  fill: {
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },
});
