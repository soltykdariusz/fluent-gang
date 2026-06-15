import { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import mascotAvatar from '../../assets/mascots/ray-avatar.png';
import { mascotAnimations } from '../constants/mascotAnimations';
import { useTheme } from '../theme/ThemeProvider';
import { theme } from '../theme/theme';
import { MascotState } from '../types/mascot';
import { MascotBubble } from './MascotBubble';

type MascotProps = {
  state?: MascotState;
  message?: string;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
};

const stateColorRole: Record<MascotState, 'primary' | 'danger' | 'warning'> = {
  idle: 'primary',
  thinking: 'primary',
  happy: 'primary',
  oops: 'warning',
  celebrate: 'primary',
  encourage: 'primary',
};

export function Mascot({
  state = 'idle',
  message,
  size = 58,
  loop = true,
  autoplay = true,
}: MascotProps) {
  const appTheme = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const config = mascotAnimations[state];
  const colorRole = stateColorRole[state];
  const accentColor = colorRole === 'warning' ? appTheme.colors.warning : appTheme.colors.primary;
  const animationSource = config.lottieSource;

  const rotateStyle = useMemo(
    () =>
      rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['-2deg', '2deg'],
      }),
    [rotate],
  );

  useEffect(() => {
    if (!autoplay) {
      return undefined;
    }

    const pulse = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: state === 'celebrate' ? 1.09 : 1.04, duration: 700, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(rotate, { toValue: 1, duration: 700, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: 0, duration: 700, useNativeDriver: true }),
        ]),
      ]),
      { iterations: loop ? -1 : 1 },
    );

    pulse.start();
    return () => pulse.stop();
  }, [autoplay, loop, rotate, scale, state]);

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[
          styles.face,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getFaceBackground(state, appTheme.colors),
            transform: [{ scale }, { rotate: rotateStyle }],
          },
        ]}
      >
        {animationSource ? (
          <Text style={[styles.faceText, { color: accentColor, fontSize: Math.max(12, size * 0.24) }]}>
            {config.fallbackText}
          </Text>
        ) : mascotAvatar ? (
          <Image source={mascotAvatar} style={styles.avatarImage} resizeMode="cover" />
        ) : (
          <FallbackMascotFace state={state} label={config.fallbackText} color={accentColor} size={size} />
        )}
      </Animated.View>
      {message ? <MascotBubble state={state} message={message} /> : null}
    </View>
  );
}

function getFaceBackground(state: MascotState, colors: ReturnType<typeof useTheme>['colors']) {
  if (state === 'thinking') return colors.aiSoft;
  if (state === 'oops') return colors.dangerSoft;
  if (state === 'celebrate') return colors.warningSoft;
  if (state === 'idle') return colors.playfulSky;
  return colors.primarySoft;
}

function FallbackMascotFace({
  state,
  label,
  color,
  size,
}: {
  state: MascotState;
  label: string;
  color: string;
  size: number;
}) {
  const eyeSize = Math.max(4, size * 0.08);
  const smile = state === 'oops' ? '•' : state === 'thinking' ? '?' : state === 'celebrate' ? '!' : '•';

  return (
    <View style={styles.fallbackFace}>
      <View style={styles.eyes}>
        <View style={[styles.eye, { width: eyeSize, height: eyeSize, borderRadius: eyeSize / 2, backgroundColor: color }]} />
        <View style={[styles.eye, { width: eyeSize, height: eyeSize, borderRadius: eyeSize / 2, backgroundColor: color }]} />
      </View>
      <Text style={[styles.faceText, { color, fontSize: Math.max(12, size * 0.2) }]}>{label}</Text>
      <Text style={[styles.micro, { color }]}>{smile}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  avatarImage: {
    width: '122%',
    height: '122%',
  },
  fallbackFace: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  eyes: {
    flexDirection: 'row',
    gap: 8,
  },
  eye: {},
  faceText: {
    fontWeight: '900',
  },
  micro: {
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 10,
  },
});
