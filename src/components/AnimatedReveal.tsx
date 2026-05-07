import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

type AnimatedRevealProps = PropsWithChildren<{
  visible: boolean;
  duration?: number;
}>;

export function AnimatedReveal({ visible, duration = 680, children }: AnimatedRevealProps) {
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration, progress, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-6, 0],
              }),
            },
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
  },
});
