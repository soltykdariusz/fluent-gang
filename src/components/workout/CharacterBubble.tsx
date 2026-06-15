import { Volume2 } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { playSentenceAudio, stopSentenceAudio } from '../../services/soundService';
import { theme } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeProvider';
import { CharacterDialogueLine } from '../../types/workout';
import { HighlightedText } from '../HighlightedText';
import { CharacterAvatarPlaceholder } from './CharacterAvatarPlaceholder';

type Props = {
  line: CharacterDialogueLine;
  highlightTerms?: string[];
  autoPlay?: boolean;
  showAudio?: boolean;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
};

export function CharacterBubble({
  line,
  highlightTerms = [],
  autoPlay = true,
  showAudio = true,
  onAudioStart,
  onAudioEnd,
}: Props) {
  const appTheme = useTheme();
  const [visibleText, setVisibleText] = useState('');
  const [isReplayActive, setIsReplayActive] = useState(false);
  const onAudioStartRef = useRef(onAudioStart);
  const onAudioEndRef = useRef(onAudioEnd);
  const text = line.text ?? '';

  useEffect(() => {
    onAudioStartRef.current = onAudioStart;
    onAudioEndRef.current = onAudioEnd;
  }, [onAudioEnd, onAudioStart]);

  useEffect(() => {
    if (autoPlay && showAudio) {
      onAudioStartRef.current?.();
      setIsReplayActive(true);
      void playSentenceAudio(text, '', () => {
        setIsReplayActive(false);
        onAudioEndRef.current?.();
      });
    }
  }, [autoPlay, showAudio, text]);

  useEffect(() => {
    setVisibleText('');
    let index = 0;
    const intervalMs = getDialogueTypewriterInterval(text);
    const intervalId = setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <View style={styles.row}>
      <CharacterAvatarPlaceholder characterId={line.characterId} name={line.characterName} emotion={line.emotion} />
      <View style={[styles.bubble, { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border }]}>
        <View
          style={[
            styles.tail,
            { backgroundColor: appTheme.colors.surface, borderColor: appTheme.colors.border },
          ]}
        />
        <View style={styles.sentenceRow}>
          {showAudio ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Play ${text}`}
              onPress={() => {
                if (isReplayActive) {
                  stopSentenceAudio();
                  setIsReplayActive(false);
                  return;
                }

                setIsReplayActive(true);
                void playSentenceAudio(text, '', () => setIsReplayActive(false));
              }}
              style={({ pressed }) => [styles.audioButton, pressed ? styles.pressed : null]}
            >
              <Volume2
                size={18}
                color={isReplayActive ? appTheme.colors.accent : appTheme.colors.muted}
                strokeWidth={2.4}
              />
            </Pressable>
          ) : null}
          <View style={styles.textLayer}>
            <HighlightedText
              text={text}
              terms={highlightTerms}
              style={[styles.text, styles.textGhost, { color: appTheme.colors.muted }]}
              highlightStyle={[styles.highlight, { color: appTheme.colors.muted }]}
            />
            <HighlightedText
              text={visibleText}
              terms={highlightTerms}
              style={[styles.text, styles.textTyped, { color: getInkColor(appTheme) }]}
              highlightStyle={[styles.highlight, { color: appTheme.colors.accent }]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function getInkColor(appTheme: ReturnType<typeof useTheme>) {
  return appTheme.mode === 'light' ? '#263247' : appTheme.colors.text;
}

function getDialogueTypewriterInterval(text: string) {
  const wordCount = Math.max(1, text.trim().split(/\s+/).length);
  const estimatedSpeechMs = (wordCount / 145) * 60_000;
  return Math.max(16, Math.min(34, Math.round(estimatedSpeechMs / Math.max(1, text.length))));
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  bubble: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  tail: {
    position: 'absolute',
    left: -6,
    top: 21,
    width: 12,
    height: 12,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  audioButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.68,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  textLayer: {
    flexShrink: 1,
  },
  textGhost: {
    opacity: 0.68,
  },
  textTyped: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  highlight: {
    fontWeight: '400',
  },
});
