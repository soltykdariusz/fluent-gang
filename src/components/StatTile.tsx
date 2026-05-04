import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

type StatTileProps = {
  label: string;
  value: string;
};

export function StatTile({ label, value }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: 86,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  value: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  label: {
    color: theme.colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
});
