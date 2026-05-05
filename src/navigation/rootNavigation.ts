import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateHome() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }
}

export function navigateAuth() {
  resetTo('Auth');
}

export function navigateLearningGuide() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('LearningGuide');
  }
}

function resetTo(name: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name }],
    });
  }
}

export function navigateWorkout() {
  resetTo('SessionSize');
}

export function navigateReview() {
  resetTo('Review');
}

export function navigateProgress() {
  resetTo('Progress');
}

export function navigateSettings() {
  resetTo('Settings');
}
