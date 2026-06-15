import { MascotState } from '../types/mascot';

type MascotAnimationConfig = {
  state: MascotState;
  label: string;
  fallbackText: string;
  lottieSource?: unknown;
};

// TODO: Add real Lottie JSON files when mascot art is ready.
// Keep `lottieSource` undefined until `lottie-react-native` and animation assets are added.
export const mascotAnimations: Record<MascotState, MascotAnimationConfig> = {
  idle: {
    state: 'idle',
    label: 'Idle',
    fallbackText: 'FG',
  },
  thinking: {
    state: 'thinking',
    label: 'Thinking',
    fallbackText: '...',
  },
  happy: {
    state: 'happy',
    label: 'Happy',
    fallbackText: 'OK',
  },
  oops: {
    state: 'oops',
    label: 'Oops',
    fallbackText: 'TRY',
  },
  celebrate: {
    state: 'celebrate',
    label: 'Celebrate',
    fallbackText: 'WIN',
  },
  encourage: {
    state: 'encourage',
    label: 'Encourage',
    fallbackText: 'FG',
  },
};
