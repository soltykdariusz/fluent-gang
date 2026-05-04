import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateHome() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('Home');
  }
}

export function navigateLearningGuide() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('LearningGuide');
  }
}
