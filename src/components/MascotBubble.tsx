import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { MascotState } from '../types/mascot';

type MascotBubbleProps = PropsWithChildren<{
  state: MascotState;
  message?: string;
}>;

export function MascotBubble({ message, children }: MascotBubbleProps) {
  const appTheme = useTheme();
  const backgroundColor = appTheme.colors.surface;

  return (
    <View style={styles.wrap}>
      <View style={[styles.bubble, { backgroundColor, borderColor: appTheme.colors.border }]}>
        {message ? <Text style={[styles.message, { color: appTheme.colors.text }]}>{message}</Text> : children}
      </View>
      <View style={[styles.tail, { backgroundColor, borderColor: appTheme.colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bubble: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  message: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },
  tail: {
    position: 'absolute',
    left: -6,
    top: 24,
    width: 14,
    height: 14,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
});
