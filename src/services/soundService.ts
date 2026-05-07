import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import type { GeneratedLesson } from '../types/lesson';

const failureSoundAsset = require('../../assets/sounds/failure.wav');
const successSoundAsset = require('../../assets/sounds/success.wav');

export type WordAudioItem = {
  wordId: string;
  targetWord: string;
  audioUrl?: string;
};

export async function playFailureSound() {
  return playSound(failureSoundAsset, 0.45);
}

export async function playSuccessSound() {
  return playSound(successSoundAsset, 0.42);
}

export async function playWordAudio(item: WordAudioItem) {
  try {
    await speak(item.targetWord);
  } catch {
    // Word audio should never block the workout flow.
  }
}

export async function playSentenceAudio(sentence: string, _targetWord: string) {
  try {
    await speak(sentence);
  } catch {
    // Sentence audio should never block the workout flow.
  }
}

export function getWordAudioItems(lesson: GeneratedLesson): WordAudioItem[] {
  if (lesson.shadowingSets.length > 0) {
    return lesson.shadowingSets.map((set) => ({
      wordId: set.wordId,
      targetWord: set.targetWord,
      audioUrl: set.audioUrl,
    }));
  }

  return lesson.words.map((word) => ({
    wordId: word.id,
    targetWord: word.text,
    audioUrl: lesson.audioUrl,
  }));
}

async function playSound(asset: number, volume: number) {
  try {
    const { sound } = await Audio.Sound.createAsync(asset, { shouldPlay: true, volume });
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch {
    // Sound should never block the workout flow.
  }
}

async function speak(text: string) {
  const value = text.trim();
  if (!value) {
    return;
  }

  Speech.stop();
  Speech.speak(value, {
    language: 'en-US',
    pitch: 1,
    rate: 0.86,
  });
}
