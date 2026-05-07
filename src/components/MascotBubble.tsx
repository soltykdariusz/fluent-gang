import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { MascotState } from '../types/mascot';

type MascotBubbleProps = PropsWithChildren<{
  state: MascotState;
  message?: string;
}>;

const bubbleTone: Record<MascotState, 'primarySoft' | 'accentSoft' | 'warningSoft' | 'dangerSoft' | 'aiSoft' | 'playfulSky'> = {
  idle: 'playfulSky',
  thinking: 'aiSoft',
  happy: 'primarySoft',
  oops: 'dangerSoft',
  celebrate: 'warningSoft',
  encourage: 'primarySoft',
};

export function MascotBubble({ state, message, children }: MascotBubbleProps) {
  const appTheme = useTheme();
  const backgroundColor = appTheme.colors[bubbleTone[state]];

  return (
    <View style={styles.wrap}>
      <View style={[styles.bubble, { backgroundColor, borderColor: appTheme.colors.text }]}>
        {message ? <Text style={[styles.message, { color: appTheme.colors.text }]}>{message}</Text> : children}
      </View>
      <View style={[styles.tail, { backgroundColor, borderColor: appTheme.colors.text }]} />
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
    borderRadius: 18,
    borderWidth: 2,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  message: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
  },
  tail: {
    position: 'absolute',
    left: -6,
    top: 24,
    width: 14,
    height: 14,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
});
